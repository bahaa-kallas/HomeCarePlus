import 'package:json_annotation/json_annotation.dart';

part 'date_time_slots.g.dart';

@JsonSerializable()
class DateTimeSlots {
  final DateTime date;
  final List<String> slots;

  DateTimeSlots({
    required this.date,
    required this.slots,
  });

  factory DateTimeSlots.fromJson(Map<String, dynamic> json) =>
      _$DateTimeSlotsFromJson(json);

  Map<String, dynamic> toJson() => _$DateTimeSlotsToJson(this);
}
