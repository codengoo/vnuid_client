import axios from "axios";

export const fetcher = axios.create({
  baseURL: "http://localhost:1234",
  withCredentials: true,
});
