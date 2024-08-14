import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { BankAccountHttpService } from './components/services/bank-account-http.service';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { TimerComponent } from './components/timer/timer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [
    BankAccountComponent,
    NgForOf,
    NgClass,
    AsyncPipe,
    NgIf,
    TimerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly bankAccountHttpService = inject(BankAccountHttpService);
  accountsChanges$ = new BehaviorSubject<void>(undefined);

  accounts$ = this.accountsChanges$.pipe(
    switchMap(() =>
      combineLatest([
        this.bankAccountHttpService.getBankAccounts(),
        this.bankAccountHttpService.getVisibleAccounts(),
      ]).pipe(
        map(([accounts, visible]) =>
          accounts.filter((account) => visible.includes(account.id)),
        ),
      ),
    ),
  );

  constructor() {}

  onWithdrawMoney(accountId: number, withdrawAmount: number) {
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }

  deleteAccount(accountId: number) {
    this.bankAccountHttpService.deleteAccount(accountId);
    this.accountsChanges$.next(undefined);
  }
}
