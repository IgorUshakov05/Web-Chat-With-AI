import { Response, From, NewChat } from "../types/ChatMessages";
import axios from "./base";
export const get_messages_on_chat = async (chatID: string) => {
  try {
    let { data, status } = await axios.get<{
      success: boolean;
      chat: {
        message: [
          { _id: string; timestamp: number; sender: From; text: string }
        ];
      };
    }>(`/chat/${chatID}`);

    return { success: data.success, messages: data.chat?.message, status };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { success: false, messages: [], status: 404 };
    }
    throw error;
  }
};

export const get_all_chats = async () => {
  let { data } = await axios.get<Response>("/chat");
  if (!data.success) throw Error("Ошибка");
  return { success: data.success, chats: data.chats };
};
export const open_new_chat = async () => {
  let { data } = await axios.get<NewChat>("/chat/new_chat");
  return data;
};
