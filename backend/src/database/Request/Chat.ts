import Chat from "../Schema/ChatSchema";
import User from "../Schema/UserSchema";

export const find_chat_by_id = async (id: string) => {
  try {
    // Применяем правильную типизацию для найденного чата
    let chat = await Chat.findOne({ id }).select("message");
    if (!chat) return { success: false, message: "Чат не найден", chat: [] };

    // Возвращаем найденный чат
    return { success: true, chat, message: "Успех!" };
  } catch (e) {
    return { success: false, message: "Не удалось найти чат", chat: [] };
  }
};

export const find_all_chat_of_user = async (userID?: string) => {
  try {
    if (!userID) return { success: false, message: "ID не указан" };
    let chats = await User.findOne({ id: userID });
    if (!chats) return { success: false, message: "Пользователь не найден!" };
    if (!chats?.chatList.length)
      return { success: false, message: "Чатов нет!", chats: [] };
    let chatList = chats.chatList.map((chat: any) => chat.id);

    let get_chat = await Chat.aggregate([
      { $match: { id: { $in: chatList } } },
      {
        $project: {
          id: 1,
          lastMessage: { $arrayElemAt: ["$message", -1] }, 
        },
      },
    ]);

    return { success: true, chats: get_chat, message: "Успех!" };
  } catch (e) {
    return { success: false, message: "Не удалось найти чат", chats: [] };
  }
};

export const create_chat = async (userID: string | undefined) => {
  try {
    let find_user = await User.findOne({ id: userID });
    if (!find_user)
      return { success: false, message: "Пользователь не существует" };
    let chat_ids = find_user.chatList.map((chat: any) => chat.id);
    let empty_chats = await Chat.find({
      id: { $in: chat_ids },
      message: { $size: 0 },
    });

    if (empty_chats.length > 0) {
      let empty_chat_ids = empty_chats.map((chat: any) => chat.id);
      console.log("Удаляем пустые чаты:", empty_chat_ids);

      await Chat.deleteMany({ id: { $in: empty_chat_ids } });
      find_user.chatList = find_user.chatList.filter(
        (chat: any) => !empty_chat_ids.includes(chat.id)
      );
      await find_user.save();
    }
    let new_chat = await Chat.create({});
    await find_user.chatList.push({ id: new_chat.id });
    await find_user.save();
    return {
      success: true,
      chat_id: new_chat.id,
    };
  } catch (e) {
    return { success: false, message: "Ошибка сервера" };
  }
};

export const insert_message_to_chat_on_id = async (
  id: string = "",
  isBot: "User" | "Bot" = "Bot",
  message: string,
  user_time?: number
) => {
  try {
    let chat = await Chat.findOne({ id });
    if (!chat) {
      return { success: false, message: "Чат не найден" };
    }
    chat.message.push({ sender: isBot, text: message, timestamp: user_time });
    await chat.save();

    return { success: true, message: "Сообщение успешно добавлено" };
  } catch (error) {
    console.error("Ошибка при добавлении сообщения:", error);
    return {
      success: false,
      message: "Произошла ошибка при добавлении сообщения",
    };
  }
};
