import { AxiosResponse } from 'axios';
import { api } from '../utils/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageURL?: string;
}

export interface ProductResponse {
  message: string;
  data: Product;
  statusCode: number;
}

export interface ProductsResponse {
  message: string;
  data: Product[];
  statusCode: number;
}

class ProductService {
  private readonly baseUrl = '/products';

  public async getAllProducts(): Promise<Product[]> {
    const response: AxiosResponse<ProductsResponse> = await api.get(this.baseUrl);
    return response.data.data;
  }

  public async getProductById(id: number): Promise<Product> {
    const response: AxiosResponse<ProductResponse> = await api.get(`${this.baseUrl}/${id}`);
    return response.data.data;
  }
}

export const productService = new ProductService(); 