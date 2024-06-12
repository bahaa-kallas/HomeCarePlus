import 'package:get/get.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/domain/app/app-theme.dart';
import 'package:servicegeniestore/domain/app/localization.dart';
import 'package:servicegeniestore/domain/shared/currency.dart';
import 'package:servicegeniestore/ui/app_controller.dart';

class SettingsController extends GetxController {
  final _apiClient = Get.find<ApiClient>();
  final _appController = Get.find<AppController>();

  final currencies = <Currency>[].obs;
  final selectedTheme = AppTheme.light.obs;
  final selectedLanguage = Localization.en.obs;
  final selectedCurrency = Rxn<Currency?>(null);

  void setTheme(AppTheme theme) {
    _appController.setTheme = theme;
    selectedTheme.value = theme;
  }

  void setLanguage(Localization language) {
    _appController.setLocalization = language;
    selectedLanguage.value = language;
  }

  void setCurrency(Currency currency) {
    _appController.setCurrency = currency;
    selectedCurrency.value = currency;
  }

  @override
  void onInit() {
    selectedTheme.value = _appController.getTheme;
    selectedLanguage.value = _appController.getLocalization;

    Future.delayed(Duration.zero, () async {
      await fetchCurrencies();
      selectedCurrency.value = _appController.getCurrency ?? currencies.first;
    });
    super.onInit();
  }

  Future<void> fetchCurrencies() async {
    final result = await _apiClient.getCurrencies();
    currencies.value = result;
  }
}
