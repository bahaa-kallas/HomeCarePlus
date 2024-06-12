import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/domain/service/service_price.dart';
import 'package:servicegeniestore/domain/shared/currency.dart';
import 'package:servicegeniestore/ui/app_controller.dart';
import 'package:servicegeniestore/ui/service/service_controller.dart';
import 'package:servicegeniestore/ui/webview/webview_screen.dart';

class ServiceCheckoutScreen extends StatelessWidget {
  final _controller = Get.find<ServiceController>();
  final _appController = Get.find<AppController>();

  @override
  Widget build(BuildContext context) {
    final service = _controller.service.value;
    final currency = _appController.getCurrency!;
    final servicePrice = service?.price
        .firstWhere((element) => element.currencyId == currency.id);

    return service != null
        ? Scaffold(
            appBar: AppBar(
              title: Text(service.name.en),
            ),
            body: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildOfferDetails(service, currency, servicePrice!),
                  SizedBox(height: 16),
                  _buildPriceDetails(servicePrice, currency),
                  _buildPaymentMethods(),
                  SizedBox(height: 16),
                  Spacer(),
                  _buildPlaceOrderButton(context),
                ],
              ),
            ),
          )
        : SizedBox.shrink();
  }

  Widget _buildOfferDetails(
      Service service, Currency currency, ServicePrice servicePrice) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      service.name.en,
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    ..._controller.answers.entries.map((entry) {
                      final property = service.properties
                          .firstWhere((element) => element.id == entry.key);
                      return Text(
                        '${property.name.en}: ${entry.value["en"]}',
                        style: TextStyle(fontSize: 14),
                      );
                    }).toList(),
                  ],
                ),
              ),
              SizedBox(width: 16),
              Text(
                '${currency.code} ${servicePrice.amount}',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              )
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPriceDetails(ServicePrice servicePrice, Currency currency) {
    final serviceFee = 10.99;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildPriceRow('Service Fee', '${currency.code} $serviceFee'),
        _buildPriceRow('Subtotal', '${currency.code} ${servicePrice.amount}'),
        Divider(color: Colors.grey),
        _buildPriceRow(
          'Total',
          '${currency.code} ${servicePrice.amount + serviceFee}',
          isTotal: true,
        ),
      ],
    );
  }

  Widget _buildPriceRow(String title, String amount, {bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          Text(
            amount,
            style: TextStyle(
              fontSize: 14,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentMethods() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 24),
        Text("Payment Method",
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
        SizedBox(height: 24),
        Row(
          children: [
            _buildPaymentMethodCard(
                Icons.currency_bitcoin, 'Payment by Cryptocurrency'),
          ],
        ),
      ],
    );
  }

  Widget _buildPaymentMethodCard(IconData icon, String label) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Icon(icon, size: 30, color: Colors.teal),
            Text(label, style: TextStyle(fontSize: 14)),
          ],
        ),
      ),
    );
  }

  Widget _buildPlaceOrderButton(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: SGFilledButton(
        text: 'Place Order',
        onPressed: () {
          _startPayment(context);
        },
      ),
    );
  }

  Future<void> _startPayment(BuildContext context) async {
    try {
      final charge = await _controller.submitOrder();
      Get.to(WebViewScreen(url: charge.chargeUrl));
    } catch (e) {
      print('Failed to open webview: $e');
    }
  }
}
