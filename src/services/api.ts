import axios from 'axios';
import { Product, Category, Ranking, Comparison, Article, Expert } from '../types';

export interface Lead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  website?: string;
  service?: string;
  message?: string;
  status: 'new' | 'contacted' | 'resolved';
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Products API
export const productApi = {
  getAll: async (params?: Record<string, any>): Promise<Product[]> => {
    const res = await apiClient.get('/products', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Product> => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Product>): Promise<Product> => {
    const res = await apiClient.post('/products', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const res = await apiClient.patch(`/products/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  }
};

// Categories API
export const categoryApi = {
  getAll: async (params?: Record<string, any>): Promise<Category[]> => {
    const res = await apiClient.get('/categories', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Category> => {
    const res = await apiClient.get(`/categories/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Category>): Promise<Category> => {
    const res = await apiClient.post('/categories', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const res = await apiClient.patch(`/categories/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  }
};

// Rankings API
export const rankingApi = {
  getAll: async (params?: Record<string, any>): Promise<Ranking[]> => {
    const res = await apiClient.get('/rankings', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Ranking> => {
    const res = await apiClient.get(`/rankings/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Ranking>): Promise<Ranking> => {
    const res = await apiClient.post('/rankings', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Ranking>): Promise<Ranking> => {
    const res = await apiClient.patch(`/rankings/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/rankings/${id}`);
  }
};

// Comparisons API
export const comparisonApi = {
  getAll: async (params?: Record<string, any>): Promise<Comparison[]> => {
    const res = await apiClient.get('/comparisons', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Comparison> => {
    const res = await apiClient.get(`/comparisons/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Comparison>): Promise<Comparison> => {
    const res = await apiClient.post('/comparisons', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Comparison>): Promise<Comparison> => {
    const res = await apiClient.patch(`/comparisons/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/comparisons/${id}`);
  }
};

// Articles API
export const articleApi = {
  getAll: async (params?: Record<string, any>): Promise<Article[]> => {
    const res = await apiClient.get('/articles', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Article> => {
    const res = await apiClient.get(`/articles/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Article>): Promise<Article> => {
    const res = await apiClient.post('/articles', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Article>): Promise<Article> => {
    const res = await apiClient.patch(`/articles/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/articles/${id}`);
  }
};

// Experts API
export const expertApi = {
  getAll: async (): Promise<Expert[]> => {
    const res = await apiClient.get('/experts');
    return res.data.data;
  },
  getById: async (id: string): Promise<Expert> => {
    const res = await apiClient.get(`/experts/${id}`);
    return res.data.data;
  },
  create: async (data: Partial<Expert>): Promise<Expert> => {
    const res = await apiClient.post('/experts', data);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Expert>): Promise<Expert> => {
    const res = await apiClient.patch(`/experts/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/experts/${id}`);
  }
};

// Leads / Subscribers API
export const leadApi = {
  create: async (data: {
    email: string;
    name?: string;
    phone?: string;
    website?: string;
    service?: string;
    message?: string;
    source?: string;
  }): Promise<Lead> => {
    const res = await apiClient.post('/leads', data);
    return res.data.data;
  },
  getAll: async (params?: Record<string, any>): Promise<Lead[]> => {
    const res = await apiClient.get('/leads', { params });
    return res.data.data;
  },
  getById: async (id: string): Promise<Lead> => {
    const res = await apiClient.get(`/leads/${id}`);
    return res.data.data;
  },
  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const res = await apiClient.patch(`/leads/${id}`, data);
    return res.data.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  }
};

// Stats & Reset
export const systemApi = {
  getStats: async () => {
    const res = await apiClient.get('/stats');
    return res.data.data;
  },
  seedData: async () => {
    const res = await apiClient.post('/seed');
    return res.data;
  }
};

// Upload API (Cloudinary)
export const uploadApi = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data.url || res.data.secure_url;
  },
  uploadMultipleImages: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    const res = await apiClient.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data.urls || [];
  },
  syncAllImages: async (): Promise<{ success: boolean; message: string; syncedCount: number; errors?: string[] }> => {
    const res = await apiClient.post('/upload/sync-all');
    return res.data;
  }
};
