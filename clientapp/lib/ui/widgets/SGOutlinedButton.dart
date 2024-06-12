import 'package:flutter/material.dart';

class SGOutlinedButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;

  const SGOutlinedButton({
    required this.onPressed,
    required this.text,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return OutlinedButton(
        style: ElevatedButton.styleFrom(
            padding: EdgeInsets.symmetric(vertical: 18.0),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0))),
        onPressed: this.onPressed,
        child: Text(this.text));
  }
}
