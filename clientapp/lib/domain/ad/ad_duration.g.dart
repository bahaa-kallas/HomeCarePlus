// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ad_duration.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AdDuration _$AdDurationFromJson(Map<String, dynamic> json) => AdDuration(
      start: DateTime.parse(json['start'] as String),
      end: DateTime.parse(json['end'] as String),
    );

Map<String, dynamic> _$AdDurationToJson(AdDuration instance) =>
    <String, dynamic>{
      'start': instance.start.toIso8601String(),
      'end': instance.end.toIso8601String(),
    };
