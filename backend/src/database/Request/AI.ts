import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Content } from "@google/generative-ai";
import { find_chat_by_id } from "./Chat";

// Функция для получения ответа от AI
export default async function get_answer_ai(
  request: string,
  chatID: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Инициализируем новую сессию чата для каждого запроса
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chatSession = model.startChat({ history: [] });

    // Получаем историю чата
    let history: Content[] = await chatSession.getHistory();
    console.log(history[history.length - 1]);

    // Загружаем сообщения из базы данных для текущего чата
    let { success, chat } = await find_chat_by_id(chatID);
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

    const prompt =
      request +
      ", using the markdown response and respond in the user's language";

    // Отправляем сообщение
    const result = await chatSession.sendMessage(prompt);

    // Извлекаем и возвращаем текст ответа
    const responseText = result.response.text();
    console.log(responseText);

    return { success: true, message: responseText };
  } catch (e) {
    console.error("Error:", e);
    return { success: false, message: "Ошибка сервера!" };
  }
}
