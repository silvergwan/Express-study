// Account 인터페이스 선언
export interface Account {
  id: string;
  balance: number;
  readonly accountNumber: string;
  status: "active" | "frozen" | "closed";
}

// 임시 DB (메모리)
export const accounts: Record<string, Account> = {
  "1": {
    id: "1",
    accountNumber: "1000-2345-6789",
    balance: 100000,
    status: "active",
  },
};

// 입금 함수입니다.
export function deposit(account: Account, amount: number): Account {
  if (amount <= 0) {
    throw new Error("입금액은 0보다 커야 합니다.");
  }
  if (account.status !== "active") {
    throw new Error("활성 계좌만 입금 가능합니다.");
  }

  return { ...account, balance: account.balance + amount };
}

// 출금 함수입니다.
export function withdraw(account: Account, amount: number): Account {
  if (amount <= 0) {
    throw new Error("출금액은 0보다 커야합니다.");
  }
  if (amount > account.balance) {
    throw new Error("잔액이 부족합니다.");
  }
  if (account.status !== "active") {
    throw new Error("활성 계좌만 출금 가능합니다.");
  }

  return { ...account, balance: account.balance - amount };
}
