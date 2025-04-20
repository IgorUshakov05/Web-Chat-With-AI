import { start } from "repl";
import CodeSchema from "../Schema/Code";
import { codeToPost } from "../../mail/sendCode";

export async function SetCode({
  email,
  code,
}: {
  email: string;
  code: number;
}): Promise<{ status: boolean; message: string }> {
  let newCode = await CodeSchema.findOne({ mail: email });
  if (newCode) {
    return { status: false, message: "Код уже отправлен" };
  } else {
    const newCode = new CodeSchema({ mail: email, code: code });
    await newCode.save();
    return { status: true, message: "Код сохранен" };
  }
}
const generateCode = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};
export async function VerefyPost({
  email,
  code,
}: {
  email: string;
  code: number;
}): Promise<{ status: boolean; message: string }> {
  let newCode = await CodeSchema.findOne({ mail: email });
  if (!newCode) {
    return { status: false, message: "Код неверный" };
  }
  if (newCode.count > 5) {
    const code = generateCode();

    let sendNewCode = await codeToPost({ email, code });
    if (!sendNewCode.status) return sendNewCode;
    newCode.code = code;
    newCode.count = 0;
    await newCode.save()
    return { status: false, message: "Отправлен новый код" };
  }
  if (newCode.code != code) {
    newCode.count += 1;
    newCode.save();
    return { status: false, message: "Код неверный" };
  }
  newCode.isVerefy = true;
  await newCode.save();
  return { status: true, message: "Код верный" };
}
