import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'category.g.dart';

@JsonSerializable()
class ServiceCategory {
  final String id;
  final LocalizedString name;

  ServiceCategory({
    required this.id,
    required this.name,
  });

  factory ServiceCategory.fromJson(Map<String, dynamic> json) =>
      _$ServiceCategoryFromJson((json));

  Map<String, dynamic> toJson() => _$ServiceCategoryToJson(this);
}
