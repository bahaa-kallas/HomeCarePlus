import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'ad_location.g.dart';

@JsonSerializable()
class AdLocation {
  final LocalizedString name;
  final String type;
  final String uniqueIdentifier;

  AdLocation({
    required this.name,
    required this.type,
    required this.uniqueIdentifier,
  });

  factory AdLocation.fromJson(Map<String, dynamic> json) =>
      _$AdLocationFromJson(json);

  Map<String, dynamic> toJson() => _$AdLocationToJson(this);
}
