import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://api.shrtco.de/v2/shorten",
});
