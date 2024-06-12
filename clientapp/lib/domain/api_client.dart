import 'package:dio/dio.dart';
import 'package:servicegeniestore/domain/ad/ad.dart';
import 'package:servicegeniestore/domain/auth/auth_response.dart';
import 'package:servicegeniestore/domain/order/order.dart';
import 'package:servicegeniestore/domain/order/order_create_dto.dart';
import 'package:servicegeniestore/domain/service/date_time_slots.dart';
import 'package:servicegeniestore/domain/service/service.dart';
import 'package:servicegeniestore/domain/shared/category.dart';
import 'package:servicegeniestore/domain/shared/coinbase_charge.dart';
import 'package:servicegeniestore/domain/shared/currency.dart';
import 'package:servicegeniestore/domain/shared/payment_method.dart';
import 'package:servicegeniestore/domain/user/user.dart';

class ApiClient {
  final Dio _dio;
  final String baseURL;
  String? accessToken = null;

  ApiClient(this.baseURL) : _dio = Dio();

  Future<AuthResponse> login(String email, String password) async {
    try {
      final response = await _dio.post(
        '$baseURL/api/authentication/login',
        data: {
          'email': email,
          'password': password,
        },
      );
      return AuthResponse.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to login: $error');
    }
  }

  Future<User> getUser() async {
    try {
      final response = await _dio.get('$baseURL/api/user/currentUser',
          queryParameters: {"access_token": accessToken});
      return User.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch services: $error');
    }
  }

  Future<List<Service>> getServices() async {
    try {
      final response = await _dio.get('$baseURL/api/service');
      final List<dynamic> data = response.data;
      return data.map((json) => Service.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch services: $error');
    }
  }

  Future<Service> getServiceById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/service/$id');
      return Service.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch service: $error');
    }
  }

  Future<List<DateTimeSlots>> getServiceAvailableTimeSlots(String id) async {
    try {
      final response =
          await _dio.get('$baseURL/api/service/$id/available-slots');
      final List<dynamic> data = response.data;
      return data.map((json) => DateTimeSlots.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch service available time slots: $error');
    }
  }

  Future<User> getUserById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/user/$id');
      return User.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch user: $error');
    }
  }

  Future<List<Ad>> getAds() async {
    try {
      final response = await _dio.get('$baseURL/api/ad');
      final List<dynamic> data = response.data;
      return data.map((json) => Ad.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch ads: $error');
    }
  }

  Future<void> updateAd(String id, Map<String, dynamic> updatedAdData) async {
    try {
      await _dio.put('$baseURL/api/ad/$id', data: updatedAdData);
    } catch (error) {
      throw Exception('Failed to update ad: $error');
    }
  }

  Future<List<PaymentMethod>> getPaymentMethods() async {
    try {
      final response = await _dio.get('$baseURL/api/payment-method');
      final List<dynamic> data = response.data;
      return data.map((json) => PaymentMethod.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch payment methods: $error');
    }
  }

  Future<PaymentMethod> getPaymentMethod(String paymentMethodId) async {
    try {
      final response =
          await _dio.get('$baseURL/api/payment-method/$paymentMethodId');
      return PaymentMethod.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch payment method: $error');
    }
  }

  Future<PaymentMethod> getPaymentMethodById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/payment-method/$id');
      return PaymentMethod.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch payment method: $error');
    }
  }

  Future<List<ServiceCategory>> getCategories() async {
    try {
      final response = await _dio.get('$baseURL/api/category');
      final List<dynamic> data = response.data;
      return data.map((json) => ServiceCategory.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch categories: $error');
    }
  }

  Future<ServiceCategory> getCategoryById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/category/$id');
      return ServiceCategory.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch category: $error');
    }
  }

  Future<void> updateCategory(
      String id, Map<String, dynamic> updatedCategoryData) async {
    try {
      await _dio.put('$baseURL/api/category/$id', data: updatedCategoryData);
    } catch (error) {
      throw Exception('Failed to update category: $error');
    }
  }

  Future<List<Currency>> getCurrencies() async {
    try {
      final response = await _dio.get('$baseURL/api/currency');
      final List<dynamic> data = response.data;
      return data.map((json) => Currency.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch currency: $error');
    }
  }

  Future<Currency> getCurrencyById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/currency/$id');
      return Currency.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch currency: $error');
    }
  }

  Future<void> createOrder(OrderCreateDto orderData) async {
    try {
      await _dio.post('$baseURL/api/order', data: orderData);
    } catch (error) {
      throw Exception('Failed to create order: $error');
    }
  }

  Future<Order> getOrderById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/order/$id');
      return Order.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch order: $error');
    }
  }

  Future<List<Order>> getOrdersByUserId(String userId) async {
    try {
      final response = await _dio.get('$baseURL/api/order/user/$userId');
      final List<dynamic> data = response.data;
      return data.map((json) => Order.fromJson(json)).toList();
    } catch (error) {
      throw Exception('Failed to fetch order: $error');
    }
  }

  Future<void> updateOrder(
      String id, Map<String, dynamic> updateOrderData) async {
    try {
      await _dio.put('$baseURL/api/order/$id', data: updateOrderData);
    } catch (error) {
      throw Exception('Failed to update order: $error');
    }
  }

  Future<Ad> getAdById(String id) async {
    try {
      final response = await _dio.get('$baseURL/api/ad/$id');
      return Ad.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to fetch ad: $error');
    }
  }

  Future<CoinbaseCharge> createCharge(
      String serviceId, String currencyId) async {
    try {
      final response = await _dio.post('$baseURL/api/coinbase/create-charge',
          queryParameters: {"serviceId": serviceId, "currencyId": currencyId});
      return CoinbaseCharge.fromJson(response.data);
    } catch (error) {
      throw Exception('Failed to create charge: $error');
    }
  }
}
