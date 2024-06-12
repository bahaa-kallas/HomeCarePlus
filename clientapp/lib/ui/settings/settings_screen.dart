import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/app/app-theme.dart';
import 'package:servicegeniestore/domain/app/localization.dart';
import 'package:servicegeniestore/ui/settings/settings_controller.dart';

class SettingsScreen extends StatelessWidget {
  final _controller = Get.put(SettingsController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Get.back(),
        ),
      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Preferences',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Theme'),
                    Obx(() {
                      return DropdownButton<AppTheme>(
                        value: _controller.selectedTheme.value,
                        items: AppTheme.values.map((theme) {
                          return DropdownMenuItem(
                            value: theme,
                            child: Text(
                                theme == AppTheme.light ? 'Light' : 'Dark'),
                          );
                        }).toList(),
                        onChanged: (theme) {
                          if (theme != null) {
                            _controller.setTheme(theme);
                          }
                        },
                      );
                    }),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Language'),
                    Obx(() {
                      return DropdownButton<Localization>(
                        value: _controller.selectedLanguage.value,
                        items: Localization.values.map((loc) {
                          return DropdownMenuItem(
                            value: loc,
                            child: Text(
                                loc == Localization.en ? 'English' : 'Arabic'),
                          );
                        }).toList(),
                        onChanged: (loc) {
                          if (loc != null) {
                            _controller.setLanguage(loc);
                          }
                        },
                      );
                    }),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Currency'),
                    Obx(() {
                      return DropdownButton<String>(
                        value: _controller.selectedCurrency.value?.id,
                        items: _controller.currencies.value.map((currency) {
                          return DropdownMenuItem(
                            value: currency.id,
                            child: Text(currency.name.en),
                          );
                        }).toList(),
                        onChanged: (value) {
                          if (value != null) {
                            final selectedCurrency = _controller
                                .currencies.value
                                .firstWhere((element) => element.id == value);
                            _controller.setCurrency(selectedCurrency);
                          }
                        },
                      );
                    }),
                  ],
                ),
              ],
            ),
          ),
          Divider(),
        ],
      ),
    );
  }
}
