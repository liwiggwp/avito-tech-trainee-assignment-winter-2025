import axios from 'axios';

const httpService = () => {
  const http = {
    get: async (url) => {
      try {
        const response = await axios.get(`http://localhost:5000${url}`);
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };

  return { http };
};

export default httpService;