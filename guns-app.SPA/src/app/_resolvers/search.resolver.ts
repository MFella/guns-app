import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gun } from '../_models/gun';
import { GunsService } from '../_services/guns.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Injectable()
export class SearchResolver implements Resolve<Gun[]> {

    pageNo = 1;
    pageSize = 5;

    constructor(private gunServ: GunsService, private router: Router
        , private izi: IziAlertService){}

        resolve(route: ActivatedRouteSnapshot): Observable<Gun[]>
        {
            return this.gunServ.getAllGuns().pipe(
                catchError(err => {
                    this.izi.error('Problem occured during retriving data');
                    this.router.navigate(['/']);
                    return of(null);
                })
            )
        }
}