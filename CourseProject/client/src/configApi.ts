const API_URL = {
  baseURL: 'http://localhost:3000',

  url(path: string) {
    return this.baseURL + path;
  },

  endpoints: {
    tasks: {
      base: '/task',
      byId: (id: string) => `/task/${id}`,
    },
  },
};

export default API_URL;
