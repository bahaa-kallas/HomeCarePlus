import 'package:json_annotation/json_annotation.dart';

part 'service_price.g.dart';

@JsonSerializable()
class ServicePrice {
  final String currencyId;
  final double amount;

  ServicePrice({
    required this.currencyId,
    required this.amount,
  });

  factory ServicePrice.fromJson(Map<String, dynamic> json) =>
      _$ServicePriceFromJson(json);

  Map<String, dynamic> toJson() => _$ServicePriceToJson(this);
}
