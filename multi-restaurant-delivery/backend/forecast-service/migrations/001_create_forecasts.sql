# TimescaleDB migration for forecasts
CREATE TABLE IF NOT EXISTS forecasts (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    forecast_time TIMESTAMPTZ NOT NULL,
    prediction NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now()
);
SELECT create_hypertable('forecasts', 'forecast_time', if_not_exists => TRUE);
