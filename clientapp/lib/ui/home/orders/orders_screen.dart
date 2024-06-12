import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/ui/home/orders/orders_controller.dart';

class OrdersScreen extends StatelessWidget {
  final OrderController orderController = Get.put(OrderController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(() {
        if (orderController.isLoading.value) {
          return Center(child: CircularProgressIndicator());
        } else if (orderController.orders.isEmpty) {
          return Center(child: Text('No orders found.'));
        } else {
          return ListView.builder(
            itemCount: orderController.orders.length,
            itemBuilder: (context, index) {
              final order = orderController.orders[index];
              //final service  = orderController.services.value.firstWhere((element) => element.id == order.serviceId);
              return Card(
                margin: EdgeInsets.all(8.0),
                child: ListTile(
                  title: Text('Order ID: ${order.id}'),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      //Text('Servic: ${service.name.en}'),
                      Text('Total Price: ${order.totalPrice.amount}'),
                      if (order.deliveryDate != null)
                        Text(
                            'Delivery Date: ${order.deliveryDate!.toLocal().toString().split(' ')[0]}'),
                      Text(
                          'Order State: ${order.state.toString().split('.').last}'),
                      if (order.trackingNumber != null)
                        Text('Tracking Number: ${order.trackingNumber}'),
                      if (order.cancelledAt != null)
                        Text(
                            'Cancelled At: ${order.cancelledAt!.toLocal().toString().split(' ')[0]}'),
                    ],
                  ),
                ),
              );
            },
          );
        }
      }),
    );
  }
}
