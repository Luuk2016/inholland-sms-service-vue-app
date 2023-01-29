import axios from "axios";
import { useLecturerStore } from "@/stores/lecturer";

export default (url: string, withAuth = false) => {
  const lecturerStore = useLecturerStore();

  const options: any = {
    baseURL: url,
    headers: {
      Authorization: withAuth ? lecturerStore.token : "",
    },
  };

  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
