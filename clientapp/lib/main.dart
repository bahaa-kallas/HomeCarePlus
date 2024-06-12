import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:json_theme/json_theme.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/domain/app/app-theme.dart';
import 'package:servicegeniestore/ui/app_controller.dart';
import 'package:servicegeniestore/ui/auth/login/login_screen.dart';
import 'package:servicegeniestore/ui/auth/signup/signup_screen.dart';
import 'package:servicegeniestore/ui/home/account/account_screen.dart';
import 'package:servicegeniestore/ui/home/account/change-password/change_password_screen.dart';
import 'package:servicegeniestore/ui/home/home_screen.dart';
import 'package:servicegeniestore/ui/service/checkout/service_checkout_screen.dart';
import 'package:servicegeniestore/ui/service/order/service_order_screen.dart';
import 'package:servicegeniestore/ui/service/service_terms_screen.dart';
import 'package:servicegeniestore/ui/service/success/success_screen.dart';
import 'package:servicegeniestore/ui/settings/settings_controller.dart';
import 'package:servicegeniestore/ui/settings/settings_screen.dart';
import 'package:servicegeniestore/ui/splash/splash_screen.dart';

import 'ui/home/account/address/address_list_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await GetStorage.init();

  final darkThemeJson =
      jsonDecode(await rootBundle.loadString('assets/theme/dark_theme.json'));
  final lightThemeJson =
      jsonDecode(await rootBundle.loadString('assets/theme/light_theme.json'));
  final darkTheme = ThemeDecoder.decodeThemeData(darkThemeJson)!;
  final lightTheme = ThemeDecoder.decodeThemeData(lightThemeJson)!;

  const baseUrl = kIsWeb
      ? "http://127.0.0.1:5000"
      : "https://7986-156-146-60-30.ngrok-free.app";
  const applicationConfig = {"serverBaseUrl": baseUrl};

  Get.put(ApiClient(applicationConfig["serverBaseUrl"]!));
  Get.put(AppController());
  Get.put(SettingsController());

  runApp(MyApp(darkThem: darkTheme, lightTheme: lightTheme));
}

class MyApp extends StatelessWidget {
  final _controller = Get.put(AppController());
  late final ThemeData darkThem;
  late final ThemeData lightTheme;

  MyApp({Key? key, required this.darkThem, required this.lightTheme})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => GetMaterialApp(
          title: 'HomeCare +',
          debugShowCheckedModeBanner: false,
          theme: _controller.getTheme == AppTheme.light ? lightTheme : darkThem,
          initialRoute: '/splash',
          getPages: [
            GetPage(name: '/splash', page: () => SplashScreen()),
            GetPage(name: '/home', page: () => HomeScreen()),
            GetPage(name: '/login', page: () => LoginScreen()),
            GetPage(name: '/signup', page: () => SignupScreen()),
            GetPage(name: '/settings', page: () => SettingsScreen()),
            GetPage(name: '/account', page: () => AccountScreen()),
            GetPage(name: "/checkout/complete", page: () => SuccessScreen()),
            GetPage(
                name: '/account/change-password',
                page: () => ChangePasswordScreen()),
            GetPage(name: '/account/address', page: () => AddressListScreen()),
            GetPage(
                name: "/service/:id/terms-and-conditions",
                page: () => ServiceTermsScreen()),
            GetPage(
                name: "/service/:id/order", page: () => ServiceOrderScreen()),
            GetPage(
                name: "/service/:id/checkout",
                page: () => ServiceCheckoutScreen())
          ]),
    );
  }
}
