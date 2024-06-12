import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:servicegeniestore/domain/app/app-theme.dart';
import 'package:servicegeniestore/domain/app/localization.dart';
import 'package:servicegeniestore/domain/shared/currency.dart';
import 'package:servicegeniestore/domain/user/user.dart';

class AppController extends GetxController {
  final GetStorage _storage = GetStorage();

  // Keys for storing preferences
  final String _userKey = 'current_user';
  final String _accessToken = 'access_token';
  final String _currencyKey = 'currency';
  final String _themeKey = 'theme';
  final String _localizationKey = 'localization';

  var currentUser = Rxn<User>();
  var accessToken = Rxn<String>();
  var currency = Rxn<Currency>();
  var theme = AppTheme.light.obs;
  var localization = Localization.en.obs;

  User? get getCurrentUser => currentUser.value;

  String? get getAccessToken => accessToken.value;

  Currency? get getCurrency => currency.value;

  AppTheme get getTheme => theme.value;

  Localization get getLocalization => localization.value;

  @override
  void onInit() {
    super.onInit();
    _storage.erase();
    _loadPreferences();
  }

  void _loadPreferences() {
    // Load user
    var userData = _storage.read(_userKey);
    if (userData != null) {
      currentUser.value = User.fromJson(userData);
    }

    // Load currency
    var currencyData = _storage.read(_currencyKey);
    if (currencyData != null) {
      currency.value = Currency.fromJson(currencyData);
    }

    // Load theme
    var themeData = _storage.read(_themeKey);
    if (themeData != null) {
      theme.value = AppTheme.values.firstWhere((e) => e.toString() == themeData,
          orElse: () => AppTheme.light);
    }

    // Load localization
    var localizationData = _storage.read(_localizationKey);
    if (localizationData != null) {
      localization.value = Localization.values.firstWhere(
          (e) => e.toString() == localizationData,
          orElse: () => Localization.en);
    }

    var accessToken = _storage.read(_accessToken);
    if (accessToken != null) {
      this.accessToken.value = accessToken;
    }
  }

  set setCurrentUser(User? user) {
    currentUser.value = user;
    if (user != null) {
      _storage.write(_userKey, user.toJson());
    } else {
      _storage.remove(_userKey);
    }
  }

  set setCurrency(Currency? curr) {
    currency.value = curr;
    if (curr != null) {
      _storage.write(_currencyKey, curr.toJson());
    } else {
      _storage.remove(_currencyKey);
    }
  }

  set setTheme(AppTheme appTheme) {
    theme.value = appTheme;
    _storage.write(_themeKey, appTheme.toString());
  }

  set setAccessToken(String? accessToken) {
    this.accessToken.value = accessToken;
    _storage.write(_accessToken, accessToken);
  }

  set setLocalization(Localization loc) {
    localization.value = loc;
    _storage.write(_localizationKey, loc.toString());
  }
}
