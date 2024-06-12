class AppLocalizationData {
  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'title': 'Home Services',
      'hello': 'Hello!',
      'login': 'Login',
      'signup': 'Signup',
      // Add more translations here
    },
    'ar': {
      'title': 'خدمات المنزل',
      'hello': 'مرحبا!',
      'login': 'تسجيل الدخول',
      'signup': 'سجل',
      // Add more translations here
    },
  };

  static String? getValue(String languageCode, String key) {
    return _localizedValues[languageCode]![key];
  }
}