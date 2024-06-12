// address_controller.dart
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/shared/address.dart';
import 'package:servicegeniestore/ui/app_controller.dart';

class AddressController extends GetxController {
  final appController = Get.find<AppController>();
  var addresses = <Address>[].obs;

  @override
  void onInit() {
    super.onInit();
    if (appController.getCurrentUser != null) {
      addresses.addAll(appController.getCurrentUser!.addresses);
    }
  }

  void addAddress(Address address) {
    addresses.add(address);
  }

  void updateAddress(int index, Address address) {
    addresses[index] = address;
  }

  void deleteAddress(int index) {
    addresses.removeAt(index);
  }
}
