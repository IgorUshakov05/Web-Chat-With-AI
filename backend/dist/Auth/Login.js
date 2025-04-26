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
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const User_1 = require("../database/Request/User");
const jwt_1 = require("../token/jwt");
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Некорректный email").normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6, max: 30 })
        .withMessage("Пароль должен быть не менее 8, не более 30 символов"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res
                .status(400)
                .json({ success: false, errorList: errors.array() });
        const { email, password } = req.body;
        const save_user = yield (0, User_1.find_user)({ email, password });
        if (!save_user.success)
            return res.status(404).json(Object.assign({}, save_user));
        let token = (0, jwt_1.create_jwt_token)({
            email: save_user.email || "",
            id: save_user.id || "",
        });
        console.log(Object.assign(Object.assign({ success: true }, token), { id_chat: save_user.id_chat, name: save_user.name, surname: save_user.surname }));
        return res.status(201).json(Object.assign(Object.assign({ success: true }, token), { id_chat: save_user.id_chat, name: save_user.name, surname: save_user.surname }));
    }
    catch (e) {
        console.error("Ошибка при регистрации в файле Registration.ts", e);
        return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
}));
exports.default = router;
