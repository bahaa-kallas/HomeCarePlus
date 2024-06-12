import 'package:get/get.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/domain/service/service_property.dart';

class ServiceOrderController extends GetxController {
  final Service service;
  final properties = RxList<ServiceProperty>().obs;
  final answers = RxMap<String, dynamic>();

  ServiceOrderController(this.service) : super() {
    properties.value = service.properties.obs;
  }

  setOption(String key, dynamic value) {
    answers[key] = value;
    update();
    print(answers);
  }

  getOption(String key) {
    return answers[key];
  }
}
