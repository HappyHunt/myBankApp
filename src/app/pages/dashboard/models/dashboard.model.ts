import { Status } from '../../../shared/models/status.type';

export interface BankAccount {
  id: number;
  status: Status;
  name: string;
  balance: number;
  currency: Currency;
}

export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
  USD = 'USD',
}
