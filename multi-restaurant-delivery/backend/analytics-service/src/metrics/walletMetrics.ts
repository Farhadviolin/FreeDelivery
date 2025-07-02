import { Counter, Registry } from 'prom-client';

export const walletNfcScanFailure = new Counter({
  name: 'wallet_nfc_scan_failure_total',
  help: 'Total number of failed NFC scans in the wallet app',
});

export const walletQrScanFailure = new Counter({
  name: 'wallet_qr_scan_failure_total',
  help: 'Total number of failed QR/Barcode scans in the wallet app',
});

export const walletPermissionDenied = new Counter({
  name: 'wallet_permission_denied_total',
  help: 'Total number of permission denied events in the wallet app',
});

export const walletMetricsRegistry = new Registry();
walletMetricsRegistry.registerMetric(walletNfcScanFailure);
walletMetricsRegistry.registerMetric(walletQrScanFailure);
walletMetricsRegistry.registerMetric(walletPermissionDenied);
