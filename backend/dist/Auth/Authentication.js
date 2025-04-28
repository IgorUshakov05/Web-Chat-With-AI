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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../token/jwt");
const toket_type_1 = require("../types/toket_type");
const User_1 = require("../database/Request/User");
const router = (0, express_1.Router)();
exports.default = router.get("/verify-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let access = yield ((_a = get_bearer(req.headers.authorization)) === null || _a === void 0 ? void 0 : _a.trim());
        let info_token = yield (0, jwt_1.verify_jwt_token)(access, toket_type_1.TypeToken.ACCESS);
        if (!info_token.success || !((_b = info_token.info) === null || _b === void 0 ? void 0 : _b.email))
            return res.status(401).json(Object.assign({}, info_token));
        let user = yield (0, User_1.find_user_by_token)(info_token.info);
        return res.status(200).json(Object.assign({}, user));
    }
    catch (e) {
        return res
            .status(500)
            .json({ success: false, message: "Ошибка сервера" });
    }
}));
const get_bearer = (header) => {
    try {
        return header === null || header === void 0 ? void 0 : header.split("Bearer")[1];
    }
    catch (e) {
        return undefined;
    }
};
