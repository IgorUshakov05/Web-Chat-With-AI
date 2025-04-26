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
const router = require("express").Router();
const Code_1 = require("../database/Request/Code");
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendCode_1 = require("./sendCode");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
router.post("/send-code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email обязателен." });
    }
    const code = generateCode();
    try {
        let sendCode = yield (0, Code_1.SetCode)({ email, code });
        if (!sendCode.status)
            return res.status(401).json(sendCode);
        let mailSend = yield (0, sendCode_1.codeToPost)({ email, code });
        if (!mailSend.status)
            return res.status(401).json(mailSend);
        return res.status(200).json(mailSend);
    }
    catch (error) {
        console.error("Ошибка при отправке письма:", error);
        res
            .status(500)
            .json({ status: false, message: "Не удалось отправить код" });
    }
}));
router.post("/verefy-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).json({ message: "Email и Код обязательны" });
    }
    try {
        let verefy = yield (0, Code_1.VerefyPost)({ email, code });
        if (!verefy.status)
            return res.status(401).json(verefy);
        res.status(200).json({ status: true, message: "Почта подтверждена" });
    }
    catch (error) {
        console.error("Ошибка при подтверждении:", error);
        res
            .status(500)
            .json({ status: false, message: "Не удалось подтвердить почту" });
    }
}));
exports.default = router;
