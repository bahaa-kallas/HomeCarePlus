import 'package:get/get.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/domain/user/user.dart';
import 'package:servicegeniestore/ui/app_controller.dart';

class AccountController extends GetxController {
  final _appController = Get.find<AppController>();
  final _apiClient = Get.find<ApiClient>();

  late final user = User.empty().obs;
  late final isLoggedIn = false.obs;

  @override
  void onInit() {
    super.onInit();
    isLoggedIn.value = _appController.getCurrentUser != null;
    user.value = _appController.getCurrentUser ?? User.empty();
  }

  void logout() {
    _appController.setCurrentUser = null;
    _appController.setAccessToken = null;
    _apiClient.accessToken = null;
    isLoggedIn.value = false;
  }
}
