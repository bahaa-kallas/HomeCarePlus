// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'time_slot.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TimeSlot _$TimeSlotFromJson(Map<String, dynamic> json) => TimeSlot(
      dayOfWeek: (json['dayOfWeek'] as num).toInt(),
      slots: (json['slots'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$TimeSlotToJson(TimeSlot instance) => <String, dynamic>{
      'dayOfWeek': instance.dayOfWeek,
      'slots': instance.slots,
    };
