import { makeAutoObservable, action, runInAction, observable } from "mobx";
import { io, Socket } from "socket.io-client";
import Message, { Chat } from "../types/ChatMessages";

class ChatStore {
  messages: Message[] = [];
  chatID: string = localStorage.getItem("chat_id") || "";
  chatList: Chat[] = [];
  constructor() {
    makeAutoObservable(this, {
      setMessages: action,
      setChatID: action,
    });
  }
  setChatList(newChatList: Chat[]) {
    console.log(newChatList);
    this.chatList = newChatList;
  }
  setChatID(id: string) {
    this.chatID = id;
  }
  setOneMessage(new_message: Message) {
    runInAction(() => {
      this.messages = [...this.messages, new_message];
      console.log(this.messages);
    });
  }
  setMessages(new_messages: Message[]) {
    this.messages = new_messages;
  }
}

class AuthStore {
  isAuth: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(state: boolean = false) {
    this.isAuth = state;
  }
}

class SocketConnect {
  socket: Socket = io(process.env.REACT_APP_SERVER_URL, {
    transports: ["websocket"],
    auth: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });
  message: string = localStorage.getItem("message") || "";
  constructor() {
    makeAutoObservable(this);
  }
  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
      this.socket.on("connect", () => {
        console.log("✅ Socket подключён", this.socket.id);
      });
    } else {
      console.log("⚠️ Socket уже подключён");
    }
  }

  typing(user_message: string) {
    localStorage.setItem("message", user_message || "");
    this.message = user_message;
  }
  clearInput() {
    localStorage.removeItem("message");
    this.message = "";
  }
  sendMessage(room: string) {
    this.socket.emit("message", {
      text: this.message,
      room,
      date_time: Date.now(),
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("❌ Socket отключён");
    }
  }
}
type AuthFormFields = {
  name: string;
  surname: string;
  email: string;
  password: string;
  retry_password: string;
  birthday: string;
  code: string;
};

class AuthForm {
  fromData: AuthFormFields = {
    name: "Идиот",
    surname: "",
    email: "",
    password: "",
    retry_password: "",
    birthday: "",
    code: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  resetForm() {
    this.fromData = {
      name: "",
      surname: "",
      email: "",
      password: "",
      retry_password: "",
      birthday: "",
      code: "",
    };
  }

  setField<K extends keyof AuthFormFields>(field: K, value: AuthFormFields[K]) {
    this.fromData[field] = value;
    console.log(this.fromData[field])
  }

  getField<K extends keyof AuthFormFields>(field: K): AuthFormFields[K] {
    return this.fromData[field];
  }
}

const authForm = new AuthForm();
const socketStore = new SocketConnect();
const chatStore = new ChatStore();
const authStore = new AuthStore();

export { chatStore, authStore, socketStore, authForm };
