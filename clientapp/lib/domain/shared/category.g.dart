// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'category.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ServiceCategory _$ServiceCategoryFromJson(Map<String, dynamic> json) =>
    ServiceCategory(
      id: json['id'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ServiceCategoryToJson(ServiceCategory instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };
