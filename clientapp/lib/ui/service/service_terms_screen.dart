import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/ui/service/service_controller.dart';
import 'package:servicegeniestore/ui/widgets/SGFilledButton.dart';

class ServiceTermsScreen extends StatelessWidget {
  final _controller = Get.put(ServiceController(Get.parameters["id"]!));

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (_controller.isLoading.value) {
        return Scaffold(
          appBar: AppBar(
            title: Text("Loading..."),
          ),
          body: Center(child: CircularProgressIndicator()),
        );
      } else {
        final service = _controller.service.value;

        if (service?.tos == null || service?.tos?.en == "") {
          print(
              "Redirecting to order screen as service has no terms of service");
          Future.microtask(() => Get.offNamed("/service/${service?.id}/order"));
          return Scaffold(
            body: Center(
                child:
                    CircularProgressIndicator()), // Show some loading or empty screen
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: Text("Terms and conditions"),
          ),
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Item 1: Image
              Image.network(
                service!.imageUrl,
                height: 200,
                fit: BoxFit.cover,
              ),
              // Item 2: Long Text
              Expanded(
                child: SingleChildScrollView(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      service.tos != null && service.tos!.en.isNotEmpty
                          ? Text(
                              service.tos!.en,
                              style: TextStyle(fontSize: 16),
                            )
                          : SizedBox.shrink(),
                    ],
                  ),
                ),
              ),
              // Button at the bottom
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SGFilledButton(
                  onPressed: () {
                    Get.toNamed("/service/${service.id}/order");
                  },
                  text: 'Agree and Continue',
                ),
              ),
            ],
          ),
        );
      }
    });
  }
}
