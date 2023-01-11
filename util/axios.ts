import axios from "axios";
import { useLecturerStore } from "@/stores/lecturer";

export default (withAuth = false) => {
  const lecturerStore = useLecturerStore();

  const options: any = {
    baseURL: "http://127.0.0.1:5000",
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
