# COPILOT: FULL-PROJECT AUDIT & REFACTOR

**Anweisung an Copilot / ChatGPT:**  
1. **Lies alle Quellcode-Dateien** im Repo (src/, lib/, services/).  
2. **Identifiziere**:
   - Funktionen/Klassen mit `// TODO`, leeren Bodies oder `throw new Error("Not implemented")`.
   - Exporte, die nirgends importiert bzw. verwendet werden.
   - API-Endpoints bzw. Interfaces ohne konkrete Business-Logik.
3. **Ersetze** diese Stubs durch realistischen, typisierten, lauffähigen Code:
   - Vervollständige fehlende Importe.
   - Implementiere sinnvolle Logik (z. B. CRUD, Validierung, Fehlerbehandlung).
   - Erstelle zu jeder Änderung passende **Unit-Tests** (Jest/Mocha) und **Integration-Tests** (Supertest/Testcontainers).
4. **Verknüpfe** alle Module:
   - Ergänze fehlende Registrierungen in `index.ts` / `app.module.ts` / Router-Config.
   - Füge fehlende DI-Bindings (NestJS) oder Service-Injections hinzu.
5. **Dokumentiere** jede Änderung als Kommentar oberhalb der neuen Implementierung:
   ```ts
   // [AI-Fix] Stub entfernt und implementiert:
   // - validiert Input
   // - speichert in DB via TypeORM
   // - wirft 404, wenn nicht gefunden
```
Erzeuge am Ende der Datei audit-report.md eine Übersicht:

Datei	Zeile	Gefundener Stub	Ersetzt durch
services/user.service.ts	42	// TODO: getUserById	tatsächliche DB-Query via TypeORM
