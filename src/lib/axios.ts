import Axios from "axios";

export type ValidationError<T = Record<string, Array<string>>> = {
  message: string;
  errors: T;
};

const axios = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

const isAxiosError = Axios.isAxiosError;

export default axios;
export { isAxiosError };
