// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order_create_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

OrderCreateDto _$OrderCreateDtoFromJson(Map<String, dynamic> json) =>
    OrderCreateDto(
      userId: json['userId'] as String,
      serviceId: json['serviceId'] as String,
      serviceProperties: (json['serviceProperties'] as List<dynamic>)
          .map((e) => ServicePropertyAnswer.fromJson(e as Map<String, dynamic>))
          .toList(),
      totalPrice:
          ServicePrice.fromJson(json['totalPrice'] as Map<String, dynamic>),
      paymentMethodId: json['paymentMethodId'] as String,
      deliveryAddress:
          Address.fromJson(json['deliveryAddress'] as Map<String, dynamic>),
      selectedDate: DateTime.parse(json['selectedDate'] as String),
      selectedTimeSlot: json['selectedTimeSlot'] as String,
      notes: json['notes'] as String?,
    );

Map<String, dynamic> _$OrderCreateDtoToJson(OrderCreateDto instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'serviceId': instance.serviceId,
      'serviceProperties': instance.serviceProperties,
      'totalPrice': instance.totalPrice,
      'paymentMethodId': instance.paymentMethodId,
      'deliveryAddress': instance.deliveryAddress,
      'selectedDate': instance.selectedDate.toIso8601String(),
      'selectedTimeSlot': instance.selectedTimeSlot,
      'notes': instance.notes,
    };
