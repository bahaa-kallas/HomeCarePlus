import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/order/service_property_answer.dart';
import 'package:servicegeniestore/domain/service/service_price.dart';
import 'package:servicegeniestore/domain/shared/address.dart';

part 'order_create_dto.g.dart';

@JsonSerializable()
class OrderCreateDto {
  final String userId;
  final String serviceId;
  final List<ServicePropertyAnswer> serviceProperties;
  final ServicePrice totalPrice;
  final String paymentMethodId;
  final Address deliveryAddress;
  final DateTime selectedDate;
  final String selectedTimeSlot;
  final String? notes;

  OrderCreateDto({
    required this.userId,
    required this.serviceId,
    required this.serviceProperties,
    required this.totalPrice,
    required this.paymentMethodId,
    required this.deliveryAddress,
    required this.selectedDate,
    required this.selectedTimeSlot,
    this.notes,
  });

  factory OrderCreateDto.fromJson(Map<String, dynamic> json) =>
      _$OrderCreateDtoFromJson(json);

  Map<String, dynamic> toJson() => _$OrderCreateDtoToJson(this);
}
