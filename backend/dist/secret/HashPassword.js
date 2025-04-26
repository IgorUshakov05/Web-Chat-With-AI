"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = encryptPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = __importDefault(require("crypto"));
const SALT_LENGTH = 16;
const HASH_LENGTH = 64;
const ITERATIONS = 100000;
const ALGORITHM = "sha512";
function encryptPassword(password) {
    const salt = crypto_1.default.randomBytes(SALT_LENGTH).toString("hex");
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, ALGORITHM)
        .toString("hex");
    return salt + "|" + hash;
}
function verifyPassword(password, salt, originalHash) {
    const derivedHash = crypto_1.default
        .pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, ALGORITHM)
        .toString("hex");
    return derivedHash === originalHash;
}
