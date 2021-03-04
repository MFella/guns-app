import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { IziAlertService } from './iziAlert.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService, private router: Router,
      private izi: IziAlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');
    //console.log(localStorage);
    //console.log(`Id toke is: ${idToken}`);

    if(idToken)
    {
      const cloned = request.clone({
        //'JWT ' +
        headers: request.headers.set('Authorization', 'Bearer ' + idToken.split(' ')[1])
      });

      return next.handle(cloned)
        .pipe(
          catchError((response: HttpErrorResponse) =>
          {

            if(response instanceof HttpErrorResponse && response.status === 401)
            {
              this.router.navigate(['']);
              this.authServ.logout();
              this.izi.error('Session expired');
            }
            return throwError(response);

          })
        )

    }
    else 
    {
      return next.handle(request);
    }
  }
}
