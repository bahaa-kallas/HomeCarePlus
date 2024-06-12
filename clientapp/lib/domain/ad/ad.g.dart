// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ad.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Ad _$AdFromJson(Map<String, dynamic> json) => Ad(
      id: json['id'] as String,
      name: LocalizedString.fromJson(json['name'] as Map<String, dynamic>),
      type: $enumDecode(_$AdTypeEnumMap, json['type']),
      imageUrl: json['imageUrl'] as String,
      duration: AdDuration.fromJson(json['duration'] as Map<String, dynamic>),
      state: $enumDecode(_$AdStateEnumMap, json['state']),
      associatedService: json['associatedService'] as String?,
    );

Map<String, dynamic> _$AdToJson(Ad instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'type': _$AdTypeEnumMap[instance.type]!,
      'imageUrl': instance.imageUrl,
      'duration': instance.duration,
      'state': _$AdStateEnumMap[instance.state]!,
      'associatedService': instance.associatedService,
    };

const _$AdTypeEnumMap = {
  AdType.banner_image: 'banner_image',
  AdType.banner_text: 'banner_text',
  AdType.full_screen_image: 'full_screen_image',
};

const _$AdStateEnumMap = {
  AdState.active: 'active',
  AdState.inactive: 'inactive',
};
