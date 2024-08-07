import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/dashboard.model';

const translatedCurrency: any = {
  PLN: 'złotych',
  EUR: 'euro',
  USD: 'dolarów',
};

@Pipe({
  name: 'balance',
  standalone: true,
})
export class BalancePipe implements PipeTransform {
  transform(value: number, currency: Currency, uppercase = false) {
    let balance = value + ' ' + translatedCurrency[currency];
    if (uppercase) {
      balance = balance.toUpperCase();
    }
    return balance;
  }
}
