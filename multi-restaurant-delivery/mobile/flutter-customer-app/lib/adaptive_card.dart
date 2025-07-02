import 'package:flutter/material.dart';

class AdaptiveCard extends StatelessWidget {
  final List<dynamic> recommendations;
  final bool isGrid;
  const AdaptiveCard({required this.recommendations, required this.isGrid, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (isGrid) {
      return GridView.count(
        crossAxisCount: 2,
        shrinkWrap: true,
        physics: NeverScrollableScrollPhysics(),
        children: recommendations.map((r) => Card(child: ListTile(title: Text(r['title'])))).toList(),
      );
    } else {
      return Column(
        children: recommendations.map((r) => Card(child: ListTile(title: Text(r['title'])))).toList(),
      );
    }
  }
}
