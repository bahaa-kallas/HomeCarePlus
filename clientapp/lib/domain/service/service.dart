import 'package:json_annotation/json_annotation.dart';
import 'package:servicegeniestore/domain/service/date_time_slots.dart';
import 'package:servicegeniestore/domain/service/service_price.dart';
import 'package:servicegeniestore/domain/service/service_property.dart';
import 'package:servicegeniestore/domain/service/service_state.dart';
import 'package:servicegeniestore/domain/service/time_slot.dart';
import 'package:servicegeniestore/domain/shared/localized_string.dart';

part 'service.g.dart';

@JsonSerializable()
class Service {
  final String id;
  final LocalizedString name;
  final LocalizedString description;
  final LocalizedString? tos;
  final String imageUrl;
  final ServiceState state;
  final List<ServicePrice> price;
  final String categoryId;
  final List<ServiceProperty> properties;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<String> supportedPaymentMethods;
  final List<TimeSlot> defaultTimeSlots;
  final List<DateTimeSlots> specialDates;

  Service({
    required this.id,
    required this.name,
    required this.description,
    this.tos,
    required this.imageUrl,
    required this.state,
    required this.price,
    required this.categoryId,
    required this.properties,
    required this.createdAt,
    required this.updatedAt,
    required this.supportedPaymentMethods,
    required this.defaultTimeSlots,
    required this.specialDates,
  });

  factory Service.fromJson(Map<String, dynamic> json) =>
      _$ServiceFromJson(json);

  Map<String, dynamic> toJson() => _$ServiceToJson(this);
}
