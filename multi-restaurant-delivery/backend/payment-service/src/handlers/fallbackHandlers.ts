export const paymentFallback = async (params: any) => {
  // Beispiel: Payment in Warte-Tabelle speichern, Alert an Admin
  // await someDb.saveFailedPayment(params);
  return { status: 'pending', message: 'Zahlung verzögert, Benachrichtigung an Support gesendet.' };
};
