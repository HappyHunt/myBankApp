import { Component, inject } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { BankAccountHttpService } from './components/services/bank-account-http.service';
import { combineLatest, map, Observable } from 'rxjs';
import { BankAccount } from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [BankAccountComponent, NgForOf, NgClass, AsyncPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly bankAccountHttpService = inject(BankAccountHttpService);
  accounts$ = combineLatest([
    this.bankAccountHttpService.getBankAccounts(),
    this.bankAccountHttpService.getVisibleAccounts(),
  ]).pipe(
    map(([accounts, visible]) =>
      accounts.filter((account) => visible.includes(account.id)),
    ),
  );

  constructor() {}

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }
}
