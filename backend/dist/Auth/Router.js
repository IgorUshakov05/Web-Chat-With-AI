"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./Login"));
const Registration_1 = __importDefault(require("./Registration"));
const Authentication_1 = __importDefault(require("./Authentication"));
const GoogleSignIn_1 = __importDefault(require("./GoogleSignIn"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.default = router.use("/auth", Login_1.default, GoogleSignIn_1.default, Registration_1.default, Authentication_1.default);
