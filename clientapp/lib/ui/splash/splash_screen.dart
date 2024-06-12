import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Timer(Duration(seconds: 2), () {
      Get.offAllNamed("/home");
    });
    return Scaffold(
        body: Center(
      child: Image.asset('assets/app-icon.png'),
    ));
  }
}
