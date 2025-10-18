import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001; // RenderなどはPORT環境変数を参照する

// ミドルウェアの設定
app.use(cors()); // CORSを許可
app.use(express.json()); // JSONリクエストボディをパース

// テスト用のルート
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Backend!' });
});

// サーバー起動
app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});