// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      id: json['id'] as String,
      type: $enumDecode(_$UserTypeEnumMap, json['type']),
      name: json['name'] as String,
      email: json['email'] as String,
      emailVerified: json['emailVerified'] as bool,
      createdAt: DateTime.parse(json['createdAt'] as String),
      addresses: (json['addresses'] as List<dynamic>)
          .map((e) => Address.fromJson(e as Map<String, dynamic>))
          .toList(),
      phoneNumber: json['phoneNumber'] as String?,
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'id': instance.id,
      'type': _$UserTypeEnumMap[instance.type]!,
      'name': instance.name,
      'email': instance.email,
      'emailVerified': instance.emailVerified,
      'createdAt': instance.createdAt.toIso8601String(),
      'addresses': instance.addresses,
      'phoneNumber': instance.phoneNumber,
    };

const _$UserTypeEnumMap = {
  UserType.admin: 'admin',
  UserType.customer: 'customer',
};
