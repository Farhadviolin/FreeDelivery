import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

export function MaintenanceAlert({ vehicleId }: { vehicleId: string }) {
  const [risk, setRisk] = useState<number|null>(null);

  useEffect(() => {
    fetch(`https://api.delivery.com/predict/${vehicleId}`)
      .then(r => r.json())
      .then(d => setRisk(d.failure_risk))
      .catch(() => setRisk(null));
  }, [vehicleId]);

  if (risk === null) return null;
  if (risk < 0.5) return null;
  return (
    <View style={{ padding: 16, backgroundColor:'#FEE2E2' }}>
      <Text>Wartung erforderlich! Ausfallrisiko: {(risk*100).toFixed(1)}%</Text>
      <Button title="Wartung anfordern" onPress={() => {/* Dispatch Maintenance Task */}} />
    </View>
  );
}
