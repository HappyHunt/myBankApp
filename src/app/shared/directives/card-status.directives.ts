import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Status } from '../models/status.type';
import { fromEvent, Subject, takeUntil } from 'rxjs';

const CARD_CLASSES = ['active-card', 'inactive-card'];

@Directive({
  selector: '[appCardStatus]',
  standalone: true,
})
export class CardStatusDirectives implements OnInit, OnDestroy {
  @Input('appCardStatus') status!: Status;
  destroy$ = new Subject<void>();

  element = inject(ElementRef).nativeElement;
  renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.addClass(this.element, 'card');
    this.listenOnMouseMovement();
  }

  private listenOnMouseMovement() {
    fromEvent(this.element, 'mouseover')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        switch (this.status) {
          case 'inactive':
            this.renderer.addClass(this.element, CARD_CLASSES[1]);
            break;
          case 'active':
            this.renderer.addClass(this.element, CARD_CLASSES[0]);
            break;
          default:
        }
      });

    fromEvent(this.element, 'mouseleave')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        CARD_CLASSES.forEach((c) => {
          this.renderer.removeClass(this.element, c);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
