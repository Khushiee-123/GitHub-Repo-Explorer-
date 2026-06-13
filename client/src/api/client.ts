import axios from 'axios';
import { ApiError } from '../types/github.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const data = error.response?.data as
        | { error?: { code?: string; message?: string } }
        | undefined;

      const code = data?.error?.code ?? (status === 0 ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR');
      const message =
        data?.error?.message ?? error.message ?? 'An unexpected error occurred';

      throw new ApiError(code, message, status);
    }
    throw new ApiError('UNKNOWN_ERROR', 'An unexpected error occurred', 0);
  }
);

export default apiClient;
