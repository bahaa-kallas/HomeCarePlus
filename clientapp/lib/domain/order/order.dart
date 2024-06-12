import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/order/order_state.dart';
import 'package:servicegeniestore/domain/order/service_property_answer.dart';
import 'package:servicegeniestore/domain/service/service_price.dart';
import 'package:servicegeniestore/domain/shared/address.dart';

part 'order.g.dart';

@JsonSerializable()
class Order {
  final String id;
  final String userId;
  final String serviceId;
  final List<ServicePropertyAnswer> serviceProperties;
  final ServicePrice totalPrice;
  final String paymentMethodId;
  final Address deliveryAddress;
  final DateTime? deliveryDate;
  final OrderState state;
  final String? trackingNumber;
  final DateTime? cancelledAt;

  Order({
    required this.id,
    required this.userId,
    required this.serviceId,
    required this.serviceProperties,
    required this.totalPrice,
    required this.paymentMethodId,
    required this.deliveryAddress,
    this.deliveryDate,
    required this.state,
    this.trackingNumber,
    this.cancelledAt,
  });

  factory Order.fromJson(Map<String, dynamic> json) => _$OrderFromJson(json);

  Map<String, dynamic> toJson() => _$OrderToJson(this);
}
