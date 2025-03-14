import axios from "axios";

const base_url = `${import.meta.env.VITE_API_BASE_URL}/api`;

const axiosClient = axios.create({
  baseURL: base_url,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
});

export default axiosClient;
