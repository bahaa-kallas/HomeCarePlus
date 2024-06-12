import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/shared/address.dart';
import 'package:servicegeniestore/domain/user/user_type.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final String id;
  final UserType type;
  final String name;
  final String email;
  final bool emailVerified;
  final DateTime createdAt;
  final List<Address> addresses;
  final String? phoneNumber;

  User({
    required this.id,
    required this.type,
    required this.name,
    required this.email,
    required this.emailVerified,
    required this.createdAt,
    required this.addresses,
    this.phoneNumber,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);

  factory User.empty() => User(
      id: '',
      type: UserType.customer,
      name: '',
      email: '',
      emailVerified: false,
      createdAt: DateTime.now(),
      addresses: [],
      phoneNumber: null);
}
