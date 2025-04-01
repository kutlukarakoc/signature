export const API_BASE_URL = 'http://localhost:8080/api';

export const ENDPOINTS = {
  GENERATE_SIGNATURE: `${API_BASE_URL}/signature/generate`,
  CHECK_STATUS: (id: string) => `${API_BASE_URL}/signature/status/${id}`,
}; 