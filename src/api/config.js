// API configuration
const API_CONFIG = {
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` || 'https://doc-system-backend-nsm.netlify.app/api',
  apiKey: process.env.NEXT_PUBLIC_BACKEND_API_KEY || '',
  headers: {
    'Accept': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY || '',
    'Origin': '*'
  },
  // Default Content-Type is application/json, but will be overridden for FormData
  defaultContentType: 'application/json'
};

export default API_CONFIG;