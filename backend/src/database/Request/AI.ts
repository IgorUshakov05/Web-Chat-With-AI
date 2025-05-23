import { find_chat_by_id } from "./Chat";
import { setGlobalDispatcher, Agent } from "undici";

setGlobalDispatcher(new Agent({ keepAliveTimeout: 120000 }));

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Обязательно задайте ключ

type OpenRouterContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string | OpenRouterContent[];
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

export default async function get_answer_ai(
  request: string,
  chatID: string,
  imageUrl?: string
): Promise<{ success: boolean; message: string; error?: string | unknown }> {
  try {
    let messages: OpenRouterMessage[] = [];
    const { success, chat } = await find_chat_by_id(chatID);

    if (success && chat && "message" in chat && Array.isArray(chat.message)) {
      chat.message.forEach((item: any) => {
        messages.push({
          role: item.sender === "User" ? "user" : "assistant",
          content: item.text || "",
        });
      });
    }
    const markdownText = `${request}, Пожалуйста, отвечайте только в формате Markdown. И не говори что его используешь`;

    const userMessage: OpenRouterMessage = {
      role: "user",
      content: imageUrl
        ? [
            { type: "text", text: request },
            { type: "image_url", image_url: { url: imageUrl } },
          ]
        : markdownText,
    };

    messages.push(userMessage);

    const requestBody: OpenRouterRequest = {
      model: imageUrl
        ? "google/gemini-2.5-pro-exp-03-25"
        : "nousresearch/deephermes-3-mistral-24b-preview:free",
      messages,
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: OpenRouterResponse = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        errorData.error?.message ||
          `API request failed with status ${response.status}`
      );
    }

    const responseData: OpenRouterResponse = await response.json();
    const responseText =
      responseData.choices?.[0]?.message?.content || "No response text found";

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
  text: string,
  imageUrl?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const markdownText = `${text}, Пожалуйста, отвечайте только в формате Markdown. И не говори что его используешь`;

    const userMessage: OpenRouterMessage = {
      role: "user",
      content: imageUrl
        ? [
            { type: "text", text },
            { type: "image_url", image_url: { url: imageUrl } },
          ]
        : markdownText,
    };

    const requestBody: OpenRouterRequest = {
      model: imageUrl
        ? "google/gemini-2.5-pro-exp-03-25"
        : "nousresearch/deephermes-3-mistral-24b-preview:free",
      messages: [userMessage],
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: OpenRouterResponse = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        errorData.error?.message ||
          `API request failed with status ${response.status}`
      );
    }

    const responseData: OpenRouterResponse = await response.json();
    const responseText =
      responseData.choices?.[0]?.message?.content || "No response text found";

    return { success: true, message: responseText };
  } catch (e) {
    console.error("Error:", e);
    return { success: false, message: "Ошибка сервера!" };
  }
}
