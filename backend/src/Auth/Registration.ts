import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = Router();
import { create_user } from "../database/Request/User";
import { create_jwt_token } from "../token/jwt";
import FromData from "../types/FormType";
router.post(
  "/registration",
  [
    body("email").isEmail().withMessage("Некорректный email").normalizeEmail(),
    body("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("Пароль должен быть не менее 6 и не более 30 символов"),
    body("retry_password")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Пароли не совпадают"),
    body("name")
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage("Имя обязательно для заполнения"),
    body("surname")
      .trim()
      .isLength({ min: 2, max: 40 })
      .withMessage("Фамилия обязательна для заполнения"),
    body("day")
      .isInt({ min: 1, max: 31 })
      .withMessage("Неверный день рождения"),
    body("month")
      .isInt({ min: 1, max: 12 })
      .withMessage("Неверный месяц рождения"),
    body("year")
      .isInt({ min: 1900, max: new Date().getFullYear() - 5 })
      .withMessage("Неверный год рождения"),
    body("code")
      .isLength({ min: 4, max: 8 })
      .withMessage("Код подтверждения должен быть от 4 до 8 символов")
      .optional({ nullable: true }),
  ],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const errors = validationResult(req);
      console.log(req.body);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ success: false, errorList: errors.array() });
      const {
        email,
        password,
        day,
        month,
        code,
        name,
        surname,
        year,
      }: FromData = req.body;
      const save_user = await create_user({
        email,
        password,
        code,
        day,
        month,
        name,
        surname,
        year,
      });
      if (!save_user.success) return res.status(409).json({ ...save_user });
      let token = create_jwt_token({
        email: save_user.email || "",
        id: save_user.id || "",
      });
      return res
        .status(201)
        .json({
          success: true,
          ...token,
          id_chat: save_user.id_chat,
          name,
          surname,
        });
    } catch (e) {
      console.error("Ошибка при регистрации в файле Registration.ts", e);
      return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }
);

export default router;
