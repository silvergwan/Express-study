export interface Account {
  id: string;
  balance: number;
  readonly accounterNumber: string;
  status: "active" | "frozen" | "closed";
}

export function deposit(account: Account, amount: number): Account {
  if (amount <= 0) {
    throw new Error("입금 금액은 0보다 커야합니다.");
  }
  if (account.status !== "active") {
    throw new Error("활성된 계좌만 입급이 가능합니다.");
  }

  return { ...account, balance: account.balance + amount };
}
