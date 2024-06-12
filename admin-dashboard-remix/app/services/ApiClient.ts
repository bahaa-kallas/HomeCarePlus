import { Category } from "@/domain/models/Category";
import { PaymentMethod } from "@/domain/models/PaymentMethod";
import { Service } from "@/domain/services/Service";
import { Order } from "@/domain/models/Order";
import { Currency } from "@/domain/models/Currency";

interface AuthResponse {
  accessToken: string;
}

class APIClient {
  private readonly baseURL: string;
  accessToken: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.accessToken = null;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/api/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    console.log("Response is", data);
    if (data.accessToken) {
      this.accessToken = data.accessToken;
    }
    return data;
  }

  async getServices(): Promise<Service[]> {
    return this._authenticatedRequest("/api/service");
  }

  async createService(serviceData: any): Promise<any> {
    return this._authenticatedRequest("/api/service", {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  }

  async getServiceById(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/service/${id}`);
  }

  async updateService(id: string, updatedServiceData: any): Promise<any> {
    return this._authenticatedRequest(`/api/service/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedServiceData)
    });
  }

  async deleteService(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/service/${id}`, {
      method: 'DELETE'
    });
  }

  async getUserById(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/user/${id}`);
  }

  async getUsers(): Promise<any> {
    return this._authenticatedRequest(`/api/user/}`);
  }

  async createUser(userData: any): Promise<any> {
    return this._authenticatedRequest(`/api/user`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/user`, {
      method: "DELETE",
    });
  }

  async getAds(): Promise<any> {
    return this._authenticatedRequest(`/api/ad`);
  }

  async createAd(adData: any): Promise<any> {
    return this._authenticatedRequest(`/api/ad`, {
      method: 'POST',
      body: JSON.stringify(adData)
    });
  }

  async updateAd(id: string, updatedAdData: any): Promise<any> {
    return this._authenticatedRequest(`/api/ad/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedAdData)
    });
  }
  async deleteAd(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/ad/${id}`, {
      method: "DELETE",
    });
  }

  async getPaymentMethods(): Promise<any> {
    return this._authenticatedRequest("/api/payment-method");
  }

  async getPaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return this._authenticatedRequest(`/api/payment-method/${paymentMethodId}`);
  }

  async createPaymentMethod(paymentMethodData: any): Promise<any> {
    return this._authenticatedRequest("/api/payment-method", {
      method: "POST",
      body: JSON.stringify(paymentMethodData),
    });
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethod> {
    return this._authenticatedRequest(`/api/payment-method/${id}`);
  }

  async updatePaymentMethod(id: string, updatedPaymentMethodData: any): Promise<any> {
    return this._authenticatedRequest(`/api/payment-method/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPaymentMethodData),
    });
  }

  async deletePaymentMethod(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/payment-method/${id}`, {
      method: "DELETE",
    });
  }

  async getCategories(): Promise<any> {
    return this._authenticatedRequest("/api/category");
  }

  async createCategory(categoryData: any): Promise<any> {
    return this._authenticatedRequest("/api/category", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async getCategoryById(id: string): Promise<Category> {
    return this._authenticatedRequest(`/api/category/${id}`);
  }

  async updateCategory(id: string, updatedPaymentMethodData: any): Promise<any> {
    return this._authenticatedRequest(`/api/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPaymentMethodData),
    });
  }

  async deleteCategory(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/category/${id}`, {
      method: "DELETE",
    });
  }

  async getCurrencies(): Promise<any> {
    return this._authenticatedRequest("/api/currency");
  }

  async createCurrency(categoryData: any): Promise<any> {
    return this._authenticatedRequest("/api/currency", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async getCurrencyById(id: string): Promise<Currency> {
    return this._authenticatedRequest(`/api/currency/${id}`);
  }

  async updateCurrency(id: string, updateCurrencyData: any): Promise<any> {
    return this._authenticatedRequest(`/api/currency/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateCurrencyData),
    });
  }

  async getOrders(): Promise<Order[]> {
    return this._authenticatedRequest("/api/order");
  }

  async createOrder(orderData: any): Promise<any> {
    return this._authenticatedRequest("/api/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrderById(id: string): Promise<Order> {
    return this._authenticatedRequest(`/api/order/${id}`);
  }

  async updateOrder(id: string, updateOrderData: any): Promise<any> {
    return this._authenticatedRequest(`/api/order/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateOrderData),
    });
  }

  async deleteOrder(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/order/${id}`, {
      method: "DELETE",
    });
  }

  async getAdById(id: string): Promise<any> {
    return this._authenticatedRequest(`/api/ad/${id}`);
  }


  async uploadImage(formData: FormData): Promise<any> {
    return await fetch("/uploads", {
      method: "POST",
      body: formData,
    });
  }
  private async _authenticatedRequest(url: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Access token is missing');
    }
    const headers = options.headers || {};
    const authenticatedOptions = {
      ...options,
      headers: {
        ...headers,
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      }
    };
    const response = await fetch(`${this.baseURL}${url}`, {
      ...authenticatedOptions,
    });
    if (response.status === 204) {
      return response.status;
    } else {
      return response.json();
    }
  }
}


const apiClient = new APIClient("http://localhost:5000")

export default apiClient