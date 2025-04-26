export default interface Message {
  sender: "User" | "Bot";
  text: string;
  timestamp: number;
}

export enum From {
  Bot = "Bot",
  User = "User",
}

export interface Chat {
  id: string;
  message: Message;
}

export interface ChatListItemMessage {
  id: string;
  lastMessage: Message;
}

export interface Response {
  success: boolean;
  message: string;
  chats: ChatListItemMessage[];
}

export interface NewChat {
  success: boolean;
  chat_id: string;
}

export interface SocketMessage {
  text: string;
  error: string;
  connection: boolean;
  success: boolean;
  room: string;
  from: "User" | "Bot";
  timestamp: number;
}


export interface MesssageWithoutAuth {
  success: boolean;
  message: string;
}
