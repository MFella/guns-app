import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService) {}

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

      return next.handle(cloned);

    }
    else 
    {
      return next.handle(request);
    }
  }
}
