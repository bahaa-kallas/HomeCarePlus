// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'service_property_answer.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ServicePropertyAnswer _$ServicePropertyAnswerFromJson(
        Map<String, dynamic> json) =>
    ServicePropertyAnswer(
      servicePropertyId: json['servicePropertyId'] as String,
      userSelection: ServicePropertySelection.fromJson(
          json['userSelection'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ServicePropertyAnswerToJson(
        ServicePropertyAnswer instance) =>
    <String, dynamic>{
      'servicePropertyId': instance.servicePropertyId,
      'userSelection': instance.userSelection,
    };

ServicePropertySelection _$ServicePropertySelectionFromJson(
        Map<String, dynamic> json) =>
    ServicePropertySelection(
      type: json['type'] as String,
      selection: json['selection'],
    );

Map<String, dynamic> _$ServicePropertySelectionToJson(
        ServicePropertySelection instance) =>
    <String, dynamic>{
      'type': instance.type,
      'selection': instance.selection,
    };
