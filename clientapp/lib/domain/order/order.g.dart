// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'order.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Order _$OrderFromJson(Map<String, dynamic> json) => Order(
      id: json['id'] as String,
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
      deliveryDate: json['deliveryDate'] == null
          ? null
          : DateTime.parse(json['deliveryDate'] as String),
      state: $enumDecode(_$OrderStateEnumMap, json['state']),
      trackingNumber: json['trackingNumber'] as String?,
      cancelledAt: json['cancelledAt'] == null
          ? null
          : DateTime.parse(json['cancelledAt'] as String),
    );

Map<String, dynamic> _$OrderToJson(Order instance) => <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'serviceId': instance.serviceId,
      'serviceProperties': instance.serviceProperties,
      'totalPrice': instance.totalPrice,
      'paymentMethodId': instance.paymentMethodId,
      'deliveryAddress': instance.deliveryAddress,
      'deliveryDate': instance.deliveryDate?.toIso8601String(),
      'state': _$OrderStateEnumMap[instance.state]!,
      'trackingNumber': instance.trackingNumber,
      'cancelledAt': instance.cancelledAt?.toIso8601String(),
    };

const _$OrderStateEnumMap = {
  OrderState.placed: 'placed',
  OrderState.scheduled: 'scheduled',
  OrderState.delivered: 'delivered',
  OrderState.cancelled: 'cancelled',
};
