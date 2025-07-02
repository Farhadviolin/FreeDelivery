import { useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import axios from 'axios';

export default function DriverSettingsPage() {
  const [settings, setSettings] = useState({ language: 'de', darkMode: true });
  const [message, setMessage] = useState('');
  async function saveSettings() {
    await axios.post('/api/driver/settings', settings);
    setMessage('Gespeichert!');
  }
  async function exportData() {
    const res = await axios.get('/api/driver/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'driver-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Einstellungen & DSGVO</h1>
      <Card>
        <div>Sprache: <input value={settings.language} onChange={e => setSettings(s => ({ ...s, language: e.target.value }))} /></div>
        <div>Dark Mode: <input type="checkbox" checked={settings.darkMode} onChange={e => setSettings(s => ({ ...s, darkMode: e.target.checked }))} /></div>
        <Button onClick={saveSettings}>Speichern</Button>
        {message && <div className="text-green-600">{message}</div>}
      </Card>
      <Card>
        <h2>DSGVO-Datenexport</h2>
        <Button onClick={exportData}>Meine Daten exportieren</Button>
      </Card>
    </div>
  );
}
