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
const Chat_1 = require("./Chat");
const undici_1 = require("undici");
(0, undici_1.setGlobalDispatcher)(new undici_1.Agent({ keepAliveTimeout: 60000 }));
globalThis.fetch = undici_1.fetch;
const generative_ai_1 = require("@google/generative-ai");
function get_answer_ai(request, chatID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                tools: [
                    {
                        codeExecution: {},
                    },
                ],
            });
            const chatSession = model.startChat({ history: [] });
            // Получаем историю чата
            let history = yield chatSession.getHistory();
            console.log(history[history.length - 1]);
            // Загружаем сообщения из базы данных для текущего чата
            let { success, chat } = yield (0, Chat_1.find_chat_by_id)(chatID);
            if (success && chat) {
                if (chat && "message" in chat && Array.isArray(chat.message)) {
                    chat.message.forEach((item) => {
                        history.push({
                            role: item.sender === "User" ? "user" : "model",
                            parts: [{ text: item.text || "" }],
                        });
                    });
                }
            }
            const prompt = request +
                ", using the markdown response and respond in the user's language";
            // Отправляем сообщение
            const result = yield chatSession.sendMessage(prompt);
            // Извлекаем и возвращаем текст ответа
            const responseText = result.response.text();
            console.log(responseText);
            return { success: true, message: responseText };
        }
        catch (e) {
            console.error("Error:", e);
            return { success: false, message: "Ошибка сервера!" };
        }
    });
}
