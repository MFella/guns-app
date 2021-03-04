import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IziAlertService } from '../_services/iziAlert.service';
import {OrderRecord} from '../_models/orderrecord';
import { OrdersService } from '../_services/orders.service';

@Injectable()
export class OrderListResolver implements Resolve<OrderRecord[]> {

    constructor(private orderServ: OrdersService, private router: Router,
         private izi: IziAlertService){}

        resolve(route: ActivatedRouteSnapshot): Observable<OrderRecord[]>
        {
            return this.orderServ.getAllOrders().pipe(
                catchError(err => {
                    this.izi.error('Problem occured during retriving data');
                    this.router.navigate(['/']);
                    return of(null);
                })
            )
        }
}