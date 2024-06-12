import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SignupController extends GetxController {
  late TextEditingController firstNameController;
  late TextEditingController lastNameController;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late TextEditingController phoneNumberController;

  late String _firstName;
  late String _lastName;
  late String _email;
  late String _password;
  late String _phoneNumber;

  late bool _isLoading = false;

  @override
  void onInit() {
    firstNameController = TextEditingController();
    lastNameController = TextEditingController();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    phoneNumberController = TextEditingController();

    _firstName = '';
    _lastName = '';
    _email = '';
    _password = '';
    _phoneNumber = '';

    super.onInit();
  }

  void signup(String type, String firstName, String lastName, String email,
      String password, String phoneNumber) async {
    // Add your signup logic here
  }
}
