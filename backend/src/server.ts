import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import path from "path";
import http from "http";
import morgan from "morgan";
import chat_router from "./Chat/routes";
import auth_router from "./Auth/Router";
import CodeRoute from "./mail/router";
import initSocket from "./Chat/Socket";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL || "http://localhost:3000"],
//   })
// );

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.status(201).sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use(auth_router);
app.use("/code", CodeRoute);
app.use("/chat", chat_router);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload(); // name, email, picture и т.д.
}

const server = http.createServer(app);

const io = initSocket(server);

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Подключение к бд");

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
