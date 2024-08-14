import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BalancePipe } from '../../pipes/balance.pipe';
import { BankAccount } from '../../models/dashboard.model';
import { NgClass, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { CardStatusDirectives } from '../../../../shared/directives/card-status.directives';
import { InputNumberComponent } from '../../../../shared/components/input-number/input-number.component';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [
    FormsModule,
    BalancePipe,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    CardStatusDirectives,
    InputNumberComponent,
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ContentChild('deleteButton') deleteButton!: ElementRef;
  @Input() account!: BankAccount;
  @Output() withdrawMoney$ = new EventEmitter<number>();
  destroy$: Subject<void> = new Subject<void>();

  cdr = inject(ChangeDetectorRef);

  form!: FormGroup;
  showWithdrawWarning: boolean = false;

  get withdrawControl(): FormControl {
    return this.form.get('withdraw') as FormControl;
  }

  get withdrawControlValue(): number {
    return this.withdrawControl.value;
  }

  get balance() {
    return this.account.balance;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      withdraw: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(this.account.balance),
        ],
      }),
    });

    this.withdrawControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.showWithdrawWarning = value >= 1000;
      });
  }

  ngAfterContentInit() {
    if (this.account.status == 'inactive') {
      this.deleteButton.nativeElement.disabled = true;
    }
  }

  withdrawMoney() {
    this.withdrawMoney$.next(this.withdrawControlValue);
    this.form.reset();
    this.cdr.detectChanges();
    this.withdrawControl.addValidators(Validators.max(this.account.balance));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
