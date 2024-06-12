// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'service_price.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ServicePrice _$ServicePriceFromJson(Map<String, dynamic> json) => ServicePrice(
      currencyId: json['currencyId'] as String,
      amount: (json['amount'] as num).toDouble(),
    );

Map<String, dynamic> _$ServicePriceToJson(ServicePrice instance) =>
    <String, dynamic>{
      'currencyId': instance.currencyId,
      'amount': instance.amount,
    };
