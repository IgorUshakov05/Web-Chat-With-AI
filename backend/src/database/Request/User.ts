import { TokenInfo } from "./../../types/toket_type";
import UserSchema from "../Schema/UserSchema";
import { v4 } from "uuid";
import {
  Create_User,
  Login_User,
  result_Create_User,
} from "../../types/create_user";
import User from "../Schema/UserSchema";
import Chat from "../Schema/ChatSchema";
import { encryptPassword, verifyPassword } from "../../secret/HashPassword";
import Code from "../Schema/Code";
export const create_user = async ({
  email,
  code,
  day,
  month,
  name,
  surname,
  year,
  password,
}: Create_User): Promise<result_Create_User> => {
  try {
    let find_user = await User.findOne({ email });
    if (find_user)
      return { success: false, error: "Пользователь уже существует" };
    let verefy_post = await Code.findOne({ mail: email, code });
    console.log(verefy_post);
    if (!verefy_post) return { success: false, error: "Почта не подтверждена" };
    let birthday = `${day}-${month}-${year}`;
    let current_user = await UserSchema.create({
      email,
      birthday,
      surname,
      name,
      hash_password: encryptPassword(password),
    });
    let new_chat = await Chat.create({});
    await current_user.chatList.push({ id: new_chat.id });
    await current_user.save();
    return { success: true, id: current_user.id, email, id_chat: new_chat.id };
  } catch (e) {
    console.log(e);
    return { success: false, error: "Ошибка при регистрации" };
  }
};

export const find_user = async ({
  email,
  password,
}: Login_User): Promise<result_Create_User> => {
  try {
    let find_user = await User.findOne({ email });
    if (!find_user) return { success: false, error: "Пользователь не найден" };
    if (!find_user.hash_password) {
      return { success: false, error: "Пароль не найден" };
    }
    let split_password = find_user.hash_password.split("|");
    let verify_password = await verifyPassword(
      password,
      split_password[0],
      split_password[1]
    );
    if (!verify_password) return { success: false, error: "Пароль неверный" };
    let find_last_chat = await Chat.findOne({
      id: find_user.chatList[0].id,
    });
    if (!find_last_chat) {
      let new_chat = await Chat.create({});
      await find_user.chatList.push({ id: new_chat.id });
      await find_user.save();
      return {
        success: true,
        id: find_user.id,
        email,
        id_chat: new_chat.id,
        name: find_user.name,
        surname: find_user.surname,
      };
    }
    return {
      success: true,
      id: find_user.id,
      email,
      name: find_user.name,
      surname: find_user.surname,
      id_chat: find_last_chat.id,
    };
  } catch (e) {
    console.log(e);
    return { success: false, error: "Ошибка при регистрации" };
  }
};
export const find_user_without_password = async (
  email: string
): Promise<result_Create_User> => {
  try {
    let find_user = await User.findOne({ email });
    if (!find_user) return { success: false, error: "Пользователь не найден" };
    let find_last_chat = await Chat.findOne({
      id: find_user.chatList[0].id,
    });
    if (!find_last_chat) {
      let new_chat = await Chat.create({});
      await find_user.chatList.push({ id: new_chat.id });
      await find_user.save();
      return {
        success: true,
        id: find_user.id,
        email,
        id_chat: new_chat.id,
        name: find_user.name,
        surname: find_user.surname,
      };
    }
    return {
      success: true,
      name: find_user.name,
      surname: find_user.surname,
      id: find_user.id,
      email,
      id_chat: find_last_chat.id,
    };
  } catch (e) {
    return { success: false, error: "Ошибка при регистрации" };
  }
};
export const find_user_by_token = async (
  data: TokenInfo
): Promise<{ success: boolean; message: string }> => {
  try {
    let find_user = await UserSchema.findOne({ email: data.email });
    if (!find_user)
      return { success: false, message: "Пользователь не найден" };
    return { success: true, message: "Успех!" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Возникла ошибка" };
  }
};
