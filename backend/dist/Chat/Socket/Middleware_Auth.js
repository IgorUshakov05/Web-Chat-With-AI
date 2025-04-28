"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Middleware;
const jwt_1 = require("../../token/jwt");
const toket_type_1 = require("../../types/toket_type");
function Middleware(socket, next) {
    var _a;
    try {
        const token = getBearer((_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.Authorization);
        if (!token) {
            const err = new Error("Authentication error");
            err.data = { message: "Токен отсутствует или невалиден" };
            console.error("❌ Ошибка аутентификации:", err);
            return next(err);
        }
        const verify = (0, jwt_1.verify_jwt_token)(token, toket_type_1.TypeToken.ACCESS);
        if (!verify.success) {
            const err = new Error("Authentication error");
            err.data = { message: "Токен недействителен или истек" };
            console.error("❌ Ошибка проверки токена:", err);
            return next(err);
        }
        console.log("✅ Аутентификация успешна!");
        next();
    }
    catch (e) {
        console.error("❌ Ошибка Middleware:", e);
        const err = new Error("Server error");
        err.data = { message: "Ошибка сервера" };
        next(err);
    }
}
const getBearer = (header) => {
    if (!header || !header.startsWith("Bearer "))
        return undefined;
    return header.split("Bearer ")[1].trim();
};
