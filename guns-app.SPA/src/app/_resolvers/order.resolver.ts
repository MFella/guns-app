import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IziAlertService } from '../_services/iziAlert.service';
import {Order} from '../_models/order';
import { OrdersService } from '../_services/orders.service';

@Injectable()
export class OrderResolver implements Resolve<Order> {

    constructor(private orderServ: OrdersService, private router: Router,
         private izi: IziAlertService){}

        resolve(route: ActivatedRouteSnapshot): Observable<Order>
        {
            return this.orderServ.getSingleOrder(route.data.id).pipe(
                catchError(err => {
                    this.izi.error('Problem occured during retriving data');
                    this.router.navigate(['/']);
                    return of(null);
                })
            )
        }
}