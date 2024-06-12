// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'currency.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Currency _$CurrencyFromJson(Map<String, dynamic> json) => Currency(
      id: json['id'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      code: json['code'] as String,
      basicUnit:
          LocalizedString.fromJson(json['basicUnit'] as Map<String, dynamic>),
      enabled: json['enabled'] as bool,
    );

Map<String, dynamic> _$CurrencyToJson(Currency instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'basicUnit': instance.basicUnit,
      'enabled': instance.enabled,
    };
