export default interface Message {
  sender: "User" | "Bot";
  text: string;
  timestamp: number;
  success?: boolean;
}

export enum From {
  Bot = "Bot",
  User = "User",
}


export interface Chat {
  id: string;
  message: Message[];
}

export interface Response {
  success: boolean;
  message?: string;
  chats?: Chat[];
}

export interface NewChat extends Response {
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
