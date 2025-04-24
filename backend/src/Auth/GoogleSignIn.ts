import axios from "axios";
import { Router, Request } from "express";
import { find_user_without_password } from "../database/Request/User";
import { create_jwt_token } from "../token/jwt";
const router = Router();

router.post("/google/sign_in", async (req: any, res: any) => {
  const { access_token } = req.body;

  try {
    const response = await axios.get<{
      sub: string;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
      email: string;
      email_verified: boolean;
    }>("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = response.data;
    console.log("User info:", userData);

    const save_user = await find_user_without_password(userData.email);
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
  } catch (err) {
    console.error("Ошибка при валидации токена: ");
    return res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

export default router;
