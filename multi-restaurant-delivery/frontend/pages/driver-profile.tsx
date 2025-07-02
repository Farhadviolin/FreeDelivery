import { useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';

export default function DriverProfilePage() {
  const [profile] = useState({ name: 'Max Mustermann', vehicle: 'E-Bike', language: 'de', darkMode: true });
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Fahrer-Profil</h1>
      <Card>
        <div>Name: {profile.name}</div>
        <div>Fahrzeug: {profile.vehicle}</div>
        <div>Sprache: {profile.language}</div>
        <div>Dark Mode: {profile.darkMode ? 'Ja' : 'Nein'}</div>
        <Button onClick={() => alert('Profil bearbeiten folgt!')}>Bearbeiten</Button>
      </Card>
    </div>
  );
}
