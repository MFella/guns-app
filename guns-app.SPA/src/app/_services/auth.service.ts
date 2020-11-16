import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {map, share, shareReplay, tap} from 'rxjs/operators';
import { User } from '../_models/user';
import * as env from '../../environments/environment';
import * as moment from 'moment';
import { IziAlertService } from './iziAlert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //everything only for testing purposes

  backUrl: string = 'http://localhost:3000/users';
  currentUser: any;

  constructor(private http: HttpClient, private izi: IziAlertService) { 
    this.currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    //console.log(this.currentUser);
  }



  registerUser(user: User)
  { 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${env.environment.backUrl}/register`, user, {headers: headers});
  }

  login(creds: {email: string, password: string})
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<User>(`${env.environment.backUrl}/login`, creds, {headers})
    .pipe(
      tap(r => this.setSession(r)),
      shareReplay(),
      map((res: any) => {
        if(res)
        {
          this.currentUser = res.user;
        }
      })
    )
  }

  private setSession(authRes)
  {
    this.currentUser = authRes.user;
    console.log(this.currentUser);
    const expireDate = moment().add(authRes.expiresIn, 'second');
    console.log(authRes);
    localStorage.setItem('user', JSON.stringify(authRes.user));
    localStorage.setItem('id_token', authRes.token);
    localStorage.setItem('expires_at', JSON.stringify(expireDate.valueOf()));

  }

  logout()
  {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.izi.info('You have been logged out properly');
  } 

  isLoggedIn()
  {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut()
  {
    return !this.isLoggedIn();
  }

  getExpiration()
  {
    const exp = localStorage.getItem('expires_at');
    const expiresDate = JSON.parse(exp);
    return moment(expiresDate);
  }


}
