import express, { Request, Response, NextFunction } from "express";
import accountsRouter from "./accounts/accounts.router";

const app = express();
app.use(express.json()); // Body를 JSON으로 파싱해주는 미들웨어

app.use("/accounts", accountsRouter);

// 에러 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});

