export interface BankAccount {
  id: number;
  status: Status;
  name: string;
  balance: number;
  currency: Currency;
}

export type Status = 'active' | 'inactive';

export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
  USD = 'USD',
}
