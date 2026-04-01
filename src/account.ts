export interface Account {
  id: string;
  balance: number;
  readonly accountNumber: string;
  status: "active" | "frozen" | "closed";
}

export function deposit(account: Account, amount: number): Account {
  if (amount <= 0) {
    throw new Error("입금액은 0보다 커야 합니다.");
  }
  if (account.status !== "active") {
    throw new Error("활성 계좌만 입금 가능합니다.");
  }

  return { ...account, balance: account.balance + amount };
}

export function withdraw(account: Account, amount: number): Account {
  if (amount <= 0) {
    throw new Error("출금액은 0보다 커야 합니다.");
  }
  if (account.status !== "active") {
    throw new Error("활성 계좌만 출금 가능합니다.");
  }
  if (account.balance < amount) {
    throw new Error("잔액이 부족합니다.");
  }

  return { ...account, balance: account.balance - amount };
}
