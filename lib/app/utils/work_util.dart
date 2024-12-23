import 'package:flutter/material.dart';
import 'package:mysite/core/color/colors.dart';

class WorkCard extends StatelessWidget {
  final String title;
  final String company;
  final String location;
  final String duration;
  final String description;

  const WorkCard({
    super.key,
    required this.title,
    required this.company,
    required this.location,
    required this.duration,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 20.0),
      decoration: BoxDecoration(
        gradient: pinkpurple,
        color: Colors.transparent.withAlpha((0.3 * 255).toInt()),
        borderRadius: BorderRadius.circular(25),
        // boxShadow: [blackColorShadow],
      ),
      child: InkWell(
        hoverColor: Colors.transparent,
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
        onTap: () {},
        child: Column(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8.0),
            Text(
              company,
              style: const TextStyle(
                fontSize: 18.0,
              ),
            ),
            const SizedBox(height: 4.0),
            Text(
              location,
              style: TextStyle(
                fontSize: 16.0,
                color: Theme.of(context).brightness == Brightness.dark
                    ? Colors.grey[400]
                    : Colors.grey[800],
              ),
            ),
            const SizedBox(height: 8.0),
            Text(
              duration,
              style: TextStyle(
                fontSize: 16.0,
                color: Theme.of(context).brightness == Brightness.dark
                    ? Colors.grey[400]
                    : Colors.grey[800],
              ),
            ),
            const SizedBox(height: 16.0),
            Text(
              description,
              style: const TextStyle(fontSize: 16.0),
            ),
          ],
        ),
      ),
    );
  }
}
