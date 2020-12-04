import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRecord } from '../_models/orderrecord';
import { AuthService } from './auth.service';
import * as env from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

constructor(private http: HttpClient, private authServ: AuthService) { }




  getAllOrders()
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(env.environment.trueBackUrl + 'order-list', {headers})
      .pipe(
        map((res: Array<any>) => 
          {
            let i = 0;
            let ordersReduces: OrderRecord[] = [];

            for(const el of res)
            {
              ordersReduces[i] = {id: "0", startDate: "22-02-2001", total: "0"};
              ordersReduces[i].id = el._id;
              ordersReduces[i].startDate = el.startDate.split('T')[0] + ' ' + el.startDate.split('T')[1].split('.')[0];
              ordersReduces[i].total = (el.total === undefined? "0" : el.total);
              i++;
            }

            return ordersReduces;

          })
      )

  }

  getSingleOrder(object_id: string)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(env.environment.trueBackUrl + `order-list/${object_id}`, {headers})
      .pipe(
        map((res:any) => {
          
          res = res[0];
          res.endDate = res.endDate.split('T')[0] + ' ' + res.endDate.split('T')[1].split('.')[0];
          res.startDate = res.startDate.split('T')[0] + ' ' + res.startDate.split('T')[1].split('.')[0];
          delete res.user;

          return res;

        })
      )
  }



}
