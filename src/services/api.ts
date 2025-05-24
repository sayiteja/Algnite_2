import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  validateToken: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updatePreferences: async (preferences: {
    theme?: 'light' | 'dark' | 'system';
    fontSize?: number;
    highContrast?: boolean;
    screenReader?: boolean;
  }) => {
    const response = await api.patch('/user/preferences', preferences);
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await api.patch('/user/profile', data);
    return response.data;
  },
};

export const accessibilityApi = {
  scanWebsite: async (url: string) => {
    const response = await api.post('/accessibility/scan', { url });
    return response.data;
  },

  generateImageDescription: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/accessibility/image-description', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  generateVideoCaptions: async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);
    const response = await api.post('/accessibility/video-captions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api; 