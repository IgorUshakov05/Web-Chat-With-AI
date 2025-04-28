"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_jwt_token = exports.create_jwt_token = void 0;
const toket_type_1 = require("./../types/toket_type");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create_jwt_token = ({ email, id }) => {
    const access = jsonwebtoken_1.default.sign({ email, id }, process.env.ACCESS_SECRET || "", {
        algorithm: "HS256",
        expiresIn: 3600 * 24 * 30,
    });
    const refresh = jsonwebtoken_1.default.sign({ email, id }, process.env.REFRESH_SECRET || "", {
        algorithm: "HS256",
        expiresIn: 3600 * 24 * 30 * 2,
    });
    return { access, refresh };
};
exports.create_jwt_token = create_jwt_token;
const verify_jwt_token = (token, type) => {
    try {
        if (!token)
            return { success: false, message: "Токена нет!" };
        if (type === toket_type_1.TypeToken.ACCESS) {
            return {
                success: true,
                info: jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET),
                message: "Успех!",
            };
        }
        else if (type === toket_type_1.TypeToken.REFRESH) {
            return {
                success: true,
                info: jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET),
                message: "Успех!",
            };
        }
        else {
            return { success: false, message: "Тип токена не определен" };
        }
    }
    catch (error) {
        return { success: false, message: "Токен не валидный" };
    }
};
exports.verify_jwt_token = verify_jwt_token;
