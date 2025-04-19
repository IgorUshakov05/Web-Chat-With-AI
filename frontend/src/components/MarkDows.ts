const markdownContent = `
# [Web Chat With AI](https://chat.webhunt.ru)

Чата с использованием искусственного интеллекта.

## Стек

**Клиент:** React, TypeScript, MobX, MobX-React, Axios, @heroicons/react, Tailwind CSS, Highlight.js, Rehype-highlight, Remark-gfm, @tanstack/react-query, ESLint

**Сервер:** Node.js, Express.js, Socket.IO, Cors, JsonWebToken (JWT), Morgan, UUID, Dotenv, Nodemon, Ts-node, TypeScript, Mongodb, Mongoose

## Запуск

### Клонирование проекта

\`\`\`bash
  git clone https://github.com/IgorUshakov05/Web-Chat-With-AI.git
\`\`\`

### Установка зависимостей и запуск сервера

\`\`\`bash
  cd Web-Chat-With-AI/backend && npm install && npm run dev
\`\`\`

### Установка зависимостей и запуск клиента

\`\`\`bash
  cd Web-Chat-With-AI/frontend && npm install && npm run dev
\`\`\`

## Настройка axios для отправки запросов с Bearer

\`\`\`typescript
import axios from "axios";

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
export default api;
\`\`\`

## Запросы на сервер 

#### Запрос на регистрацию
\`\`\`typescript
export const registration_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/registration", data_user);
\`\`\`

#### Запрос на аутентификацию (для защищенных маршрутов)
\`\`\`typescript
export const authentication = (): Promise<RaspondAuthentication> => {
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
};
\`\`\`

#### Запрос на вход
\`\`\`typescript
export const login_user = async (data_user: InputData) =>
  axios.post<ResponseAuth>("/auth/login", data_user);
\`\`\`

#### Кастомный хук с использованием [tanstack/react-query](https://tanstack.com/query/latest)

\`\`\`typescript
export const useAuthRegistration = (data: InputData) => {
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
};
\`\`\`

#### Мемоизация редуктора ввода логина и пароля

\`\`\`typescript
let [dataForm, dispatch] = useReducer(reducer, { mail: "", password: "" });
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
  );
\`\`\`

## Маршруты в приложении 
|Метод| Эндпоинт |  Описание|Авторизация|
|--|--|-- |--|
| GET | \`/chat\` |Получение всех чатов | Bearer Token|
| POST|\`/auth/registration\`  | Регистрация пользователя|Без токена |
| POST | \`/auth/login\` |Вход пользователя |Без токена |
| GET |  \`/auth/verify-user\`|Верификация токена | Bearer Token|
| GET | \`/chat/new_chat\` |Создание нового чата |Bearer Token |
| GET| \`/chat/{chat_id}\` |Получение сообщений из чата |Bearer Token |

## 📡 WebSocket API (Socket.IO)

### Подключение к серверу

\`\`\`typescript
const socket = io("http://localhost:3000", {
  withCredentials: true,
});
\`\`\`

Сервер слушает подключения по адресу \`http://localhost:3000\` с поддержкой CORS для запросов с фронтенда.

----------

### 📲 События WebSocket

#### Подключение к серверу

-   **Событие:** \`connection\`
-   **Описание:** Срабатывает при подключении нового пользователя.
-   **Ответ сервера:** Лог в консоли с ID пользователя.

Пример:

\`\`\`
⚡ Новый пользователь подключился: socket.id
\`\`\`

----------

#### Вход в комнату

-   **Событие:** \`joinRoom\`
-   **Описание:** Позволяет пользователю войти в комнату.
-   **Параметры:**
    -   \`room\` (string) — ID комнаты.
-   **Ответ сервера:** Сообщение о входе в комнату.

Пример отправки события:

\`\`\`typescript
socket.emit("joinRoom", { room: "chat123" });
\`\`\`

Ответ:

\`\`\`json
{
  "text": "Вы присоединились к комнате chat123",
  "room": "chat123",
  "connection": true
}
\`\`\`

----------

#### Выход из комнаты

-   **Событие:** \`leaveRoom\`
-   **Описание:** Позволяет пользователю покинуть комнату.
-   **Параметры:**
    -   \`room\` (string) — ID комнаты.
-   **Ответ сервера:** Сообщение о выходе из комнаты.

Пример отправки события:

\`\`\`typescript
socket.emit("leaveRoom", { room: "chat123" });
\`\`\`

Ответ:

\`\`\`json
{
  "text": "Вы покинули комнату chat123",
  "room": "chat123",
  "connection": true
}
\`\`\`

----------

#### Отправка сообщения
-   **Событие:** \`message\`
-   **Описание:** Отправка сообщения в чат. Сообщение сохраняется в базе данных, а также отправляется всем участникам комнаты.
-   **Параметры:**
    -   \`room\` (string) — ID комнаты.
    -   \`text\` (string) — Текст сообщения.
    -   \`user_time\` (string) — Время отправки сообщения.

Пример отправки сообщения:

\`\`\`typescript
socket.emit("message", {
  room: "chat123",
  text: "Привет, чат!",
  user_time: new Date().toISOString(),
});
\`\`\`

Ответ сервера для пользователя:

\`\`\`json
{
  "text": "Привет, чат!",
  "timestamp": 1700000000000,
  "from": "User",
  "connect": false
}
\`\`\`

Ответ от AI:

\`\`\`json
{
  "text": "Привет! Как я могу помочь?",
  "timestamp": 1700000000500,
  "from": "Bot",
  "connect": false
}
\`\`\`

Если возникла ошибка при обработке ответа AI:

\`\`\`json
{
  "text": "Произошла ошибка, попробуйте позже.",
  "timestamp": 1700000000500,
  "from": "Bot",
  "connect": false
}
\`\`\`

----------
#### Отключение пользователя

-   **Событие:** \`disconnect\`
-   **Описание:** Срабатывает при отключении пользователя от сервера.
-   **Ответ сервера:** Лог в консоли.

Пример:

\`\`\`
❌ Пользователь socket.id отключился
\`\`\`

----------

### 🛠️ Пример использования на клиенте

\`\`\`typescript
import { io } from "socket.io-client";

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
});
\`\`\`

## Middleware для аутентификации

Middleware проверяет JWT токен перед установкой соединения.

### Проверка токена

\`\`\`typescript
import type { Socket } from "socket.io";
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
};
\`\`\`

### События WebSocket

-   \`joinRoom\`: Присоединение к комнате
-   \`leaveRoom\`: Выход из комнаты
-   \`message\`: Отправка сообщения
-   \`disconnect\`: Отключение пользователя


## Функциональные Возможности Web-Chat-With-AI

- Интерфейс Реального Времени
- Поддержка Markdown 
- Управление Состоянием с MobX
- Отзывчивый Дизайн с Tailwind CSS 
- Интеграция с AI
- Аутентификация Пользователей
- Навигация на Основе Маршрутов
- Получение Данных с Axios и React Query 


## Автор: Ушаков Игорь

- [TenChat](https://tenchat.ru/FullStack)
- [GitHub](https://github.com/IgorUshakov05)


`;

export default markdownContent;
