import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'currency.g.dart';

@JsonSerializable()
class Currency {
  final String id;
  final LocalizedString name;
  final String code;
  final LocalizedString basicUnit;
  final bool enabled;

  Currency({
    required this.id,
    required this.name,
    required this.code,
    required this.basicUnit,
    required this.enabled,
  });

  factory Currency.fromJson(Map<String, dynamic> json) =>
      _$CurrencyFromJson(json);

  Map<String, dynamic> toJson() => _$CurrencyToJson(this);
}
