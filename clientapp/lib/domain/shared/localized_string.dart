import 'package:json_annotation/json_annotation.dart';

part 'localized_string.g.dart';

@JsonSerializable()
class LocalizedString {
  final String en;
  final String ar;

  LocalizedString({required this.en, required this.ar});

  factory LocalizedString.fromJson(Map<String, dynamic> json) =>
      _$LocalizedStringFromJson(json);

  Map<String, dynamic> toJson() => _$LocalizedStringToJson(this);
}
