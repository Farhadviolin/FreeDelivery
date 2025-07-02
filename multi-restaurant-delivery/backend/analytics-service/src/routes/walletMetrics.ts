import express from 'express';
import {
  walletNfcScanFailure,
  walletQrScanFailure,
  walletPermissionDenied,
  walletMetricsRegistry,
} from '../metrics/walletMetrics';

const router = express.Router();

router.post('/wallet/nfc-failure', (req, res) => {
  walletNfcScanFailure.inc();
  res.status(200).json({ status: 'ok' });
});

router.post('/wallet/qr-failure', (req, res) => {
  walletQrScanFailure.inc();
  res.status(200).json({ status: 'ok' });
});

router.post('/wallet/permission-denied', (req, res) => {
  walletPermissionDenied.inc();
  res.status(200).json({ status: 'ok' });
});

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', walletMetricsRegistry.contentType);
  res.end(await walletMetricsRegistry.metrics());
});

export default router;
