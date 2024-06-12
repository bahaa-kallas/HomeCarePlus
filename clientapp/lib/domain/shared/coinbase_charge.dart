import 'package:json_annotation/json_annotation.dart';

part 'coinbase_charge.g.dart';

@JsonSerializable()
class CoinbaseCharge {
  final String chargeUrl;

  CoinbaseCharge(this.chargeUrl);

  factory CoinbaseCharge.fromJson(Map<String, dynamic> json) =>
      _$CoinbaseChargeFromJson((json));

  Map<String, dynamic> toJson() => _$CoinbaseChargeToJson(this);
}
