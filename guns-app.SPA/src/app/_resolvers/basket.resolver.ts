import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gun } from '../_models/gun';
import { Order } from '../_models/order';
import { GunsService } from '../_services/guns.service';
import { IziAlertService } from '../_services/iziAlert.service';
import { OrdersService } from '../_services/orders.service';

@Injectable()
export class BasketResolver implements Resolve<Order> {

    pageNo = 1;
    pageSize = 5;

    constructor(private ordersServ: OrdersService, private router: Router
        , private izi: IziAlertService){}

        resolve(route: ActivatedRouteSnapshot): Observable<Order>
        {
            return this.ordersServ.getBasket().pipe(
                catchError(err => {
                    this.izi.error('Problem occured during retriving data');
                    console.log(err);
                    this.router.navigate(['/']);
                    return of(null);
                })
            )
        }
}