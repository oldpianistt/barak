import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Enable cookies for authentication
});

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

api.interceptors.request.use(
  (config) => {
    if (!USE_MOCK_DATA) {
      console.log('🌐 API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (!USE_MOCK_DATA) {
      console.log('✅ API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      // This is expected when backend is not running - app will use mock data
      if (!USE_MOCK_DATA) {
        console.log('ℹ️ Backend not available - using mock data fallback');
        console.log('💡 To connect to backend, ensure Spring Boot is running at:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081');
      }
    } else if (error.response) {
      console.error('⚠️ API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    }
    return Promise.reject(error);
  }
);

export default api;