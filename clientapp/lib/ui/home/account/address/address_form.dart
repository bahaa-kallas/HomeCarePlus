// address_form.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';
import 'package:servicegeniestore/domain/shared/address.dart';

import 'address_controller.dart';

class AddressForm extends StatelessWidget {
  final Address? address;
  final int? index;
  final AddressController addressController = Get.find();

  AddressForm({this.address, this.index});

  final _formKey = GlobalKey<FormState>();
  final _streetController = TextEditingController();
  final _cityController = TextEditingController();
  final _stateController = TextEditingController();
  final _countryController = TextEditingController();
  final _postalCodeController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (address != null) {
      _streetController.text = address!.street;
      _cityController.text = address!.city;
      _stateController.text = address!.state;
      _countryController.text = address!.country;
      _postalCodeController.text = address!.postalCode;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(address == null ? 'Add Address' : 'Edit Address'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _streetController,
                decoration: InputDecoration(labelText: 'Street'),
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter street'
                    : null,
              ),
              TextFormField(
                controller: _cityController,
                decoration: InputDecoration(labelText: 'City'),
                validator: (value) =>
                    value == null || value.isEmpty ? 'Please enter city' : null,
              ),
              TextFormField(
                controller: _stateController,
                decoration: InputDecoration(labelText: 'State'),
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter state'
                    : null,
              ),
              TextFormField(
                controller: _countryController,
                decoration: InputDecoration(labelText: 'Country'),
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter country'
                    : null,
              ),
              TextFormField(
                controller: _postalCodeController,
                decoration: InputDecoration(labelText: 'Postal Code'),
                validator: (value) => value == null || value.isEmpty
                    ? 'Please enter postal code'
                    : null,
              ),
              SizedBox(height: 16),
              SGFilledButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    final newAddress = Address(
                      street: _streetController.text,
                      city: _cityController.text,
                      state: _stateController.text,
                      country: _countryController.text,
                      postalCode: _postalCodeController.text,
                    );
                    if (index == null) {
                      addressController.addAddress(newAddress);
                    } else {
                      addressController.updateAddress(index!, newAddress);
                    }
                    Get.back();
                  }
                },
                text: address == null ? 'Add' : 'Update',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
