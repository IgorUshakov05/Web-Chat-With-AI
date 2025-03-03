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
exports.default = get_answer_ai;
const { GoogleGenerativeAI } = require("@google/generative-ai");
function get_answer_ai(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Запрос отправлен");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = request + ", using the markdown response and respond in the user's language";
            const result = yield model.generateContent(prompt);
            console.log(result.response.text());
            return { success: true, message: result.response.text() };
        }
        catch (e) {
            return { success: false, message: "Ошибка сервера!" };
        }
    });
}
