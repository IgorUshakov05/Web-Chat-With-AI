import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/default.css";
import "tailwindcss/tailwind.css";
import Footer from "../component/Footer";
import DocumentationArticle from "../component/UX/Documentation";
import YandexAd from "../component/UX/AdsBlock";

hljs.registerLanguage("javascript", javascript);

const Documentation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      updateStyles();
      toggleBackToTopButton();
    };

    const updateStyles = () => {
      const listItems = document.querySelectorAll(".stek-list li");
      const originalFontSize = 20;
      const targetFontSize = 50;
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;

      listItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(itemCenterY - centerY);
        const maxDistance = 100;
        const isAtCenter = distanceFromCenter <= maxDistance;

        if (isAtCenter) {
          const scaleFactor = 1 - distanceFromCenter / maxDistance;
          const newFontSize =
            originalFontSize +
            (targetFontSize - originalFontSize) * scaleFactor;
          (item as HTMLElement).style.fontSize = `${newFontSize}px`;
          (item as HTMLElement).style.color = "#232DFC";
        } else {
          (item as HTMLElement).style.fontSize = `${originalFontSize}px`;
          (item as HTMLElement).style.color = "#A7ABFE";
        }
      });
    };

    const toggleBackToTopButton = () => {
      const backToTopButton = document.querySelector(".back-to-top");
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.add("visible");
        } else {
          backToTopButton.classList.remove("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateStyles();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const codeSnippets = {
    axiosSetup: `import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: \`Bearer \${token}\`,
    };
  }
  return config;
});
export default api;`,

    registration: `export const registration_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/registration", data_user);`,

    authentication: `export const authentication = (): Promise<RaspondAuthentication> => {
  const token = localStorage.getItem("access");

  if (!token) {
    return Promise.reject({
      success: false,
      message: "Токена нет",
    } as RaspondAuthentication);
  }

  return new Promise<RaspondAuthentication>((resolve, reject) => {
    axios
      .get<RaspondAuthentication>("/auth/verify-user")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при проверке токена:", error);
        reject({
          success: false,
          message: "Ошибка при проверке токена",
        } as RaspondAuthentication);
      });
  });
};`,

    login: `export const login_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/login", data_user);`,

    authHook: `export const useAuthRegistration = (data: InputData) => {
  const navigator = useNavigate();
  return useMutation(() => registration_user(data), {
    onError: (error: any) => {
      console.log("Ошибка:", error.response?.data.save_user.error);
    },
    onSuccess: (data) => {
      localStorage.setItem("access", data.data.access || "");
      localStorage.setItem("refresh", data.data.refresh || "");
      localStorage.setItem("chat_id", data.data.id_chat || "");
      navigator(\`/chat/\${data.data.id_chat}\`);
    },
  });
};`,

    memoizedReducer: `let [dataForm, dispatch] = useReducer(reducer, { mail: "", password: "" });
function reducer(state: InputData, action: ActionType) {
  console.log(state);
  switch (action.type) {
    case InputType.LOGIN:
      return { ...state, mail: action.payload };
    case InputType.PASSWORD:
      return { ...state, password: action.payload };
    default:
      return { ...state };
  }
}
const handleLoginChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: InputType.LOGIN });
  },
  []
);
const loginProps = useMemo(
  () => ({
    current_value: dataForm.mail,
    handler_input: handleLoginChange,
    text: "Логин",
  }),
  [dataForm.mail, handleLoginChange]
);

const handlePasswordChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: InputType.PASSWORD });
  },
  []
);
const passwordProps = useMemo(
  () => ({
    current_value: dataForm.password,
    handler_input: handlePasswordChange,
    text: "Пароль",
  }),
  [dataForm.password, handlePasswordChange]
);`,

    socketConnection: `const socket = io("http://localhost:3000", {
  withCredentials: true,
});`,

    socketConnectionExample: `⚡ Новый пользователь подключился: socket.id`,

    joinRoom: `socket.emit("joinRoom", { room: "chat123" });`,

    joinRoomResponse: `{
  "text": "Вы присоединились к комнате chat123",
  "room": "chat123",
  "connection": true
}`,

    leaveRoom: `socket.emit("leaveRoom", { room: "chat123" });`,

    leaveRoomResponse: `{
  "text": "Вы покинули комнату chat123",
  "room": "chat123",
  "connection": true
}`,

    message: `socket.emit("message", {
  room: "chat123",
  text: "Привет, чат!",
  user_time: new Date().toISOString(),
});`,

    messageUserResponse: `{
  "text": "Привет, чат!",
  "timestamp": 1700000000000,
  "from": "User",
  "connect": false
}`,

    messageAIResponse: `{
  "text": "Привет! Как я могу помочь?",
  "timestamp": 1700000000500,
  "from": "Bot",
  "connect": false
}`,

    messageError: `{
  "success": false,
  "text": "Ошибка сервера",
  "timestamp": 1700000001000,
  "from": "Bot",
  "connect": false
}`,

    disconnect: `❌ Пользователь socket.id отключился`,

    socketClientExample: `import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Подключено к серверу");
  socket.emit("joinRoom", { room: "chat123" });

  socket.on("message", (msg) => {
    console.log("Новое сообщение:", msg);
  });

  socket.emit("message", {
    room: "chat123",
    text: "Привет, чат!",
    user_time: new Date().toISOString(),
  });
});

socket.on("disconnect", () => {
  console.log("Отключено от сервера");
});`,

    middleware: `import type { Socket } from "socket.io";
import { verify_jwt_token } from "../../token/jwt";
import { TypeToken } from "../../types/toket_type";

export default function Middleware(
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    const token = getBearer(socket.handshake.auth?.Authorization);
    
    if (!token) {
      const err = new Error("Authentication error");
      (err as any).data = { message: "Токен отсутствует или невалиден" };
      console.error("❌ Ошибка аутентификации:", err);
      return next(err);
    }

    const verify = verify_jwt_token(token, TypeToken.ACCESS);
    if (!verify.success) {
      const err = new Error("Authentication error");
      (err as any).data = { message: "Токен недействителен или истек" };
      console.error("❌ Ошибка проверки токена:", err);
      return next(err);
    }

    console.log("✅ Аутентификация успешна!");
    next();
  } catch (e) {
    console.error("❌ Ошибка Middleware:", e);
    const err = new Error("Server error");
    (err as any).data = { message: "Ошибка сервера" };
    next(err);
  }
}

const getBearer = (header?: string): string | undefined => {
  if (!header || !header.startsWith("Bearer ")) return undefined;
  return header.split("Bearer ")[1].trim();
};`,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <DocumentationArticle />
      <div className="gemini-container">
        <img src="gemini.svg" className="gemini-image" alt="gemini Image" />
      </div>
      <div>
        <div className="stek">
          <p className="text-stek">Клиент</p>
          <p className="text-stek">Сервер</p>
        </div>
        <div className="stek-div">
          <ul className="stek-list">
            <li>React</li>
            <li>ESLint</li>
            <li>react-query</li>
            <li>Remark-gfm</li>
            <li>Highlight</li>
            <li>Tailwind CSS</li>
            <li>@heroicons/react</li>
            <li>Axios</li>
            <li>@tanstack</li>
            <li>TypeScript</li>
            <li>MobX</li>
            <li>MobX-React</li>
          </ul>
          <ul className="stek-list">
            <li>Express.js</li>
            <li>Morgan</li>
            <li>Mongoose</li>
            <li>UUID</li>
            <li>Dotenv</li>
            <li>Cors</li>
            <li>Dotenv</li>
            <li>MongoDB</li>
            <li>Socket.IO</li>
            <li>Mongoose</li>
            <li>Ts-node</li>
            <li>JsonWebToken</li>
            <li>Node.js</li>
          </ul>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>Запуск</p>
        </div>
        <div className="content-blocks">
          <div className="block">
            <p className="text">Клонирование проекта</p>
            <p className="code">
              git clone https://github.com/IgorUshakov05/Web-Chat-With-AI.git
            </p>
          </div>
          <div className="block">
            <p className="text">Установка зависимостей и запуск сервера</p>
            <p className="code">
              cd Web-Chat-With-AI/backend && npm install && npm run dev
            </p>
          </div>
          <div className="block">
            <p className="text">Установка зависимостей и запуск клиента</p>
            <p className="code">
              cd Web-Chat-With-AI/frontend && npm install && npm run dev
            </p>
          </div>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>Настройка axios для отправки запросов с Bearer</p>
        </div>
        <div className="content-blocks">
          <div className="block">
            <pre>
              <code className="javascript">{codeSnippets.axiosSetup}</code>
            </pre>
          </div>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>Запросы на сервер</p>
        </div>
        <div className="content-blocks">
          <div className="block">
            <p className="text">Запрос на регистрацию</p>
            <pre>
              <code className="javascript">{codeSnippets.registration}</code>
            </pre>
          </div>
          <div className="block">
            <p className="text">
              Запрос на аутентификацию (для защищенных маршрутов)
            </p>
            <pre>
              <code className="javascript">{codeSnippets.authentication}</code>
            </pre>
          </div>
          <div className="block">
            <p className="text">Запрос на вход</p>
            <pre>
              <code className="javascript">{codeSnippets.login}</code>
            </pre>
          </div>
          <div className="block">
            <p className="text">
              Кастомный хук с использованием{" "}
              <a href="https://tanstack.com/query/latest">
                tanstack/react-query
              </a>
            </p>
            <pre>
              <code className="javascript">{codeSnippets.authHook}</code>
            </pre>
          </div>
          <div className="block">
            <p className="text">Мемоизация редуктора ввода логина и пароля</p>
            <pre>
              <code className="javascript">{codeSnippets.memoizedReducer}</code>
            </pre>
          </div>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>Маршруты в приложении</p>
        </div>
        <div className="content-blocks">
          <table className="route-table">
            <thead>
              <tr>
                <th>Метод</th>
                <th>Эндпоинт</th>
                <th>Описание</th>
                <th>Авторизация</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET</td>
                <td>/chat</td>
                <td>Получение всех чатов</td>
                <td>Bearer Token</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/registration</td>
                <td>Регистрация пользователя</td>
                <td>Без токена</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td>Вход пользователя</td>
                <td>Без токена</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/auth/verify-user</td>
                <td>Верификация токена</td>
                <td>Bearer Token</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/chat/new_chat</td>
                <td>Создание нового чата</td>
                <td>Bearer Token</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>
                  /chat/{"{"}chat_id{"}"}
                </td>
                <td>Получение сообщений из чата</td>
                <td>Bearer Token</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>WebSocket API (Socket.IO)</p>
        </div>
        <div className="content-blocks">
          <div className="block">
            <p className="text">Подключение к серверу</p>
            <pre>
              <code className="javascript">
                {codeSnippets.socketConnection}
              </code>
            </pre>
            <p className="text">
              Сервер слушает подключения по адресу{" "}
              <code className="inline-code">http://localhost:3000</code> с
              поддержкой CORS для запросов с фронтенда.
            </p>
          </div>
          <hr className="separator" />
          <div className="block">
            <p className="text">События WebSocket</p>
            <p className="sub-title">Подключение к серверу</p>
            <ul className="description-list">
              <li>
                <strong>Событие:</strong>{" "}
                <code className="inline-code">connection</code>
              </li>
              <li>
                <strong>Описание:</strong> Срабатывает при подключении нового
                пользователя.
              </li>
              <li>
                <strong>Ответ сервера:</strong> Лог в консоли с ID пользователя.
              </li>
            </ul>
            <p className="text">Пример:</p>
            <pre>
              <code className="javascript">
                {codeSnippets.socketConnectionExample}
              </code>
            </pre>
          </div>
          <div className="block">
            <p className="sub-title">Вход в комнату</p>
            <ul className="description-list">
              <li>
                <strong>Событие:</strong>{" "}
                <code className="inline-code">joinRoom</code>
              </li>
              <li>
                <strong>Описание:</strong> Позволяет пользователю войти в
                комнату.
              </li>
              <li>
                <strong>Параметры:</strong>
                <ul>
                  <li>
                    <code className="inline-code">room</code> (string) — ID
                    комнаты.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ответ сервера:</strong> Сообщение о входе в комнату.
              </li>
            </ul>
            <p className="text">Пример отправки события:</p>
            <pre>
              <code className="javascript">{codeSnippets.joinRoom}</code>
            </pre>
            <p className="text">Ответ:</p>
            <pre>
              <code className="javascript">
                {codeSnippets.joinRoomResponse}
              </code>
            </pre>
          </div>
          <div className="block">
            <p className="sub-title">Выход из комнаты</p>
            <ul className="description-list">
              <li>
                <strong>Событие:</strong>{" "}
                <code className="inline-code">leaveRoom</code>
              </li>
              <li>
                <strong>Описание:</strong> Позволяет пользователю покинуть
                комнату.
              </li>
              <li>
                <strong>Параметры:</strong>
                <ul>
                  <li>
                    <code className="inline-code">room</code> (string) — ID
                    комнаты.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ответ сервера:</strong> Сообщение о выходе из комнаты.
              </li>
            </ul>
            <p className="text">Пример отправки события:</p>
            <pre>
              <code className="javascript">{codeSnippets.leaveRoom}</code>
            </pre>
            <p className="text">Ответ:</p>
            <pre>
              <code className="javascript">
                {codeSnippets.leaveRoomResponse}
              </code>
            </pre>
          </div>
          <div className="block">
            <p className="sub-title">Отправка сообщения</p>
            <ul className="description-list">
              <li>
                <strong>Событие:</strong>{" "}
                <code className="inline-code">message</code>
              </li>
              <li>
                <strong>Описание:</strong> Отправка сообщения в чат. Сообщение
                сохраняется в базе данных, а также отправляется всем участникам
                комнаты.
              </li>
              <li>
                <strong>Параметры:</strong>
                <ul>
                  <li>
                    <code className="inline-code">room</code> (string) — ID
                    комнаты.
                  </li>
                  <li>
                    <code className="inline-code">text</code> (string) — Текст
                    сообщения.
                  </li>
                  <li>
                    <code className="inline-code">user_time</code> (string) —
                    Время отправки сообщения.
                  </li>
                </ul>
              </li>
            </ul>
            <p className="text">Пример отправки сообщения:</p>
            <pre>
              <code className="javascript">{codeSnippets.message}</code>
            </pre>
            <p className="text">Ответ сервера для пользователя:</p>
            <pre>
              <code className="javascript">
                {codeSnippets.messageUserResponse}
              </code>
            </pre>
            <p className="text">Ответ от AI:</p>
            <pre>
              <code className="javascript">
                {codeSnippets.messageAIResponse}
              </code>
            </pre>
            <p className="text">
              Если возникла ошибка при обработке ответа AI:
            </p>
            <pre>
              <code className="javascript">{codeSnippets.messageError}</code>
            </pre>
          </div>
          <div className="block">
            <p className="sub-title">Отключение пользователя</p>
            <ul className="description-list">
              <li>
                <strong>Событие:</strong>{" "}
                <code className="inline-code">disconnect</code>
              </li>
              <li>
                <strong>Описание:</strong> Срабатывает при отключении
                пользователя от сервера.
              </li>
              <li>
                <strong>Ответ сервера:</strong> Лог в консоли.
              </li>
            </ul>
            <p className="text">Пример:</p>
            <pre>
              <code className="javascript">{codeSnippets.disconnect}</code>
            </pre>
          </div>
          <div className="block">
            <p className="sub-title">Пример использования на клиенте</p>
            <pre>
              <code className="javascript">
                {codeSnippets.socketClientExample}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="stek-row">
        <div className="title">
          <p>Middleware для аутентификации</p>
        </div>
        <div className="content-blocks">
          <div className="block">
            <p className="text">
              Middleware проверяет JWT токен перед установкой соединения.
            </p>
          </div>
          <div className="block">
            <p className="text">Проверка токена</p>
            <pre>
              <code className="javascript">{codeSnippets.middleware}</code>
            </pre>
          </div>
          <div className="block">
            <p className="text">События WebSocket</p>
            <ul className="description-list">
              <li>
                <code className="inline-code">joinRoom</code>: Присоединение к
                комнате
              </li>
              <li>
                <code className="inline-code">leaveRoom</code>: Выход из комнаты
              </li>
              <li>
                <code className="inline-code">message</code>: Отправка сообщения
              </li>
              <li>
                <code className="inline-code">disconnect</code>: Отключение
                пользователя
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        className="back-to-top fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full opacity-0 transition-opacity duration-300"
        onClick={handleBackToTop}
      >
        ↑
      </button>
      <YandexAd blockID="R-A-15263232-2" />

      <Footer />
    </div>
  );
};

export default Documentation;
