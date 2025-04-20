import { TokenInfo, TypeToken } from "./../types/toket_type";
import jwt from "jsonwebtoken";
import { create_jwt, token } from "../types/create_jwt";
export const create_jwt_token = ({ email, id }: create_jwt): token => {
  const access = jwt.sign({ email, id }, process.env.ACCESS_SECRET || "", {
    algorithm: "HS256",
    expiresIn: 3600*24*30,
  });

  const refresh = jwt.sign({ email, id }, process.env.REFRESH_SECRET || "", {
    algorithm: "HS256",
    expiresIn: 3600*24*30*2,
  });
  return { access, refresh };
};
export const verify_jwt_token = (
  token: string | undefined,
  type: TypeToken
): { success: boolean; info?: TokenInfo; message: string } => {
  try {
    if (!token) return { success: false, message: "Токена нет!" };
    if (type === TypeToken.ACCESS) {
      return {
        success: true,
        info: jwt.verify(token, process.env.ACCESS_SECRET!) as TokenInfo,
        message: "Успех!",
      };
    } else if (type === TypeToken.REFRESH) {
      return {
        success: true,
        info: jwt.verify(token, process.env.REFRESH_SECRET!) as TokenInfo,
        message: "Успех!",
      };
    } else {
      return { success: false, message: "Тип токена не определен" };
    }
  } catch (error) {
    return { success: false, message: "Токен не валидный" };
  }
};
