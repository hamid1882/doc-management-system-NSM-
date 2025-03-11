// API endpoints
const ENDPOINTS = {
  documents: {
    getAll: (page, limit) => {
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);

      const queryString = params.toString();
      return `/documents${queryString ? `?${queryString}` : ''}`;
    },
    getById: (id) => `/documents/${id}`,
    getAllByFilters: (name, description, date, page = '', limit = '') => {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (description) params.append('description', description);
      if (date) params.append('date', date);
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);

      const queryString = params.toString();
      return `/documents/filter${queryString ? `?${queryString}` : ''}`;
    },
    create: '/documents',
    createChild: '/documents/child',
    createFile: '/documents/upload',
    update: (id) => `/documents/${id}`,
    delete: (id) => `/documents/${id}`,
    deleteAll: '/documents/all'
  },
  files: {
    upload: '/files/upload'
  }
};

export default ENDPOINTS;