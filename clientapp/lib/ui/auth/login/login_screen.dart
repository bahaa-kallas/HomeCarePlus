import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/auth/login/login_controller.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';

class LoginScreen extends StatelessWidget {
  final LoginController _loginController = Get.put(LoginController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Container(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Form(
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _loginController.emailController,
                        decoration: InputDecoration(labelText: 'Email'),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter your email';
                          }
                          // Add more specific email validation if needed
                          return null;
                        },
                      ),
                      SizedBox(height: 16),
                      TextFormField(
                        controller: _loginController.passwordController,
                        decoration: InputDecoration(labelText: 'Password'),
                        obscureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a password';
                          }
                          // Add more password validation if needed
                          return null;
                        },
                      ),
                      SizedBox(height: 24),
                      Row(
                        children: [
                          Expanded(
                            child: SGFilledButton(
                              onPressed: () {
                                _loginController.login();
                              },
                              text: 'Sign in',
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
