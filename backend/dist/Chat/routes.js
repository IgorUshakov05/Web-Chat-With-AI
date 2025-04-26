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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Chat_1 = require("../database/Request/Chat");
const express_validator_1 = require("express-validator");
const jwt_1 = require("../token/jwt");
const toket_type_1 = require("../types/toket_type");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let access = yield ((_a = get_bearer(req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.trim());
        if (!access)
            return res.status(403).json({ success: false, message: "Нет токена" });
        let info_token = yield (0, jwt_1.verify_jwt_token)(access, toket_type_1.TypeToken.ACCESS);
        if (!info_token.success)
            return res.status(403).json(info_token);
        let get_chat = yield (0, Chat_1.find_all_chat_of_user)((_b = info_token.info) === null || _b === void 0 ? void 0 : _b.id);
        res.status(201).json(get_chat);
    }
    catch (e) {
        return res.status(500).json({ success: false, message: "Ошибка сервера!" });
    }
}));
router.get("/new_chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let access = yield ((_a = get_bearer(req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.trim());
        if (!access)
            return res.status(403).json({ success: false, message: "Нет токена" });
        let info_token = yield (0, jwt_1.verify_jwt_token)(access, toket_type_1.TypeToken.ACCESS);
        if (!info_token.success)
            return res.status(403).json(info_token);
        let new_chat_url = yield (0, Chat_1.create_chat)((_b = info_token.info) === null || _b === void 0 ? void 0 : _b.id);
        if (!new_chat_url.success)
            return res.status(401).json(new_chat_url);
        return res.status(201).json(new_chat_url);
    }
    catch (e) {
        res.status(501).json({ success: false, message: "Ошибка сервера" });
    }
}));
router.post("/:id", [
    // Валидация параметра id из URL
    (0, express_validator_1.check)("id").isUUID().withMessage("ID должен быть в формате UUID"),
    // Валидация поля message из тела запроса
    (0, express_validator_1.body)("message").notEmpty().withMessage("Поле message не может быть пустым"),
    (0, express_validator_1.body)("message").isString().withMessage("Поле message должно быть строкой"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { id } = req.params;
        console.log(req.params.id);
        const { message } = req.body;
        let insert_message = yield (0, Chat_1.insert_message_to_chat_on_id)(id, "User", message);
        if (!insert_message.success)
            return res.status(500).json(insert_message);
        res.status(201).json({ success: false, message, from: "User" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, error: "Произошла ошибка на сервере" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let chat_id = req.params.id;
        if (!chat_id)
            return res.status(404).json({ success: false, message: "Чат не найден" });
        let access = yield ((_a = get_bearer(req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.trim());
        if (!access)
            return res.status(403).json({ success: false, message: "Нет токена" });
        let info_token = yield (0, jwt_1.verify_jwt_token)(access, toket_type_1.TypeToken.ACCESS);
        if (!info_token.success)
            return res.status(403).json(info_token);
        let response = yield (0, Chat_1.delete_chat)(chat_id);
        if (!response.success)
            return res
                .status(404)
                .json({ success: false, message: response.message });
        return res.status(201).json(response);
    }
    catch (e) {
        console.log(e);
        return { success: false, message: "Ошибка сервера" };
    }
}));
exports.default = router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        if (!id)
            return res
                .status(404)
                .json({ success: false, message: "Чат не найден" });
        let chat = yield (0, Chat_1.find_chat_by_id)(id);
        if (!chat.success)
            return res.status(404).json(chat);
        return res.status(201).json(chat);
    }
    catch (e) {
        console.log(e);
        return res
            .status(404)
            .json({ success: false, message: "Не удалось найти чат" });
    }
}));
const get_bearer = (header) => {
    try {
        return header === null || header === void 0 ? void 0 : header.split("Bearer")[1];
    }
    catch (e) {
        return undefined;
    }
};
