import { makeAutoObservable, action } from "mobx";
import { io, Socket } from "socket.io-client";
import Message, { From, Chat } from "../types/ChatMessages";

class ChatStore {
  messages: Message[] = [
    { text: "lorem100a wdihoawdawd", sender: From.User },
    {
      text: `
  # Добро пожаловать в Markdown!

  ## Основные элементы

  - **Жирный текст**: \`**текст**\`
  - *Курсив*: \`*текст*\`
  - ~~Зачеркнутый~~: \`~~текст~~\`

  ## Списки

  # Маркированный список
  ## Маркированный список
  ### Маркированный список
  #### Маркированный список
  ##### Маркированный список
  ###### Маркированный список

  ### Нумерованный список
  1. Первый элемент
  2. Второй элемент
  3. Третий элемент

  ### Маркированный список
  - Пункт 1
  - Пункт 2
    - Вложенный пункт
    - Еще один вложенный пункт

  ## Код

  ### Однострочный код
  Используйте \`console.log('Hello, world!');\`.

  ### Многострочный код
  \`\`\`javascript
  function greet(name) {
    return \`Привет, \${name}!\`;
  }

  console.log(greet('Игорь'));
  \`\`\`

  ## Ссылки и изображения

  - Ссылка: [Посетите Google](https://google.com)
  - Изображение:

    ![Логотип React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

  ## Таблицы

  | Имя       | Возраст | Город       |
  |-----------|---------|-------------|
  | Иван      | 25      | Москва      |
  | Ольга     | 22      | Санкт-Петербург |
  | Александр | 30      | Казань      |

  ## Цитаты

  > Это пример цитаты.

  > **Цитаты можно вложить:**
  > > Вложенная цитата.

  ## Горизонтальная линия

  ---

  Вот и всё! 😊
  `,
      sender: From.Bot,
    },
  ];
  chatID: string = localStorage.getItem("chat_id") || "";
  chatList: Chat[] = [];
  constructor() {
    makeAutoObservable(this, {
      setMessages: action,
      setChatID: action,
    });
  }
  setChatList(newChatList: Chat[]) {
    this.chatList = newChatList;
  }
  setChatID(id: string) {
    this.chatID = id;
  }
  setOneMessage(new_message: Message) {
    console.log(new_message);
    this.messages = [new_message];
  }
  setMessages(new_messages: Message[]) {
    console.log(new_messages);
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
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  message: string = localStorage.getItem("message") || "";
  constructor() {
    makeAutoObservable(this);
  }
  connect() {
    if (!this.socket) {
      console.log("✅ Socket подключён", this.socket);
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
  sendMessage() {
    this.socket.emit("message", this.message);
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("❌ Socket отключён");
    }
  }
}
const socketStore = new SocketConnect();
const chatStore = new ChatStore();
const authStore = new AuthStore();

export { chatStore, authStore, socketStore };
