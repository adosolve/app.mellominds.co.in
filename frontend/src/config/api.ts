// API Configuration
// This file centralizes the API URL configuration for the entire application

const getApiUrl = (): string => {
  // Check if we're in production (Vercel deployment)
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Use the same domain as the frontend for API calls
    return `${window.location.protocol}//${window.location.hostname}`;
  }
  
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:3000';
};

export const API_URL = getApiUrl();

export default API_URL;
