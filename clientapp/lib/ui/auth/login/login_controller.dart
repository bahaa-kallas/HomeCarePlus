import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/ui/app_controller.dart';
import 'package:servicegeniestore/utils/auth/parse_jwt.dart';

class LoginController extends GetxController {
  final _appController = Get.find<AppController>();
  final _apiClient = Get.find<ApiClient>();

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  // Method to perform the login
  void login() {
    print('Email: ${emailController.text}');
    print('Password: ${passwordController.text}');

    Future.delayed(Duration.zero, () async {
      try {
        final result = await _apiClient.login(
            emailController.text, passwordController.text);
        _appController.setAccessToken = result.accessToken;
        _appController.setCurrentUser = parseJwt(result.accessToken);
        _apiClient.accessToken = result.accessToken;
        Get.offAllNamed('/home');
        Get.snackbar("Login Successfull",
            "Welcome ${_appController.currentUser.value?.name},");
      } catch (e) {
        Get.snackbar("Failed to login", "Please check your credentials");
      }
    });
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    super.onClose();
  }
}
