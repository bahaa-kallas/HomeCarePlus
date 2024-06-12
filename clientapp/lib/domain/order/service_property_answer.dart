import 'package:json_annotation/json_annotation.dart';

part 'service_property_answer.g.dart';

@JsonSerializable()
class ServicePropertyAnswer {
  final String servicePropertyId;
  final ServicePropertySelection userSelection;

  ServicePropertyAnswer({
    required this.servicePropertyId,
    required this.userSelection,
  });

  factory ServicePropertyAnswer.fromJson(Map<String, dynamic> json) =>
      _$ServicePropertyAnswerFromJson(json);

  Map<String, dynamic> toJson() => _$ServicePropertyAnswerToJson(this);
}

@JsonSerializable()
class ServicePropertySelection {
  final String type;
  final dynamic selection;

  ServicePropertySelection({required this.type, required this.selection});

  factory ServicePropertySelection.fromJson(Map<String, dynamic> json) =>
      _$ServicePropertySelectionFromJson(json);

  Map<String, dynamic> toJson() => _$ServicePropertySelectionToJson(this);
}
