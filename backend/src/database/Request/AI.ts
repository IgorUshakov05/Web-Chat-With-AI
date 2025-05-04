import type { Content } from "@google/generative-ai";
import { find_chat_by_id } from "./Chat";
import { setGlobalDispatcher, Agent, fetch } from "undici";
setGlobalDispatcher(new Agent({ keepAliveTimeout: 60000 }));
globalThis.fetch = fetch as any;
import { GoogleGenerativeAI } from "@google/generative-ai";
export default async function get_answer_ai(
  request: string,
  chatID: string
): Promise<{ success: boolean; message: string }> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      tools: [
        {
          codeExecution: {},
        },
      ],
    });

    const chatSession = model.startChat({ history: [] });
    let history: Content[] = await chatSession.getHistory();
    console.log(history[history.length - 1]);

    let { success, chat } = await find_chat_by_id(chatID);
    if (success && chat) {
      if (chat && "message" in chat && Array.isArray(chat.message)) {
        chat.message.forEach((item: any) => {
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

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    console.log(responseText);

    return { success: true, message: responseText };
  } catch (e) {
    console.error("Error:", e);
    return { success: false, message: "Ошибка сервера!" };
  }
}

export async function get_answer_ai_without_auth(
  text: string
): Promise<{ success: boolean; message: string }> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      tools: [
        {
          codeExecution: {},
        },
      ],
    });

    const chatSession = model.startChat({ history: [] });
    const result = await chatSession.sendMessage(text);
    const responseText = result.response.text();
    console.log(responseText);

    return { success: true, message: responseText };
  } catch (e) {
    console.error("Error:", e);
    return { success: false, message: "Ошибка сервера!" };
  }
}
