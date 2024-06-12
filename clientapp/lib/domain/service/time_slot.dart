import 'package:json_annotation/json_annotation.dart';

part 'time_slot.g.dart';

@JsonSerializable()
class TimeSlot {
  final int dayOfWeek;
  final List<String> slots;

  TimeSlot({
    required this.dayOfWeek,
    required this.slots,
  });

  factory TimeSlot.fromJson(Map<String, dynamic> json) =>
      _$TimeSlotFromJson(json);

  Map<String, dynamic> toJson() => _$TimeSlotToJson(this);
}
