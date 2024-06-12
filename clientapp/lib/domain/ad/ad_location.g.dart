// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ad_location.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AdLocation _$AdLocationFromJson(Map<String, dynamic> json) => AdLocation(
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      type: json['type'] as String,
      uniqueIdentifier: json['uniqueIdentifier'] as String,
    );

Map<String, dynamic> _$AdLocationToJson(AdLocation instance) =>
    <String, dynamic>{
      'name': instance.name,
      'type': instance.type,
      'uniqueIdentifier': instance.uniqueIdentifier,
    };
