-- Migration: Erweiterte Menu-Features für UberEats Integration
-- Datum: 2025-01-XX
-- Beschreibung: Fügt Menü-Modifikatoren, Allergene und erweiterte Restaurant-Features hinzu

-- Neue Tabellen für Menü-Modifikatoren
CREATE TABLE IF NOT EXISTS menu_modifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('single', 'multiple')),
    required BOOLEAN DEFAULT FALSE,
    min_selections INTEGER DEFAULT 0,
    max_selections INTEGER,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS modifier_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    modifier_id UUID NOT NULL REFERENCES menu_modifiers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    display_order INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Allergene-Tabelle
CREATE TABLE IF NOT EXISTS allergens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction-Tabelle für Menu Items und Allergene
CREATE TABLE IF NOT EXISTS menu_item_allergens (
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    allergen_id UUID NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
    PRIMARY KEY (menu_item_id, allergen_id)
);

-- Erweiterte Restaurant-Features
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_types JSONB DEFAULT '[]';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS price_level INTEGER DEFAULT 2 CHECK (price_level BETWEEN 1 AND 5);
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS delivery_areas JSONB DEFAULT '[]';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS opening_hours JSONB DEFAULT '{}';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS special_hours JSONB DEFAULT '{}';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS delivery_info JSONB DEFAULT '{}';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS payment_methods JSONB DEFAULT '[]';

-- Erweiterte Menu Item Features
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS nutrition_info JSONB DEFAULT '{}';
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS preparation_time INTEGER DEFAULT 0;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS spiciness_level INTEGER DEFAULT 0 CHECK (spiciness_level BETWEEN 0 AND 5);
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS dietary_flags JSONB DEFAULT '[]';
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_menu_modifiers_menu_item_id ON menu_modifiers(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_modifier_options_modifier_id ON modifier_options(modifier_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_allergens_menu_item_id ON menu_item_allergens(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine_types ON restaurants USING GIN(cuisine_types);
CREATE INDEX IF NOT EXISTS idx_restaurants_features ON restaurants USING GIN(features);
CREATE INDEX IF NOT EXISTS idx_restaurants_price_level ON restaurants(price_level);
CREATE INDEX IF NOT EXISTS idx_menu_items_dietary_flags ON menu_items USING GIN(dietary_flags);

-- Standard-Allergene einfügen
INSERT INTO allergens (name, icon, description) VALUES
('Gluten', '🌾', 'Enthält glutenhaltiges Getreide'),
('Milch', '🥛', 'Enthält Milch und Milchprodukte'),
('Ei', '🥚', 'Enthält Eier'),
('Fisch', '🐟', 'Enthält Fisch'),
('Krebstiere', '🦐', 'Enthält Krebstiere'),
('Nüsse', '🥜', 'Enthält Schalenfrüchte'),
('Erdnüsse', '🥜', 'Enthält Erdnüsse'),
('Soja', '🌱', 'Enthält Soja'),
('Sesam', '🌰', 'Enthält Sesamsamen'),
('Senf', '🌭', 'Enthält Senf'),
('Sellerie', '🥬', 'Enthält Sellerie'),
('Schwefeldioxid', '⚗️', 'Enthält Schwefeldioxid und Sulfite')
ON CONFLICT (name) DO NOTHING;

-- Funktion für automatische Zeitstempel-Updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für automatische updated_at Aktualisierung
CREATE TRIGGER update_menu_modifiers_updated_at BEFORE UPDATE ON menu_modifiers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Beispiel-Daten für Restaurant mit erweiterten Features
UPDATE restaurants 
SET 
    cuisine_types = '["Italienisch", "Pizza"]',
    price_level = 2,
    features = '["Lieferung", "Vegetarisch", "Vegan-Optionen", "Glutenfrei"]',
    opening_hours = '{
        "monday": {"open": "11:00", "close": "23:00"},
        "tuesday": {"open": "11:00", "close": "23:00"},
        "wednesday": {"open": "11:00", "close": "23:00"},
        "thursday": {"open": "11:00", "close": "23:00"},
        "friday": {"open": "11:00", "close": "24:00"},
        "saturday": {"open": "11:00", "close": "24:00"},
        "sunday": {"open": "12:00", "close": "22:00"}
    }',
    delivery_info = '{
        "min_order": 12.00,
        "delivery_fee": 2.99,
        "free_delivery_threshold": 25.00,
        "estimated_time": "20-30",
        "radius": 5
    }',
    payment_methods = '["credit_card", "paypal", "apple_pay", "google_pay", "cash"]'
WHERE name = 'Pizza Palace';

-- Views für einfachere Abfragen
CREATE OR REPLACE VIEW restaurant_full_info AS
SELECT 
    r.*,
    COALESCE(
        json_agg(
            json_build_object(
                'id', mi.id,
                'name', mi.name,
                'description', mi.description,
                'price', mi.price,
                'category', mi.category,
                'nutrition_info', mi.nutrition_info,
                'dietary_flags', mi.dietary_flags,
                'allergens', (
                    SELECT json_agg(a.name)
                    FROM menu_item_allergens mia
                    JOIN allergens a ON a.id = mia.allergen_id
                    WHERE mia.menu_item_id = mi.id
                ),
                'modifiers', (
                    SELECT json_agg(
                        json_build_object(
                            'id', mm.id,
                            'name', mm.name,
                            'type', mm.type,
                            'required', mm.required,
                            'options', (
                                SELECT json_agg(
                                    json_build_object(
                                        'id', mo.id,
                                        'name', mo.name,
                                        'price', mo.price
                                    )
                                )
                                FROM modifier_options mo
                                WHERE mo.modifier_id = mm.id
                                ORDER BY mo.display_order
                            )
                        )
                    )
                    FROM menu_modifiers mm
                    WHERE mm.menu_item_id = mi.id
                    ORDER BY mm.display_order
                )
            )
        ) FILTER (WHERE mi.id IS NOT NULL), 
        '[]'::json
    ) as menu_items
FROM restaurants r
LEFT JOIN menu_items mi ON mi.restaurant_id = r.id
WHERE r.active = true
GROUP BY r.id;

COMMENT ON TABLE menu_modifiers IS 'Modifikatoren für Menu Items (z.B. Größe, Extras)';
COMMENT ON TABLE modifier_options IS 'Optionen für Modifikatoren (z.B. Klein, Mittel, Groß)';
COMMENT ON TABLE allergens IS 'Liste aller verfügbaren Allergene';
COMMENT ON TABLE menu_item_allergens IS 'Verknüpfung zwischen Menu Items und Allergenen';
COMMENT ON VIEW restaurant_full_info IS 'Vollständige Restaurant-Informationen inklusive Menu und Modifikatoren';