import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001; // RenderなどはPORT環境変数を参照する

// ミドルウェアの設定
app.use(cors()); // CORSを許可
app.get("/api/works", async (req, res) => {
  const lang = req.query.lang as string;
  if (!lang) {
    return res
      .status(400)
      .json({ error: 'Language query parameter lang is required' });
  } else if (lang !== "ja" && lang !== "en") {
    return res
      .status(400)
      .json({ error: 'This lang parameter is not valid' });
  }

  try {
    const works = await prisma.work.findMany({
      include: {
        translations: {
          where: {
            language: lang,
          },
        },
      },
    });

    // JSONの整形
    const formattedWorks = works.map(work => {
      const translation = work.translations[0];
      delete (work as any).translations;
      return {
        ...work,
        ...translation
      }
    })

    res.json(formattedWorks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch works" });
  }
});
app.use(express.json()); // JSONリクエストボディをパース

// サーバー起動
app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
