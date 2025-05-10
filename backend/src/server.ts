import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import path from "path";
import http from "http";
import morgan from "morgan";
import chat_router from "./Chat/routes";
import auth_router from "./Auth/Router";
import CodeRoute from "./mail/router";
import initSocket from "./Chat/Socket";
import { setGlobalDispatcher, Agent, fetch } from "undici";
setGlobalDispatcher(new Agent({ keepAliveTimeout: 120000 }));
globalThis.fetch = fetch as any;
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: [process.env.CLIENT_URL || ""],
  })
);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.status(201).sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/health", async (req: Request, res: Response) => {
  try {
    const dbState = mongoose.connection.readyState;
    if (dbState === 1) {
      res.status(200).send("OK");
    } else {
      res.status(500).send("Database not connected");
    }
  } catch (e) {
    res.status(500).send("Error");
  }
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
  return ticket.getPayload();
}

const server = http.createServer(app);

const io = initSocket(server);

const start = async () => {
  try {
    console.log("Начало запуска");
    console.log("Подключение к бд", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL || "");

    server.listen(port, () => {
      console.log(`[server]: Server is running at ${process.env.SERVER_URL}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
