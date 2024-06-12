import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/domain/order/order_create_dto.dart';
import 'package:servicegeniestore/domain/order/service_property_answer.dart';
import 'package:servicegeniestore/domain/service/date_time_slots.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/domain/service/service_property.dart';
import 'package:servicegeniestore/domain/shared/coinbase_charge.dart';
import 'package:servicegeniestore/domain/shared/payment_method.dart';
import 'package:servicegeniestore/ui/app_controller.dart';

import '../../domain/api_client.dart';

class ServiceController extends GetxController {
  final _appController = Get.find<AppController>();
  final _apiClient = Get.find<ApiClient>();
  var isLoading = true.obs;

  var paymentMethods = <PaymentMethod>[].obs;
  late final String serviceId;
  final service = Rx<Service?>(null);

  final properties = <ServiceProperty>[].obs;
  final availableTimeSlotsMap = RxMap<DateTime, List<String>>();

  final answers = RxMap<String, dynamic>();
  final selectedDate = Rx<DateTime?>(null);
  final selectedTimeSlot = Rx<String?>(null);
  final notesTextController = TextEditingController();

  ServiceController(this.serviceId) : super() {
    properties.value = service.value?.properties.obs ?? <ServiceProperty>[].obs;

    Future.wait([getService(), getAvailableTimeSlots(), fetchPaymentMethods()]);
  }

  setOption(String key, dynamic value) {
    answers[key] = value;
    update();
    print(answers);
  }

  getOption(String key) {
    return answers[key];
  }

  Future<Service> getService() async {
    try {
      final result = await _apiClient.getServiceById(serviceId);
      service.value = result;
      properties.value = result.properties.obs;
      return result;
    } finally {
      isLoading.value = false;
    }
  }

  Future<List<DateTimeSlots>> getAvailableTimeSlots() async {
    final result = await _apiClient.getServiceAvailableTimeSlots(serviceId);
    availableTimeSlotsMap.value = Map.fromIterable(
      result,
      key: (item) => (item as DateTimeSlots).date,
      value: (item) => (item as DateTimeSlots).slots,
    ).obs;
    return result;
  }

  Future<CoinbaseCharge> submitOrder() async {
    final user = _appController.getCurrentUser!;
    final price = service.value!.price.firstWhere(
        (element) => element.currencyId == _appController.getCurrency?.id);
    final paymentMethodId =
        paymentMethods.value.firstWhere((element) => element.enabled);

    await _apiClient.createOrder(OrderCreateDto(
        userId: user.id,
        serviceId: serviceId,
        serviceProperties: _convertMapToServicePropertyAnswers(answers),
        totalPrice: price,
        paymentMethodId: paymentMethodId.id,
        selectedDate: selectedDate.value!,
        selectedTimeSlot: selectedTimeSlot.value!,
        notes: notesTextController.text,
        deliveryAddress: user.addresses.first));
    print("Order created");
    final chargeResult =
        await _apiClient.createCharge(serviceId, price.currencyId);
    print("Charge created");
    return chargeResult;
  }

  Future<List<PaymentMethod>> fetchPaymentMethods() async {
    final result = await _apiClient.getPaymentMethods();
    paymentMethods.value = result;
    return result;
  }

  List<ServicePropertyAnswer> _convertMapToServicePropertyAnswers(
      RxMap<String, dynamic> map) {
    return map.entries.map((entry) {
      final servicePropertyId = entry.key;
      final property = properties.value
          .firstWhere((element) => element.id == servicePropertyId);
      return ServicePropertyAnswer(
          servicePropertyId: servicePropertyId,
          userSelection: ServicePropertySelection(
              selection: entry.value, type: property.type));
    }).toList();
  }
}
