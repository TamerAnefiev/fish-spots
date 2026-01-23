import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { baseUrl } from "@/util/constants";

interface RetryQueueItem {
  resolve: () => void;
  reject: (error: AxiosError) => void;
}

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const processQueue = (error: AxiosError | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise<AxiosResponse>((resolve, reject) => {
        axios
          .post(
            `${baseUrl}/profile/token/refresh/`,
            {},
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            },
          )
          .then(() => {
            processQueue(null);
            resolve(api(originalRequest));
          })
          .catch((refreshError: AxiosError) => {
            processQueue(refreshError);
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
