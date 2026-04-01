import express, { Request, Response, NextFunction } from "express";
import { Account, deposit, withdraw } from "./account";

const app = express();
app.use(express.json()); // Body를 JSON으로 파싱해주는 미들웨어

// 임시 DB (메모리)
const accounts: Record<string, Account> = {
  "1": {
    id: "1",
    accountNumber: "1000-2345-6789",
    balance: 100000,
    status: "active",
  },
};

// GET /accounts/:id — 계좌 조회
app.get("/accounts/:id", (req: Request<{ id: string }>, res: Response) => {
  const account = accounts[req.params.id];

  if (!account) {
    res.status(404).json({ message: "계좌를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json(account);
});

// POST /accounts/:id/deposit — 입금
app.post(
  "/accounts/:id/deposit",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계좌를 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    if (typeof amount !== "number" || isNaN(amount)) {
      res.status(400).json({ message: "amount는 숫자여야 합니다." });
      return;
    }

    try {
      const updated = deposit(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      // catch를 next로 변경
      next(error);
    }
  },
);

// POST /accounts/:id/withdraw — 출금
app.post(
  "/accounts/:id/withdraw",
  (req: Request<{ id: string }>, res: Response, next) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계좌를 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    if (typeof amount !== "number" || isNaN(amount)) {
      res.status(400).json({ message: "amount는 숫자여야 합니다." });
      return;
    }

    try {
      const updated = withdraw(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      // 동일함니다.
      next(error);
    }
  },
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
