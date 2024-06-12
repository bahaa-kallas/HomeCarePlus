import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/app/app-theme.dart';
import 'package:servicegeniestore/ui/app_controller.dart';
import 'package:servicegeniestore/ui/home/account/account_screen.dart';
import 'package:servicegeniestore/ui/home/home_controller.dart';
import 'package:servicegeniestore/ui/home/orders/orders_screen.dart';
import 'package:servicegeniestore/ui/home/services/services_screen.dart';

class HomeScreen extends StatelessWidget {
  final _homeController = Get.put(HomeController());
  final _appController = Get.find<AppController>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: _logoWidget(),
        actions: [
          // Action with user icon
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {
              // Handle action onPressed event here
              Get.toNamed("/settings");
            },
          ),
        ],
      ),
      body: Obx(() {
        return [
          ServicesScreen(),
          OrdersScreen(),
          AccountScreen(),
        ][_homeController.selectedTab.value];
      }),
      bottomNavigationBar: Obx(() {
        return NavigationBar(
          destinations: [
            NavigationDestination(icon: Icon(Icons.home), label: "Home"),
            NavigationDestination(
                icon: Icon(Icons.history), label: "My Orders"),
            NavigationDestination(
                icon: Icon(Icons.account_box), label: "My Account"),
          ],
          selectedIndex: _homeController.selectedTab.value,
          onDestinationSelected: (index) {
            switch (index) {
              case 0:
                _homeController.selectedTab.value = 0;
                break;
              case 1:
                _homeController.selectedTab.value = 1;
                break;
              case 2:
                _homeController.selectedTab.value = 2;
                break;
            }
          },
        );
      }),
    );
  }

  Widget _logoWidget() {
    final lightGradient = LinearGradient(colors: [
      Colors.black,
      Colors.pinkAccent,
    ]);
    final darkGradient = LinearGradient(colors: [
      Colors.white,
      Colors.pinkAccent,
    ]);

    return Obx(() => WaveText(
          'HomeCare+',
          gradient: _appController.getTheme == AppTheme.dark
              ? darkGradient
              : lightGradient,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontStyle: FontStyle.italic,
            fontSize: 20.0,
          ),
        ));
  }
}

class WaveText extends StatefulWidget {
  final String text;
  final TextStyle style;
  final Gradient gradient;

  const WaveText(
    this.text, {
    required this.gradient,
    this.style = const TextStyle(),
  });

  @override
  _WaveTextState createState() => _WaveTextState();
}

class _WaveTextState extends State<WaveText>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return ShaderMask(
          blendMode: BlendMode.srcIn,
          shaderCallback: (bounds) {
            return widget.gradient.createShader(
              Rect.fromLTWH(
                0,
                0,
                bounds.width,
                bounds.height,
              ),
            );
          },
          child: Transform.translate(
            offset: Offset(
              0,
              4 *
                  (0.5 -
                      (0.5 *
                          (1 +
                              (sin(_controller.value *
                                  2 *
                                  3.141592653589793))))),
            ),
            child: Text(
              widget.text,
              style: widget.style,
            ),
          ),
        );
      },
    );
  }
}
