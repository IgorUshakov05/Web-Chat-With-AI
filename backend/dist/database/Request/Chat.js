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
exports.insert_message_to_chat_on_id = exports.create_chat = exports.find_all_chat_of_user = exports.delete_chat = exports.find_chat_by_id = void 0;
const ChatSchema_1 = __importDefault(require("../Schema/ChatSchema"));
const UserSchema_1 = __importDefault(require("../Schema/UserSchema"));
const find_chat_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Применяем правильную типизацию для найденного чата
        let chat = yield ChatSchema_1.default.findOne({ id }).select("message");
        if (!chat)
            return { success: false, message: "Чат не найден", chat: [] };
        return { success: true, chat, message: "Успех!" };
    }
    catch (e) {
        return { success: false, message: "Не удалось найти чат", chat: [] };
    }
});
exports.find_chat_by_id = find_chat_by_id;
const delete_chat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [chat, user] = yield Promise.all([
            ChatSchema_1.default.findOne({ id }),
            UserSchema_1.default.findOne({ "chatList.id": id }),
        ]);
        if (!chat) {
            return { success: false, message: "Чат не найден" };
        }
        if (!user) {
            return { success: false, message: "Пользователь не найден" };
        }
        yield Promise.all([
            UserSchema_1.default.updateOne({ "chatList.id": id }, { $pull: { chatList: { id } } }),
            ChatSchema_1.default.deleteOne({ id }),
        ]);
        return { success: true, message: "Чат успешно удален", id };
    }
    catch (error) {
        console.error("Ошибка при удалении чата:", error);
        return { success: false, message: "Ошибка сервера" };
    }
});
exports.delete_chat = delete_chat;
const find_all_chat_of_user = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userID)
            return { success: false, message: "ID не указан" };
        let chats = yield UserSchema_1.default.findOne({ id: userID });
        if (!chats)
            return { success: false, message: "Пользователь не найден!" };
        if (!(chats === null || chats === void 0 ? void 0 : chats.chatList.length))
            return { success: false, message: "Чатов нет!", chats: [] };
        let chatList = chats.chatList.map((chat) => chat.id);
        let get_chat = yield ChatSchema_1.default.aggregate([
            { $match: { id: { $in: chatList } } },
            {
                $project: {
                    id: 1,
                    lastMessage: { $arrayElemAt: ["$message", -1] },
                },
            },
        ]);
        return { success: true, chats: get_chat, message: "Успех!" };
    }
    catch (e) {
        return { success: false, message: "Не удалось найти чат", chats: [] };
    }
});
exports.find_all_chat_of_user = find_all_chat_of_user;
const create_chat = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find_user = yield UserSchema_1.default.findOne({ id: userID });
        if (!find_user)
            return { success: false, message: "Пользователь не существует" };
        let chat_ids = find_user.chatList.map((chat) => chat.id);
        let empty_chats = yield ChatSchema_1.default.find({
            id: { $in: chat_ids },
            message: { $size: 0 },
        });
        if (empty_chats.length > 0) {
            let empty_chat_ids = empty_chats.map((chat) => chat.id);
            console.log("Удаляем пустые чаты:", empty_chat_ids);
            yield ChatSchema_1.default.deleteMany({ id: { $in: empty_chat_ids } });
            find_user.chatList = find_user.chatList.filter((chat) => !empty_chat_ids.includes(chat.id));
            yield find_user.save();
        }
        let new_chat = yield ChatSchema_1.default.create({});
        yield find_user.chatList.push({ id: new_chat.id });
        yield find_user.save();
        return {
            success: true,
            chat_id: new_chat.id,
        };
    }
    catch (e) {
        return { success: false, message: "Ошибка сервера" };
    }
});
exports.create_chat = create_chat;
const insert_message_to_chat_on_id = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (id = "", isBot = "Bot", message, user_time) {
    try {
        let chat = yield ChatSchema_1.default.findOne({ id });
        if (!chat) {
            return { success: false, message: "Чат не найден" };
        }
        chat.message.push({ sender: isBot, text: message, timestamp: user_time });
        yield chat.save();
        return { success: true, message: "Сообщение успешно добавлено" };
    }
    catch (error) {
        console.error("Ошибка при добавлении сообщения:", error);
        return {
            success: false,
            message: "Произошла ошибка при добавлении сообщения",
        };
    }
});
exports.insert_message_to_chat_on_id = insert_message_to_chat_on_id;
