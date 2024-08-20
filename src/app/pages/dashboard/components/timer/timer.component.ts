import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  OnDestroy,
  signal,
} from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {
  @Input() startFrom = 300000;
  @Input() decrement = 1000;

  private readonly authService = inject(AuthService);

  destroy$: Subject<void> = new Subject<void>();
  timer$ = signal(this.startFrom);
  router = inject(Router);

  constructor() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.timer$.update((value) => value - this.decrement);
      });

    effect(
      () => {
        if (this.timer$() <= 0) {
          this.authService.logout();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
