export interface Account {
  id: string;
  balance: number;
  readonly accounterNumber: string;
  status: "active" | "frozen" | "closed";
}
