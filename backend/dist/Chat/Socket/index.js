"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const AI_1 = __importDefault(require("../../database/Request/AI"));
const Middleware_Auth_1 = __importDefault(require("./Middleware_Auth"));
const Chat_1 = require("../../database/Request/Chat");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.use(Middleware_Auth_1.default);
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
        socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            let save_user_message = yield (0, Chat_1.insert_message_to_chat_on_id)(data.room, "User", data.text, data.user_time);
            console.log(data);
            io.to(data.room).emit("message", Object.assign(Object.assign({}, save_user_message), { text: data.text, timestamp: Date.now(), from: "User", connect: false }));
            let messageAI = yield (0, AI_1.default)(data.text, data.room);
            if (!messageAI.success)
                return io.to(data.room).emit("message", {
                    success: false,
                    text: "Ошибка сервера",
                    timestamp: Date.now(),
                    from: "Bot",
                    connect: false,
                });
            let save_ai_message = yield (0, Chat_1.insert_message_to_chat_on_id)(data.room, "Bot", messageAI.message);
            console.log(messageAI, " ответ ии");
            io.to(data.room).emit("message", Object.assign(Object.assign({}, save_ai_message), { text: messageAI.message, timestamp: Date.now(), from: "Bot", connect: false }));
        }));
        socket.on("leaveRoom", (_a) => __awaiter(void 0, [_a], void 0, function* ({ room }) {
            socket.leave(room);
            console.log(`Пользователь ${socket.id} покинул комнату ${room}`);
            socket.emit("message", {
                text: `Вы покинули комнату ${room}`,
                room,
                connection: true,
            });
        }));
        socket.on("disconnect", () => {
            console.log(`❌ Пользователь ${socket.id} отключился`);
        });
    });
    return io;
};
exports.default = initSocket;
