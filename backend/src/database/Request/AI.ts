import { find_chat_by_id } from "./Chat";
import { setGlobalDispatcher, Agent } from "undici";

setGlobalDispatcher(new Agent({ keepAliveTimeout: 120000 }));

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GeminiContent {
    role?: string;
    parts: { text: string }[];
}

interface GeminiRequest {
    contents: GeminiContent[];
    tools?: {
        codeExecution: {};
    }[];
}

interface GeminiResponse {
    candidates?: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
    error?: {
        code: number;
        message: string;
        status: string;
    };
}

export default async function get_answer_ai(
    request: string,
    chatID: string
): Promise<{ success: boolean; message: string; error?: string | unknown }> {
    try {
        // Получаем историю чата
        let history: GeminiContent[] = [];
        const { success, chat } = await find_chat_by_id(chatID);
        
        if (success && chat && "message" in chat && Array.isArray(chat.message)) {
            chat.message.forEach((item: any) => {
                history.push({
                    role: item.sender === "User" ? "user" : "model",
                    parts: [{ text: item.text || "" }],
                });
            });
        }

        // Формируем промпт
        const prompt = request + ", using the markdown response and respond in the user's language";
        
        // Добавляем текущий запрос в историю
        history.push({
            role: "user",
            parts: [{ text: prompt }],
        });

        // Формируем тело запроса
        const requestBody: GeminiRequest = {
            contents: history,
            tools: [{ codeExecution: {} }],
        };

        // Отправляем запрос к Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData: GeminiResponse = await response.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const responseData: GeminiResponse = await response.json();
        const responseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found";

        console.log("Gemini Response:", responseText);
        return { success: true, message: responseText };
    } catch (e) {
        console.error("Error:", e);
        return {
            success: false,
            message: "Ошибка сервера!",
            error: e instanceof Error ? e.message : String(e),
        };
    }
}

export async function get_answer_ai_without_auth(
    text: string
): Promise<{ success: boolean; message: string }> {
    try {
        const requestBody: GeminiRequest = {
            contents: [{
                role: "user",
                parts: [{ text }],
            }],
            tools: [{ codeExecution: {} }],
        };

        const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData: GeminiResponse = await response.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const responseData: GeminiResponse = await response.json();
        const responseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found";

        console.log("Gemini Response:", responseText);
        return { success: true, message: responseText };
    } catch (e) {
        console.error("Error:", e);
        return { success: false, message: "Ошибка сервера!" };
    }
}