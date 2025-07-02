import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:integration_test/integration_test.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:ki_liefer/wallet/wallet_screen.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('WalletScreen: NFC & QR/Barcode Flow', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: WalletScreen()));

    // Check NFC button
    expect(find.textContaining('NFC'), findsOneWidget);
    // Simulate NFC permission denied
    await tester.tap(find.textContaining('NFC-Berechtigung anfordern'));
    await tester.pumpAndSettle();
    // (Permission dialog would appear in real device)

    // Check QR/Barcode button
    expect(find.textContaining('QR/Barcode'), findsOneWidget);
    // Simulate Camera permission denied
    await tester.tap(find.textContaining('Kamera-Berechtigung anfordern'));
    await tester.pumpAndSettle();
    // (Permission dialog would appear in real device)

    // Simulate permission granted and scan result
    // (In real device, use mockito or platform channels to mock permission and scan)
  });
}
