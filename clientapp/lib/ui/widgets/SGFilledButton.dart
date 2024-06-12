import 'package:flutter/material.dart';

class SGFilledButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;

  const SGFilledButton({
    required this.onPressed,
    required this.text,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FilledButton(
        style: ElevatedButton.styleFrom(
            padding: EdgeInsets.symmetric(vertical: 18.0),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0))),
        onPressed: this.onPressed,
        child: Text(this.text));
  }
}
