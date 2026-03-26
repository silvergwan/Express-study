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
