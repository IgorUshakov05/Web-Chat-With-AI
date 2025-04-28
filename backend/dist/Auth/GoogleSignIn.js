"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const User_1 = require("../database/Request/User");
const jwt_1 = require("../token/jwt");
const router = (0, express_1.Router)();
router.post("/google/sign_in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { access_token } = req.body;
    try {
        const response = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userData = response.data;
        console.log("User info:", userData);
        const save_user = yield (0, User_1.find_user_without_password)(userData.email);
        if (!save_user.success)
            return res.status(404).json(Object.assign({}, save_user));
        let token = (0, jwt_1.create_jwt_token)({
            email: save_user.email || "",
            id: save_user.id || "",
        });
        console.log(Object.assign(Object.assign({ success: true }, token), { id_chat: save_user.id_chat, name: save_user.name, surname: save_user.surname }));
        return res.status(201).json(Object.assign(Object.assign({ success: true }, token), { id_chat: save_user.id_chat, name: save_user.name, surname: save_user.surname }));
    }
    catch (err) {
        console.error("Ошибка при валидации токена: ");
        return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
}));
exports.default = router;
