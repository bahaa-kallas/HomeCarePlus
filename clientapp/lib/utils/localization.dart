import 'package:flutter/material.dart';
import 'package:servicegeniestore/utils/lang/localization_data.dart';

class AppLocalization {
  final Locale locale;

  AppLocalization(this.locale);

  static AppLocalization? of(BuildContext context) {
    return Localizations.of<AppLocalization>(context, AppLocalization);
  }

  String? translate(String key) {
    return AppLocalizationData.getValue(locale.languageCode, key);
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<AppLocalization> {
  const AppLocalizationDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'ar'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalization> load(Locale locale) async {
    return AppLocalization(locale);
  }

  @override
  bool shouldReload(AppLocalizationDelegate old) => false;
}
