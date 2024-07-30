import axios from "axios";

export const appAxios = axios.create({
  baseURL: `${
    import.meta.env.VITE_APP_API_URL
  }/test`,
  headers: {
    "Content-type": "application/json",
  },
});
