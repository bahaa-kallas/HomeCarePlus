import 'package:json_annotation/json_annotation.dart';

part 'ad_duration.g.dart';

@JsonSerializable()
class AdDuration {
  final DateTime start;
  final DateTime end;

  AdDuration({
    required this.start,
    required this.end,
  });

  factory AdDuration.fromJson(Map<String, dynamic> json) =>
      _$AdDurationFromJson(json);

  Map<String, dynamic> toJson() => _$AdDurationToJson(this);
}
