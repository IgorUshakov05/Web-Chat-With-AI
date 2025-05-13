import { Server } from "socket.io";
import SocketMessage from "../../types/socket_message";
import get_answer_ai from "../../database/Request/AI";
import Middleware from "./Middleware_Auth";
import { insert_message_to_chat_on_id } from "../../database/Request/Chat";

const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.use(Middleware);
  io.on("connection", (socket) => {
    console.log(`⚡ Новый пользователь подключился: ${socket.id}`);
    socket.on("joinRoom", ({ room }) => {
      socket.join(room);
      console.log(`Пользователь ${socket.id} вошёл в комнату ${room}`);
      socket.emit("message", {
        text: `Вы присоединились к комнате ${room}`,
        room,
        connection: true,
      });
    });

    socket.on("leaveRoom", ({ room }) => {
      socket.leave(room);
      socket.emit("message", {
        text: `Вы покинули комнату ${room}`,
        room,
        connection: true,
      });
    });

    socket.on("message", async (data: SocketMessage) => {
      let save_user_message = await insert_message_to_chat_on_id(
        data.room,
        "User",
        data.text,
        data.user_time
      );
      console.log(data);
      io.to(data.room).emit("message", {
        ...save_user_message,
        text: data.text,
        timestamp: Date.now(),
        from: "User",
        connect: false,
      });
      let messageAI = await get_answer_ai(data.text + "давай ответ в стиле markdown", data.room);
      if (!messageAI.success)
        return io.to(data.room).emit("message", {
          success: false,
          text: "Ошибка сервера",
          timestamp: Date.now(),
          from: "Bot",
          connect: false,
        });
      let save_ai_message = await insert_message_to_chat_on_id(
        data.room,
        "Bot",
        messageAI.message
      );
      console.log(messageAI, " ответ ии");
      io.to(data.room).emit("message", {
        ...save_ai_message,
        text: messageAI.message,
        timestamp: Date.now(),
        from: "Bot",
        connect: false,
      });
    });
    socket.on("leaveRoom", async ({ room }) => {
      socket.leave(room);
      console.log(`Пользователь ${socket.id} покинул комнату ${room}`);
      socket.emit("message", {
        text: `Вы покинули комнату ${room}`,
        room,
        connection: true,
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Пользователь ${socket.id} отключился`);
    });
  });

  return io;
};

export default initSocket;
