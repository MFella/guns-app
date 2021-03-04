import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService, private router: Router, private izi: IziAlertService){}
  canActivate(): boolean {

    if(this.authServ.currentUser !== null)
    {
      return true;
    }

    this.izi.error('You are not allowed to do this!');
    this.router.navigate(['/']);
    return false;
  }
  
}
