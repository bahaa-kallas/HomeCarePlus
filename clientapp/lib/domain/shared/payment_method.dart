import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'payment_method.g.dart';

@JsonSerializable()
class PaymentMethod {
  final String id;
  final LocalizedString name;
  final LocalizedString description;
  final String? icon;
  final bool enabled;
  final LocalizedString? additionalInformation;

  PaymentMethod({
    required this.id,
    required this.name,
    required this.description,
    this.icon,
    required this.enabled,
    this.additionalInformation,
  });

  factory PaymentMethod.fromJson(Map<String, dynamic> json) =>
      _$PaymentMethodFromJson(json);

  Map<String, dynamic> toJson() => _$PaymentMethodToJson(this);
}
