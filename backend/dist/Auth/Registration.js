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
router.post("/registration", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Некорректный email").normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6, max: 30 })
        .withMessage("Пароль должен быть не менее 6 и не более 30 символов"),
    (0, express_validator_1.body)("retry_password")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Пароли не совпадают"),
    (0, express_validator_1.body)("name")
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage("Имя обязательно для заполнения"),
    (0, express_validator_1.body)("surname")
        .trim()
        .isLength({ min: 2, max: 40 })
        .withMessage("Фамилия обязательна для заполнения"),
    (0, express_validator_1.body)("day")
        .isInt({ min: 1, max: 31 })
        .withMessage("Неверный день рождения"),
    (0, express_validator_1.body)("month")
        .isInt({ min: 1, max: 12 })
        .withMessage("Неверный месяц рождения"),
    (0, express_validator_1.body)("year")
        .isInt({ min: 1900, max: new Date().getFullYear() - 5 })
        .withMessage("Неверный год рождения"),
    (0, express_validator_1.body)("code")
        .isLength({ min: 4, max: 8 })
        .withMessage("Код подтверждения должен быть от 4 до 8 символов")
        .optional({ nullable: true }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        console.log(req.body);
        if (!errors.isEmpty())
            return res
                .status(400)
                .json({ success: false, errorList: errors.array() });
        const { email, password, day, month, code, name, surname, year, } = req.body;
        const save_user = yield (0, User_1.create_user)({
            email,
            password,
            code,
            day,
            month,
            name,
            surname,
            year,
        });
        if (!save_user.success)
            return res.status(409).json(Object.assign({}, save_user));
        let token = (0, jwt_1.create_jwt_token)({
            email: save_user.email || "",
            id: save_user.id || "",
        });
        return res
            .status(201)
            .json(Object.assign(Object.assign({ success: true }, token), { id_chat: save_user.id_chat, name,
            surname }));
    }
    catch (e) {
        console.error("Ошибка при регистрации в файле Registration.ts", e);
        return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
}));
exports.default = router;
