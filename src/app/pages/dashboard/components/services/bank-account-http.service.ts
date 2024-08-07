import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BankAccount, Currency } from '../../models/dashboard.model';

@Injectable()
export class BankAccountHttpService {
  BANK_ACCOUNT: BankAccount[] = [
    {
      id: 1,
      name: 'Main account',
      balance: 1000,
      currency: Currency.EUR,
      status: 'active',
    },
    {
      id: 2,
      name: 'Invisible',
      balance: -1800,
      currency: Currency.PLN,
      status: 'active',
    },
    {
      id: 3,
      name: 'Other account',
      balance: 0,
      currency: Currency.USD,
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Crypto account',
      balance: 10000000,
      currency: Currency.USD,
      status: 'inactive',
    },
  ];

  VISIBLE_ACCOUNTS = [1, 3, 4];

  getBankAccounts(): Observable<BankAccount[]> {
    return of(this.BANK_ACCOUNT).pipe(delay(500));
  }

  withdrawMoney(accountId: number, amount: number): void {
    this.BANK_ACCOUNT.forEach((account) => {
      if (account.id === accountId) {
        account.balance -= amount;
      }
    });
  }

  getVisibleAccounts(): Observable<number[]> {
    return of(this.VISIBLE_ACCOUNTS).pipe(delay(500));
  }
}
