// src/services/api.ts

import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/category/${category}`);
  return response.data;
};

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

// Add new product (mocked)
export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post<Product>('/products', product);
  return response.data;
};

// Update product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};