import 'package:json_annotation/json_annotation.dart';

enum ServiceState {
  @JsonValue("public")
  public,
  @JsonValue("private")
  private,
}
