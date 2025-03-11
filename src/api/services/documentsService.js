import axios from 'axios';
import API_CONFIG from '../config';
import ENDPOINTS from '../endpoints';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
});

// Add request interceptor to set appropriate headers
api.interceptors.request.use(config => {
  // For FormData, let the browser set the Content-Type with boundary
  if (config.data instanceof FormData) {
    // Remove Content-Type so browser can set it with proper boundary
    delete config.headers['Content-Type'];
  } else {
    // For JSON data, set the Content-Type explicitly
    config.headers['Content-Type'] = API_CONFIG.defaultContentType;
  }

  // Ensure API key is included
  config.headers['x-api-key'] = API_CONFIG.apiKey;

  return config;
});

const documentsService = {
  getAllDocuments: async (page, limit) => {
    try {
      const response = await api.get(ENDPOINTS.documents.getAll(page, limit));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllDocumentsByFilter: async (name, description, date, page, limit) => {
    try {
      const response = await api.get(ENDPOINTS.documents.getAllByFilters(name, description, date, page, limit));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(ENDPOINTS.documents.getById(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDocument: async (documentData) => {
    try {
      const response = await api.post(ENDPOINTS.documents.create, documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createChildDocument: async (documentData) => {
    try {
      const response = await api.post(ENDPOINTS.documents.createChild, documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createFileDocument: async (documentData) => {
    try {
      const response = await api.post(ENDPOINTS.documents.createFile, documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadFile: async (formData, onProgressUpdate) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/files/upload`,
        formData,
        {
          headers: {
            // Let browser set Content-Type with proper boundary
            'x-api-key': API_CONFIG.apiKey,
          },
          onUploadProgress: (progressEvent) => {
            if (onProgressUpdate && progressEvent.total) {
              // Calculate percentage
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgressUpdate(percentCompleted);
            }
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDocument: async (id, documentData) => {
    try {
      const response = await api.put(ENDPOINTS.documents.update(id), documentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDocument: async (id) => {
    try {
      const response = await api.delete(ENDPOINTS.documents.delete(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAllDocuments: async (id) => {
    try {
      const response = await api.delete(ENDPOINTS.documents.deleteAll(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default documentsService;