import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ChangePasswordController extends GetxController {
  final currentPasswordController = TextEditingController();
  final newPasswordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  @override
  void onClose() {
    currentPasswordController.dispose();
    newPasswordController.dispose();
    confirmPasswordController.dispose();
    super.onClose();
  }

  void resetPassword() {
    if (newPasswordController.text == confirmPasswordController.text) {
      // Handle password reset logic here
      Get.snackbar('Success', 'Password has been reset');
    } else {
      Get.snackbar('Error', 'Passwords do not match');
    }
  }
}
