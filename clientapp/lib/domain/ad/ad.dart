import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/ad/ad_duration.dart';
import 'package:servicegeniestore/domain/ad/ad_state.dart';
import 'package:servicegeniestore/domain/ad/ad_type.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'ad.g.dart';

@JsonSerializable()
class Ad {
  final String id;
  final LocalizedString name;
  final AdType type;
  final String imageUrl;
  final AdDuration duration;
  final AdState state;
  final String? associatedService;

  Ad({
    required this.id,
    required this.name,
    required this.type,
    required this.imageUrl,
    required this.duration,
    required this.state,
    this.associatedService,
  });

  factory Ad.fromJson(Map<String, dynamic> json) => _$AdFromJson(json);

  Map<String, dynamic> toJson() => _$AdToJson(this);
}
