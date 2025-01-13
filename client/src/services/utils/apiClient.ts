import { config } from "@/configs";
import axios from "axios";

const unsplashApi = axios.create({
  baseURL: config.UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${config.ACCESS_KEY}`,
  },
});

export { unsplashApi };
