// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'service_property.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ServiceProperty _$ServicePropertyFromJson(Map<String, dynamic> json) =>
    ServiceProperty(
      id: json['id'] as String,
      type: json['type'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      options: json['options'] as List<dynamic>,
    );

Map<String, dynamic> _$ServicePropertyToJson(ServiceProperty instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'name': instance.name,
      'options': instance.options,
    };
