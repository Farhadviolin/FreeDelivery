# accessibility_checklist.md

## Accessibility-Checkliste (Frontend & Mobile)

### 1. Semantik & Struktur
- ARIA-Rollen und Landmarken korrekt gesetzt
- Überschriftenstruktur (h1-h6) konsistent
- Formulare mit Labels und Fehlerhinweisen

### 2. Tastaturbedienbarkeit
- Alle interaktiven Elemente per Tab erreichbar
- Fokus-Indikatoren sichtbar
- Shortcuts dokumentiert

### 3. Screenreader-Kompatibilität
- Alternativtexte für Bilder und Icons
- Live-Regionen für dynamische Inhalte
- Navigationshilfen (Skip Links)

### 4. Farbkontrast & Design
- Kontrastverhältnis mind. 4.5:1
- Keine Farbcodierung als einziges Unterscheidungsmerkmal
- Dark Mode unterstützt

### 5. Mobile Accessibility
- Touch-Ziele ausreichend groß
- VoiceOver/TalkBack getestet
- Responsives Layout

### 6. Tests & Tools
- axe, Lighthouse, NVDA, VoiceOver, TalkBack
- Automatisierte Checks in CI/CD

### 7. Dokumentation
- Accessibility-Statement im User Guide
- Hinweise für Entwickler in `docs/dev-guides/`

---

Siehe auch: [WCAG 2.1 AA](https://www.w3.org/WAI/standards-guidelines/wcag/)
