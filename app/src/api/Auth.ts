import { InputData, PostVerefy } from "../types/InputForm";
import {
  RaspondAuthentication,
  RespondVerefyPost,
  ResponseAuth,
} from "../types/RequestServer";
import axios from "./base";
export const registration_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/registration", data_user);

export const authentication = (): Promise<RaspondAuthentication> => {
  const token = localStorage.getItem("access");

  if (!token) {
    return Promise.reject({
      success: false,
      message: "Токена нет",
    } as RaspondAuthentication);
  }

  return new Promise<RaspondAuthentication>((resolve, reject) => {
    axios
      .get<RaspondAuthentication>("/auth/verify-user")
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.error("Ошибка при проверке токена:", error);
        reject({
          success: false,
          message: "Ошибка при проверке токена",
        } as RaspondAuthentication);
      });
  });
};

export const verefy_post = async (verefy_data: PostVerefy) =>
  axios.post<RespondVerefyPost>("/code/verefy-post", verefy_data);

export const sendCode = async (verefy_data: { email: string }) =>
  axios.post<RespondVerefyPost>("/code/send-code", verefy_data);

export const login_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/login", data_user);
