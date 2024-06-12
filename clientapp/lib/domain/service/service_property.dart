import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'service_property.g.dart';

@JsonSerializable()
class ServiceProperty {
  final String id;
  final String type;
  final LocalizedString name;
  final List<dynamic> options;

  ServiceProperty({
    required this.id,
    required this.type,
    required this.name,
    required this.options,
  });

  factory ServiceProperty.fromJson(Map<String, dynamic> json) =>
      _$ServicePropertyFromJson(json);

  Map<String, dynamic> toJson() => _$ServicePropertyToJson(this);
}
