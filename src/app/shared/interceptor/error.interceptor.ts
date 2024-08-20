import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError(
      (errorResponse: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
        console.log(errorResponse);
        const errorMessage =
          errorResponse.error.error.message || errorResponse.error;

        return throwError(() => errorMessage);
      },
    ),
  );
};
