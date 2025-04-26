"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCode = SetCode;
exports.VerefyPost = VerefyPost;
const Code_1 = __importDefault(require("../Schema/Code"));
const sendCode_1 = require("../../mail/sendCode");
function SetCode(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, code, }) {
        let newCode = yield Code_1.default.findOne({ mail: email });
        if (newCode) {
            return { status: false, message: "Код уже отправлен" };
        }
        else {
            const newCode = new Code_1.default({ mail: email, code: code });
            yield newCode.save();
            return { status: true, message: "Код сохранен" };
        }
    });
}
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
function VerefyPost(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, code, }) {
        let newCode = yield Code_1.default.findOne({ mail: email });
        if (!newCode) {
            return { status: false, message: "Код неверный" };
        }
        if (newCode.count > 5) {
            const code = generateCode();
            let sendNewCode = yield (0, sendCode_1.codeToPost)({ email, code });
            if (!sendNewCode.status)
                return sendNewCode;
            newCode.code = code;
            newCode.count = 0;
            yield newCode.save();
            return { status: false, message: "Отправлен новый код" };
        }
        if (newCode.code != code) {
            newCode.count += 1;
            newCode.save();
            return { status: false, message: "Код неверный" };
        }
        newCode.isVerefy = true;
        yield newCode.save();
        return { status: true, message: "Код верный" };
    });
}
