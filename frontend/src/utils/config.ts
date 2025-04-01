export const API_BASE_URL = 'https://signature-production-3663.up.railway.app/api';

export const ENDPOINTS = {
  GENERATE_SIGNATURE: `${API_BASE_URL}/signature/generate`,
  CHECK_STATUS: (id: string) => `${API_BASE_URL}/signature/status/${id}`,
};

// Dark Theme Color Scheme
export const ThemeColors = {
  // Backgrounds
  background: '#121212',
  surface: '#1E1E1E',
  card: '#252525',
  modalBackground: 'rgba(0, 0, 0, 0.75)',
  
  // Text
  primaryText: '#FFFFFF',
  secondaryText: '#B3B3B3',
  disabledText: '#666666',
  
  // Accents and UI Elements
  primary: '#4A6EE0',
  secondary: '#805AD5',
  accent: '#7467EF',
  error: '#CF6679',
  success: '#4CAF50',
  border: '#333333',
  divider: '#2C2C2C',
  
  // Input Elements
  input: '#2C2C2C',
  inputText: '#FFFFFF',
  inputPlaceholder: '#888888',
  
  // Buttons
  buttonDisabled: '#444444',
}; 