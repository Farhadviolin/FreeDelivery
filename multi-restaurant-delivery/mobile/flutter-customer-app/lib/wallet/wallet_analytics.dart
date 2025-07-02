import 'package:flutter/material.dart';
import 'package:firebase_analytics/firebase_analytics.dart';

class WalletAnalytics {
  static final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  static Future<void> logNfcScanStarted() async {
    await _analytics.logEvent(name: 'nfc_scan_started');
  }

  static Future<void> logNfcScanSuccess(String tag) async {
    await _analytics.logEvent(name: 'nfc_scan_success', parameters: {'tag': tag});
  }

  static Future<void> logQrScanStarted() async {
    await _analytics.logEvent(name: 'qr_scan_started');
  }

  static Future<void> logQrScanSuccess(String code) async {
    await _analytics.logEvent(name: 'qr_scan_success', parameters: {'code': code});
  }
}
