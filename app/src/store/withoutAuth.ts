import { makeAutoObservable } from "mobx";
import { Message } from "../types/WithoutAuth";

class ChatStore {
  isWait: boolean = false;
  messages: Message[] = [];
  message: string = localStorage.getItem("message") || "";
  constructor() {
    makeAutoObservable(this);
  }
  setIsWait(state: boolean) {
    this.isWait = state;
  }
  inputMessage(message: string) {
    this.message = message;
    localStorage.setItem("message", message);
  }
  clear() {
    this.message = "";
    localStorage.removeItem("message");
  }
  setOneMessage(new_message: Message) {
    this.messages = [...this.messages, new_message];
  }
}

const chatStoreWithoutAuth = new ChatStore();

export { chatStoreWithoutAuth };
