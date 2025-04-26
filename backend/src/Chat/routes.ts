import { Router, Request, Response } from "express";

import {
  create_chat,
  delete_chat,
  find_all_chat_of_user,
  find_chat_by_id,
  insert_message_to_chat_on_id,
} from "../database/Request/Chat";
import { body, validationResult, check } from "express-validator";
import { verify_jwt_token } from "../token/jwt";
import { TypeToken } from "../types/toket_type";
import { get_answer_ai_without_auth } from "../database/Request/AI";
const router = Router();
router.post(
  "/response_without_auth",
  [
    body("message")
      .exists({ checkFalsy: true })
      .withMessage("Message is required")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Message must be between 5 and 1000 characters"),
  ],
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(404)
        .json({ success: false, message: "Введите сообщение" });
    }
    let { message } = req.body;
    let response = await get_answer_ai_without_auth(message);
    if (!response.success)
      return res
        .status(404)
        .json({ success: false, message: response.message });
    return res.status(201).json(response);
  }
);
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    let access = await get_bearer(req.headers.authorization)?.trim();
    if (!access)
      return res.status(403).json({ success: false, message: "Нет токена" });
    let info_token = await verify_jwt_token(access, TypeToken.ACCESS);
    if (!info_token.success) return res.status(403).json(info_token);
    let get_chat = await find_all_chat_of_user(info_token.info?.id);
    res.status(201).json(get_chat);
  } catch (e) {
    return res.status(500).json({ success: false, message: "Ошибка сервера!" });
  }
});

router.get("/new_chat", async (req: Request, res: Response): Promise<any> => {
  try {
    let access = await get_bearer(req.headers.authorization)?.trim();
    if (!access)
      return res.status(403).json({ success: false, message: "Нет токена" });
    let info_token = await verify_jwt_token(access, TypeToken.ACCESS);
    if (!info_token.success) return res.status(403).json(info_token);
    let new_chat_url = await create_chat(info_token.info?.id);
    if (!new_chat_url.success) return res.status(401).json(new_chat_url);
    return res.status(201).json(new_chat_url);
  } catch (e) {
    res.status(501).json({ success: false, message: "Ошибка сервера" });
  }
});

router.post(
  "/:id",
  [
    // Валидация параметра id из URL
    check("id").isUUID().withMessage("ID должен быть в формате UUID"),

    // Валидация поля message из тела запроса
    body("message").notEmpty().withMessage("Поле message не может быть пустым"),
    body("message").isString().withMessage("Поле message должно быть строкой"),
  ],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { id } = <{ id: string }>req.params;
      console.log(req.params.id);
      const { message } = req.body;
      let insert_message = await insert_message_to_chat_on_id(
        id,
        "User",
        message
      );

      if (!insert_message.success) return res.status(500).json(insert_message);
      res.status(201).json({ success: false, message, from: "User" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: "Произошла ошибка на сервере" });
    }
  }
);

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    let chat_id: string = req.params.id;
    if (!chat_id)
      return res.status(404).json({ success: false, message: "Чат не найден" });
    let access = await get_bearer(req.headers.authorization)?.trim();
    if (!access)
      return res.status(403).json({ success: false, message: "Нет токена" });
    let info_token = await verify_jwt_token(access, TypeToken.ACCESS);
    if (!info_token.success) return res.status(403).json(info_token);
    let response = await delete_chat(chat_id);
    if (!response.success)
      return res
        .status(404)
        .json({ success: false, message: response.message });
    return res.status(201).json(response);
  } catch (e) {
    console.log(e);
    return { success: false, message: "Ошибка сервера" };
  }
});

export default router.get(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let id: string = req.params.id;
      if (!id)
        return res
          .status(404)
          .json({ success: false, message: "Чат не найден" });
      let chat = await find_chat_by_id(id);
      if (!chat.success) return res.status(404).json(chat);
      return res.status(201).json(chat);
    } catch (e) {
      console.log(e);
      return res
        .status(404)
        .json({ success: false, message: "Не удалось найти чат" });
    }
  }
);

const get_bearer = (header: string | undefined): string | undefined => {
  try {
    return header?.split("Bearer")[1];
  } catch (e) {
    return undefined;
  }
};
