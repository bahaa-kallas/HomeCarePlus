import 'package:json_annotation/json_annotation.dart';

part 'address.g.dart';

@JsonSerializable()
class Address {
  final String street;
  final String city;
  final String state;
  final String country;
  final String postalCode;

  Address({
    required this.street,
    required this.city,
    required this.state,
    required this.country,
    required this.postalCode,
  });

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);

  Map<String, dynamic> toJson() => _$AddressToJson(this);

  factory Address.empty() {
    return Address(
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    );
  }

  Address copyWith({
    String? street,
    String? city,
    String? state,
    String? country,
    String? postalCode,
  }) {
    return Address(
      street: street ?? this.street,
      city: city ?? this.city,
      state: state ?? this.state,
      country: country ?? this.country,
      postalCode: postalCode ?? this.postalCode,
    );
  }
}
