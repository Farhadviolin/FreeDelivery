import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:nfc_manager/nfc_manager.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'wallet_analytics.dart';

class WalletScreen extends StatefulWidget {
  @override
  _WalletScreenState createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  bool _nfcAvailable = false;
  bool _nfcPermissionGranted = false;
  bool _cameraPermissionGranted = false;
  String _scanResult = '';

  @override
  void initState() {
    super.initState();
    _checkPermissions();
    _checkNfcAvailability();
  }

  Future<void> _checkPermissions() async {
    final nfcStatus = await Permission.nfc.status;
    final cameraStatus = await Permission.camera.status;
    setState(() {
      _nfcPermissionGranted = nfcStatus.isGranted;
      _cameraPermissionGranted = cameraStatus.isGranted;
    });
  }

  Future<void> _requestNfcPermission() async {
    final status = await Permission.nfc.request();
    setState(() {
      _nfcPermissionGranted = status.isGranted;
    });
  }

  Future<void> _requestCameraPermission() async {
    final status = await Permission.camera.request();
    setState(() {
      _cameraPermissionGranted = status.isGranted;
    });
  }

  Future<void> _checkNfcAvailability() async {
    final available = await NfcManager.instance.isAvailable();
    setState(() {
      _nfcAvailable = available;
    });
  }

  void _startNfcSession() {
    if (!_nfcPermissionGranted) return;
    WalletAnalytics.logNfcScanStarted();
    NfcManager.instance.startSession(onDiscovered: (NfcTag tag) async {
      setState(() {
        _scanResult = tag.data.toString();
      });
      WalletAnalytics.logNfcScanSuccess(_scanResult);
      NfcManager.instance.stopSession();
    });
  }

  void _onQrViewCreated(QRViewController controller) {
    WalletAnalytics.logQrScanStarted();
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        _scanResult = scanData.code ?? '';
      });
      WalletAnalytics.logQrScanSuccess(_scanResult);
      controller.dispose();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Wallet & NFC')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (_nfcAvailable)
              ElevatedButton(
                onPressed: _nfcPermissionGranted ? _startNfcSession : _requestNfcPermission,
                child: Text(_nfcPermissionGranted ? 'NFC-Scan starten' : 'NFC-Berechtigung anfordern'),
              ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _cameraPermissionGranted ? () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => QrScanScreen(onScan: (result) {
                    setState(() {
                      _scanResult = result;
                    });
                  }),
                ));
              } : _requestCameraPermission,
              child: Text(_cameraPermissionGranted ? 'QR/Barcode scannen' : 'Kamera-Berechtigung anfordern'),
            ),
            SizedBox(height: 32),
            Text('Scan-Ergebnis: $_scanResult'),
          ],
        ),
      ),
    );
  }
}

class QrScanScreen extends StatelessWidget {
  final void Function(String) onScan;
  QrScanScreen({required this.onScan});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('QR/Barcode-Scan')),
      body: QRView(
        key: GlobalKey(debugLabel: 'QR'),
        onQRViewCreated: (controller) {
          controller.scannedDataStream.listen((scanData) {
            onScan(scanData.code ?? '');
            Navigator.of(context).pop();
            controller.dispose();
          });
        },
      ),
    );
  }
}
