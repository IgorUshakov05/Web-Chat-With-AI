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
exports.verifyGoogleIdToken = verifyGoogleIdToken;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const google_auth_library_1 = require("google-auth-library");
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./Chat/routes"));
const Router_1 = __importDefault(require("./Auth/Router"));
const router_1 = __importDefault(require("./mail/router"));
const Socket_1 = __importDefault(require("./Chat/Socket"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL || "http://localhost:3000"],
//   })
// );
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.headers);
    next();
});
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.status(201).sendFile(path_1.default.join(__dirname, "dist", "index.html"));
});
app.use(Router_1.default);
app.use("/code", router_1.default);
app.use("/chat", routes_1.default);
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
function verifyGoogleIdToken(idToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload(); // name, email, picture и т.д.
    });
}
const server = http_1.default.createServer(app);
const io = (0, Socket_1.default)(server);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL || "");
        console.log("Подключение к бд");
        server.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
