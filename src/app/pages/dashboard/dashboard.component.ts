import {Component} from '@angular/core';
import {BankAccountComponent} from "./components/bank-account/bank-account.component";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {BankAccountHttpService} from "./components/services/bank-account-http.service";
import {Observable} from "rxjs";
import {BankAccount} from "./models/dashboard.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [BankAccountHttpService],
  imports: [
    BankAccountComponent,
    NgForOf,
    NgClass,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{

  accounts$: Observable<BankAccount[]>;

  constructor(private bankAccountHttpService: BankAccountHttpService) {
    this.accounts$ = this.bankAccountHttpService.getBankAccounts();
  }

  onWithdrawMoney(accountId: number, withdrawAmount: number){
    this.bankAccountHttpService.withdrawMoney(accountId, withdrawAmount);
  }

}
