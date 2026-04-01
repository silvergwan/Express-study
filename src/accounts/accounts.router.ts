import { Router, Request, Response, NextFunction } from "express";
import { accounts, deposit, withdraw } from "./accounts.service";

const router = Router();

// 계
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const account = accounts[req.params.id];

  if (!account) {
    res.status(404).json({ message: "계정을 찾을 수 없습니다." });
    return;
  }

  res.status(200).json(account);
});

// 입금 라우터
router.post(
  "/:id/deposit",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계정을 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    if (typeof amount !== "number" || isNaN(amount)) {
      res.status(400).json({ message: "amount는 숫자여야합니다." });
      return;
    }

    try {
      const updated = deposit(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:id/withdraw",
  (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const account = accounts[req.params.id];

    if (!account) {
      res.status(404).json({ message: "계정을 찾을 수 없습니다." });
      return;
    }

    const { amount } = req.body;

    if (typeof amount !== "number" || isNaN(amount)) {
      res.status(400).json({ message: "amount는 숫자여야합니다." });
      return;
    }

    try {
      const updated = withdraw(account, amount);
      accounts[req.params.id] = updated;
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
