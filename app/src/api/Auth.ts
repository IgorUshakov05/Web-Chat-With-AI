import User from "../types/FormType";
import { InputData, PostVerefy } from "../types/InputForm";
import {
  RaspondAuthentication,
  RespondVerefyPost,
  ResponseAuth,
} from "../types/RequestServer";
import axios from "./base";
export const registration_user = async (
  data_user: User
): Promise<ResponseAuth> => {
  try {
    const { data } = await axios.post<ResponseAuth>(
      "/auth/registration",
      data_user
    );
    return {
      success: data.success,
      access: data.access,
      refresh: data.refresh,
      id_chat: data.id_chat,
      name: data.name,
      surname: data.surname,
      error: data.error,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error
        ? error.response?.data?.error
        : error.response?.data?.errorList[0].msg ||
          "Ошибка при отправке запроса",
    };
  }
};
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
export const signin_google = async (tokens: {
  access_token: string;
}): Promise<ResponseAuth> => {
  try {
    const { data } = await axios.post<ResponseAuth>(
      "/auth/google/sign_in",
      tokens
    );

    return {
      success: data.success,
      access: data.access,
      refresh: data.refresh,
      id_chat: data.id_chat,
      name: data.name,
      surname: data.surname,
      error: data.error,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error
        ? error.response?.data?.error
        : error.response?.data?.errorList[0].msg ||
          "Ошибка при отправке запроса",
    };
  }
};

export const verefy_post = async (verefy_data: PostVerefy) =>
  axios.post<RespondVerefyPost>("/code/verefy-post", verefy_data);

export const sendCode = async (verefy_data: { email: string }) =>
  axios.post<RespondVerefyPost>("/code/send-code", verefy_data);

export const login_user = async (
  data_user: InputData
): Promise<ResponseAuth> => {
  try {
    const { data } = await axios.post<ResponseAuth>("/auth/login", data_user);
    return {
      success: data.success,
      access: data.access,
      refresh: data.refresh,
      id_chat: data.id_chat,
      name: data.name,
      surname: data.surname,
      error: data.error,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error
        ? error.response?.data?.error
        : error.response?.data?.errorList[0].msg ||
          "Ошибка при отправке запроса",
    };
  }
};
