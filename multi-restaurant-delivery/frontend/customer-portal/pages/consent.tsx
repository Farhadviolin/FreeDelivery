import { useState } from 'react';
import axios from 'axios';

export default function ConsentPage() {
  const [consent, setConsent] = useState(false);
  const handleChange = async (e) => {
    setConsent(e.target.checked);
    await axios.post('/api/consent', { consent: e.target.checked });
  };
  return (
    <div className="p-4">
      <h1>Datenschutz-Einstellungen</h1>
      <label>
        <input type="checkbox" checked={consent} onChange={handleChange} />
        Ich stimme der Speicherung meiner Daten zu.
      </label>
    </div>
  );
}
