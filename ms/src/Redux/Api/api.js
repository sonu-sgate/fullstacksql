import axios from "axios";
export const api="http://localhost:4000"

const request = axios.create({
    baseURL: 'http://your-backend-api-url',
    withCredentials: true, // This allows sending cookies with requests
  });