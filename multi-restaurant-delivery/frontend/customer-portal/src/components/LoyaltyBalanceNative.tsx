import React from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoyalty } from '../hooks/useLoyalty';

export function LoyaltyBalanceNative({ userId }: { userId: string }) {
  const { points, status, refresh } = useLoyalty(userId);

  if (status === 'loading') return <ActivityIndicator size="large" />;
  if (status === 'error')
    return (
      <View style={styles.container}>
        <Text>Fehler beim Laden.</Text>
        <Button title="Erneut versuchen" onPress={refresh} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ihr Punktestand</Text>
      <Text style={styles.points}>{points} P</Text>
      <Button title="Aktualisieren" onPress={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: '600' },
  points: { fontSize: 32, marginVertical: 8 }
});
