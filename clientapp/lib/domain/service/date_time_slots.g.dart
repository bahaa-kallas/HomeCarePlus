// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'date_time_slots.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DateTimeSlots _$DateTimeSlotsFromJson(Map<String, dynamic> json) =>
    DateTimeSlots(
      date: DateTime.parse(json['date'] as String),
      slots: (json['slots'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$DateTimeSlotsToJson(DateTimeSlots instance) =>
    <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'slots': instance.slots,
    };
