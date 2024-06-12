// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_method.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymentMethod _$PaymentMethodFromJson(Map<String, dynamic> json) =>
    PaymentMethod(
      id: json['id'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      description:
          LocalizedString.fromJson(json['description'] as Map<String, dynamic>),
      icon: json['icon'] as String?,
      enabled: json['enabled'] as bool,
      additionalInformation: json['additionalInformation'] == null
          ? null
          : LocalizedString.fromJson(
              json['additionalInformation'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$PaymentMethodToJson(PaymentMethod instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'icon': instance.icon,
      'enabled': instance.enabled,
      'additionalInformation': instance.additionalInformation,
    };
