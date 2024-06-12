import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/ui/home/account/address/address_form.dart';

import 'address_controller.dart';

class AddressListScreen extends StatelessWidget {
  final AddressController addressController = Get.put(AddressController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Address List'),
      ),
      body: Obx(() {
        if (addressController.addresses.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.info_outline, size: 80, color: Colors.grey),
                SizedBox(height: 16),
                Text('No addresses added yet',
                    style: TextStyle(fontSize: 18, color: Colors.grey)),
              ],
            ),
          );
        } else {
          return ListView.builder(
            itemCount: addressController.addresses.length,
            itemBuilder: (context, index) {
              final address = addressController.addresses[index];
              return Dismissible(
                key: Key(address.postalCode),
                direction: DismissDirection.endToStart,
                onDismissed: (direction) {
                  addressController.deleteAddress(index);
                  ScaffoldMessenger.of(context)
                      .showSnackBar(SnackBar(content: Text('Address deleted')));
                },
                background: Container(
                    color: Colors.red,
                    child: Icon(Icons.delete, color: Colors.white)),
                child: ListTile(
                  title: Text('${address.street}, ${address.city}'),
                  subtitle: Text(
                      '${address.state}, ${address.country}, ${address.postalCode}'),
                  onTap: () =>
                      Get.to(() => AddressForm(address: address, index: index)),
                ),
              );
            },
          );
        }
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Get.to(() => AddressForm()),
        child: Icon(Icons.add),
      ),
    );
  }
}
