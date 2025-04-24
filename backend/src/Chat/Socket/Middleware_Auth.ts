import { verify_jwt_token } from "../../token/jwt";
import { TypeToken } from "../../types/toket_type";

export default function   Middleware(socket: any, next: (err?: Error) => void) {
  try {
    const token = getBearer(socket.handshake.auth?.Authorization);

    if (!token) {
      const err = new Error("Authentication error");
      (err as any).data = { message: "Токен отсутствует или невалиден" };
      console.error("❌ Ошибка аутентификации:", err);
      return next(err);
    }

    const verify = verify_jwt_token(token, TypeToken.ACCESS);
    if (!verify.success) {
      const err = new Error("Authentication error");
      (err as any).data = { message: "Токен недействителен или истек" };
      console.error("❌ Ошибка проверки токена:", err);
      return next(err);
    }

    console.log("✅ Аутентификация успешна!");
    next();
  } catch (e) {
    console.error("❌ Ошибка Middleware:", e);
    const err = new Error("Server error");
    (err as any).data = { message: "Ошибка сервера" };
    next(err);
  }
}

const getBearer = (header?: string): string | undefined => {
  if (!header || !header.startsWith("Bearer ")) return undefined;
  return header.split("Bearer ")[1].trim();
};
