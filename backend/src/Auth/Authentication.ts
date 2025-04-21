import { Router, Request, Response } from "express";
import { verify_jwt_token } from "../token/jwt";
import { TypeToken } from "../types/toket_type";
import { find_user_by_token } from "../database/Request/User";
const router = Router();

export default router.get(
  "/verify-user",
  async (req: Request, res: Response): Promise<any> => {
    try {
      let access = await get_bearer(req.headers.authorization)?.trim();
      let info_token = await verify_jwt_token(access, TypeToken.ACCESS);
      if (!info_token.success || !info_token.info?.email)
        return res.status(401).json({ ...info_token });
      let user = await find_user_by_token(info_token.info);
      return res.status(200).json({ ...user });
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, message: "Ошибка сервера" });
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
