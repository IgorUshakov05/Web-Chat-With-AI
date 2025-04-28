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
exports.codeToPost = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const codeToPost = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, code, }) {
    try {
        yield transporter.sendMail({
            from: `"Подтверждение" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Ваш код подтверждения",
            text: `Ваш код подтверждения: ${code}`,
            html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
        });
        return { status: true, message: "Код отправлен" };
    }
    catch (e) {
        console.log(e);
        return { status: false, message: "Ошибка сервера" };
    }
});
exports.codeToPost = codeToPost;
