import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const codeToPost = async ({
  email,
  code,
}: {
  email: string;
  code: number;
}) => {
  try {
    await transporter.sendMail({
      from: `"Подтверждение" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Ваш код подтверждения",
      text: `Ваш код подтверждения: ${code}`,
      html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
    });
    return { status: true , message:"Код отправлен"};
  } catch (e) {
    console.log(e);
    return { status: false, message: "Ошибка сервера" };
  }
};
