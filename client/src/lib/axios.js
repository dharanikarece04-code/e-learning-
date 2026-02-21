import axios from 'axios';

// The base URL relies on Vite environment variables, defaulting to local FastAPI port
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to inject JWT Auth Token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('elearning_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for handling global errors (e.g., 401 Unauthorized -> redirect to login)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('elearning_token');
            // If we're not already on the login page, redirect
            if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);
