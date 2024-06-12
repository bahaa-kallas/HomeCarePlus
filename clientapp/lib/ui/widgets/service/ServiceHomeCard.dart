import 'package:flutter/material.dart';

class ServiceHomeCard extends StatelessWidget {
  final String imageUrl;
  final String? tag;
  final String title;
  final String subtitle;

  ServiceHomeCard(
      {required this.imageUrl,
      this.tag,
      required this.title,
      required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 250,
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Background image with gradient overlay
            Image.network(
              imageUrl,
              fit: BoxFit.cover,
            ),
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    Theme.of(context).primaryColor.withOpacity(0.7),
                  ],
                ),
              ),
            ),
            // Optional badge
            if (tag != null)
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    tag!,
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
            // Title at the bottom
            Positioned(
              bottom: 8,
              left: 8,
              child: Text(
                title,
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
