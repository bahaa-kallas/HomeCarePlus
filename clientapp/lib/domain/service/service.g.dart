// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'service.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Service _$ServiceFromJson(Map<String, dynamic> json) => Service(
      id: json['id'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      description:
          LocalizedString.fromJson(json['description'] as Map<String, dynamic>),
      tos: json['tos'] == null
          ? null
          : LocalizedString.fromJson(json['tos'] as Map<String, dynamic>),
      imageUrl: json['imageUrl'] as String,
      state: $enumDecode(_$ServiceStateEnumMap, json['state']),
      price: (json['price'] as List<dynamic>)
          .map((e) => ServicePrice.fromJson(e as Map<String, dynamic>))
          .toList(),
      categoryId: json['categoryId'] as String,
      properties: (json['properties'] as List<dynamic>)
          .map((e) => ServiceProperty.fromJson(e as Map<String, dynamic>))
          .toList(),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      supportedPaymentMethods:
          (json['supportedPaymentMethods'] as List<dynamic>)
              .map((e) => e as String)
              .toList(),
      defaultTimeSlots: (json['defaultTimeSlots'] as List<dynamic>)
          .map((e) => TimeSlot.fromJson(e as Map<String, dynamic>))
          .toList(),
      specialDates: (json['specialDates'] as List<dynamic>)
          .map((e) => DateTimeSlots.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$ServiceToJson(Service instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'tos': instance.tos,
      'imageUrl': instance.imageUrl,
      'state': _$ServiceStateEnumMap[instance.state]!,
      'price': instance.price,
      'categoryId': instance.categoryId,
      'properties': instance.properties,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
      'supportedPaymentMethods': instance.supportedPaymentMethods,
      'defaultTimeSlots': instance.defaultTimeSlots,
      'specialDates': instance.specialDates,
    };

const _$ServiceStateEnumMap = {
  ServiceState.public: 'public',
  ServiceState.private: 'private',
};
