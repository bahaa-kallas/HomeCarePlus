import 'dart:convert';

import 'package:servicegeniestore/domain/user/user.dart';

User parseJwt(String token) {
  final parts = token.split('.');
  if (parts.length != 3) {
    throw Exception('Invalid token');
  }

  final payload = parts[1];
  final normalized = base64Url.normalize(payload);
  final payloadMap = json.decode(utf8.decode(base64Url.decode(normalized)));
  if (payloadMap is! Map<String, dynamic>) {
    throw Exception('Invalid payload');
  }

  return User.fromJson(payloadMap);
}
