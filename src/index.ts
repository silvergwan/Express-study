import express, { Request, Response } from "express";
import { Account, deposit, withdraw } from "./account";

const app = express();
app.use(express.json());

// 임시 DB
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

// POST /account/:id/deposit - 입급
app.post(
  "/accounts/:id/deposit",
  (req: Request<{ id: string }>, res: Response) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계좌를 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    try {
      const updated = deposit(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
);

// POST /account/:id/withdraw - 출금
app.post(
  "/accounts/:id/withdraw",
  (req: Request<{ id: string }>, res: Response) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계좌를 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    try {
      const updated = withdraw(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
);
