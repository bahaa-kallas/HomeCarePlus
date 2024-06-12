import 'package:collection/collection.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/api_client.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/domain/shared/category.dart';

import '../../domain/ad/ad.dart';

class HomeController extends GetxController {
  final selectedTab = 0.obs;
  final apiClient = Get.find<ApiClient>();
  final categories = <ServiceCategory>[].obs;
  final servicesByCategoryId = RxMap<String, List<Service>>().obs;
  final ads = <Ad>[].obs;

  @override
  void onInit() {
    super.onInit();
    Future.delayed(Duration.zero, () async {
      await Future.wait([fetchCategories(), fetchServices(), fetchAds()]);
    });
  }

  Future<List<Service>> fetchServices() async {
    final services = await apiClient.getServices();
    servicesByCategoryId.value =
        groupBy(services, (Service service) => service.categoryId).obs;
    return services;
  }

  Future<List<ServiceCategory>> fetchCategories() async {
    final result = await apiClient.getCategories();
    categories.value = result.obs;
    return result;
  }

  Future<List<Ad>> fetchAds() async {
    final result = await apiClient.getAds();
    ads.value = result.obs;
    return result;
  }
}
