import 'package:get/get.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/domain/order/order.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/ui/app_controller.dart';

class OrderController extends GetxController {
  final _appController = Get.find<AppController>();
  final _apiClient = Get.find<ApiClient>();
  final orders = <Order>[].obs;
  final services = <Service>[].obs;
  final isLoading = true.obs;

  @override
  void onInit() {
    fetchOrders();
    super.onInit();
  }

  void fetchOrders() async {
    try {
      isLoading(true);
      final user = _appController.getCurrentUser;
      if (user != null) {
        var fetchedOrders = await _apiClient.getOrdersByUserId(user.id);
        fetchedOrders.map((element) async {
          services.value
              .add(await _apiClient.getServiceById(element.serviceId));
          print(services.value);
        });
        orders.value = fetchedOrders.obs;
      }
    } finally {
      isLoading(false);
    }
  }
}
