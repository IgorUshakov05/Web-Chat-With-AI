const router = require("express").Router();
import { SetCode, VerefyPost } from "../database/Request/Code";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { codeToPost } from "./sendCode";
const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const generateCode = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};
router.post("/send-code", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email обязателен." });
  }

  const code = generateCode();

  try {
    let sendCode = await SetCode({ email, code });
    if (!sendCode.status) return res.status(401).json(sendCode);
    let mailSend = await codeToPost({ email, code });
    if (!mailSend.status) return res.status(401).json(mailSend);
    return res.status(200).json(mailSend);
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    res
      .status(500)
      .json({ status: false, message: "Не удалось отправить код" });
  }
});

router.post("/verefy-post", async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email и Код обязательны" });
  }

  try {
    let verefy = await VerefyPost({ email, code });
    if (!verefy.status) return res.status(401).json(verefy);
    res.status(200).json({ status: true, message: "Почта подтверждена" });
  } catch (error) {
    console.error("Ошибка при подтверждении:", error);
    res
      .status(500)
      .json({ status: false, message: "Не удалось подтвердить почту" });
  }
});

export default router;
