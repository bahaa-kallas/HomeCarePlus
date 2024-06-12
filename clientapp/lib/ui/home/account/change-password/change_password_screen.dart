// reset_password_screen.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';
import 'package:servicegeniestore/ui/home/account/change-password/change_password_controller.dart';

class ChangePasswordScreen extends StatelessWidget {
  final ChangePasswordController controller =
      Get.put(ChangePasswordController());

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reset Password'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: controller.currentPasswordController,
                decoration: InputDecoration(labelText: 'Current Password'),
                obscureText: true,
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter current password'
                    : null,
              ),
              TextFormField(
                controller: controller.newPasswordController,
                decoration: InputDecoration(labelText: 'New Password'),
                obscureText: true,
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter new password'
                    : null,
              ),
              TextFormField(
                controller: controller.confirmPasswordController,
                decoration: InputDecoration(labelText: 'Confirm New Password'),
                obscureText: true,
                validator: (value) => value == null || value.isEmpty
                    ? 'Please confirm new password'
                    : null,
              ),
              SizedBox(height: 16),
              SGFilledButton(
                text: 'Reset Password',
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    controller.resetPassword();
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
