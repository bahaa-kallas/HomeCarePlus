import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/ui/home/account/account_controller.dart';

class AccountScreen extends StatelessWidget {
  final _controller = Get.put(AccountController());

  AccountScreen();

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => Scaffold(
        body: _controller.isLoggedIn.value
            ? _buildLoggedInContent()
            : _buildLoggedOutContent(context),
      ),
    );
  }

  Widget _buildLoggedInContent() {
    return ListView(
      shrinkWrap: true,
      children: [
        SizedBox(height: 40),
        _buildNonClickableListTileWithBorder(
            _controller.user.value.name, Icons.person),
        _buildNonClickableListTileWithBorder(
            _controller.user.value.phoneNumber, Icons.phone),
        _buildNonClickableListTileWithBorder(
            _controller.user.value.email, Icons.email),
        SizedBox(height: 100),
        _buildClickableListTileWithBorder('Change Password', Icons.lock,
            onTap: () {
          Get.toNamed("/account/change-password");
        }),
        _buildClickableListTileWithBorder('Manage Addresses', Icons.location_on,
            onTap: () {
          Get.toNamed("/account/address");
        }),
        _buildClickableListTileWithBorder('Manage Cards', Icons.credit_card),
        _buildClickableListTileWithBorder('Sign Out', Icons.logout, onTap: () {
          _controller.logout();
          Get.offNamed("/home");
        }),
      ],
    );
  }

  Widget _buildLoggedOutContent(BuildContext context) {
    return Center(
      child: Card(
        margin: EdgeInsets.all(16.0),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.account_circle, size: 80),
              SizedBox(height: 16),
              Text(
                'Access Your Account',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text(
                'Please log in or sign up to manage your account.',
                style: TextStyle(fontSize: 16, color: Colors.grey),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OutlinedButton(
                    onPressed: () {
                      Get.toNamed("/login");
                    },
                    child: Text('Login'),
                  ),
                  SizedBox(width: 16),
                  FilledButton(
                    onPressed: () {
                      Get.toNamed("/signup");
                    },
                    child: Text('Sign Up'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNonClickableListTileWithBorder(String? title, IconData icon) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: Colors.grey.shade300,
            width: 1.0,
          ),
          bottom: BorderSide(
            color: Colors.grey.shade300,
            width: 1.0,
          ),
        ),
      ),
      child: ListTile(
        leading: Icon(icon),
        title: Text(title ?? ''),
        onTap: null,
      ),
    );
  }

  Widget _buildClickableListTileWithBorder(String title, IconData icon,
      {void Function()? onTap}) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: Colors.grey.shade300,
            width: 1.0,
          ),
          bottom: BorderSide(
            color: Colors.grey.shade300,
            width: 1.0,
          ),
        ),
      ),
      child: ListTile(
        leading: Icon(icon),
        title: Text(title),
        onTap: onTap,
        trailing: Icon(Icons.arrow_forward_ios),
      ),
    );
  }
}
