import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = Router();
import { find_user } from "../database/Request/User";
import { create_jwt_token } from "../token/jwt";
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Некорректный email").normalizeEmail(),
    body("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("Пароль должен быть не менее 8, не более 30 символов"),
  ],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ success: false, errorList: errors.array() });
      const { email, password } = req.body;
      const save_user = await find_user({ email, password });
      if (!save_user.success) return res.status(404).json({ ...save_user });
      let token = create_jwt_token({
        email: save_user.email || "",
        id: save_user.id || "",
      });
      console.log({
        success: true,
        ...token,
        id_chat: save_user.id_chat,
        name: save_user.name,
        surname: save_user.surname,
      });
      return res.status(201).json({
        success: true,
        ...token,
        id_chat: save_user.id_chat,
        name: save_user.name,
        surname: save_user.surname,
      });
    } catch (e) {
      console.error("Ошибка при регистрации в файле Registration.ts", e);
      return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }
);

export default router;
