import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:flutter_customer_app/adaptive_card.dart';

void main() {
  testWidgets('renders grid when isGrid is true', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(
      home: AdaptiveCard(
        recommendations: [{'title': 'A'}, {'title': 'B'}],
        isGrid: true,
      ),
    ));
    expect(find.byType(GridView), findsOneWidget);
    expect(find.byType(Card), findsNWidgets(2));
  });

  testWidgets('renders column when isGrid is false', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(
      home: AdaptiveCard(
        recommendations: [{'title': 'A'}, {'title': 'B'}],
        isGrid: false,
      ),
    ));
    expect(find.byType(Column), findsOneWidget);
    expect(find.byType(Card), findsNWidgets(2));
  });
}
