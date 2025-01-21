import axios from "axios";

const customApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1', // Ambil URL dari environment
});

export default customApi;
