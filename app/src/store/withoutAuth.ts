import { makeAutoObservable } from "mobx";
import { Message } from "../types/WithoutAuth";

class ChatStore {
  messages: Message[] = [
    { sender: "Bot", message: "Привет, чем могу помочь?" },
    { sender: "User", message: "Привет, чем могу помочь?" },
    { sender: "Bot", message: "Привет, чем могу помочь?" },
  ];
  message: string = localStorage.getItem("message") || "";
  constructor() {
    makeAutoObservable(this);
  }
  inputMessage(message: string) {
    this.message = message;
    localStorage.setItem("message", message);
  }
  setOneMessage(new_message: Message) {
    this.messages = [...this.messages, new_message];
  }
}

const chatStoreWithoutAuth = new ChatStore();

export { chatStoreWithoutAuth };
