import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001; // RenderなどはPORT環境変数を参照する

// ミドルウェアの設定
app.use(cors()); // CORSを許可
app.get("/api/works", async (req, res) => {
  try {
    const activities = await prisma.work.findMany();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch works" });
  }
});
app.use(express.json()); // JSONリクエストボディをパース

// サーバー起動
app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
