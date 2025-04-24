import Message, { Response, NewChat } from "../types/ChatMessages";
import axios from "./base";
export const get_messages_on_chat = async (chatID: string) => {
  try {
    let { data } = await axios.get<{
      success: boolean;
      chat: {
        id: string;
        message: Message[];
      };
      message: string;
    }>(`/chat/${chatID}`);
    console.log(data, " current Chat");
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { success: false, chat: { message: [] }, message: "Успех!" };
    }
    throw error;
  }
};

export const get_all_chats = async (): Promise<Response> => {
  let { data } = await axios.get<Response>("/chat");
  if (!data.success) throw Error("Ошибка");
  return { success: data.success, chats: data.chats, message: "Ошибка" };
};
export const open_new_chat = async () => {
  let { data } = await axios.get<NewChat>("/chat/new_chat");
  return data;
};
