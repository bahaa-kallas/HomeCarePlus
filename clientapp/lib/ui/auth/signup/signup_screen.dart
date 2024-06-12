import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';
import 'package:servicegeniestore/UI/widgets/SGOutlinedButton.dart';

import 'signup_controller.dart';

class SignupScreen extends StatelessWidget {
  final SignupController _signupController = Get.put(SignupController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Signup")),
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
                      Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _signupController.firstNameController,
                              decoration:
                                  InputDecoration(labelText: 'First Name'),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your first name';
                                }
                                return null;
                              },
                            ),
                          ),
                          SizedBox(width: 16),
                          Expanded(
                            child: TextFormField(
                              controller: _signupController.lastNameController,
                              decoration:
                                  InputDecoration(labelText: 'Last Name'),
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter your last name';
                                }
                                return null;
                              },
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      TextFormField(
                        controller: _signupController.emailController,
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
                        controller: _signupController.passwordController,
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
                      SizedBox(height: 16),
                      TextFormField(
                        controller: _signupController.phoneNumberController,
                        decoration: InputDecoration(labelText: 'Phone Number'),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter your phone number';
                          }
                          // Add more phone number validation if needed
                          return null;
                        },
                      ),
                      SizedBox(height: 24),
                      Row(
                        children: [
                          Expanded(
                            child: SGFilledButton(
                              onPressed: () {},
                              text: "Sign Up",
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                      Text(
                        'By signing up you agree to terms and conditions',
                        style: TextStyle(
                          color: Colors.grey.shade600,
                          fontSize: 12,
                        ),
                      ),
                      SizedBox(height: 24),
                      Text(
                        'Already have an account?',
                        style: TextStyle(
                          color: Colors.grey.shade600,
                          fontSize: 16,
                        ),
                      ),
                      SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: SGOutlinedButton(
                              onPressed: () {
                                // Navigate to login screen
                                Get.toNamed('/login');
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
