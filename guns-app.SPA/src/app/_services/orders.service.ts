import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRecord } from '../_models/orderrecord';
import { AuthService } from './auth.service';
import * as env from '../../environments/environment';
import { map } from 'rxjs/operators';
import { OrderItemDto } from '../_models/Dtos/orderItemDto';
import { OrderItemToDeleteDto } from '../_models/Dtos/orderItemToDeleteDto';

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
          
          //res = res[0];
          res.total = 0;
          res.endDate = res.endDate.split('T')[0] + ' ' + res.endDate.split('T')[1].split('.')[0];
          res.startDate = res.startDate.split('T')[0] + ' ' + res.startDate.split('T')[1].split('.')[0];

          res.orderItem.forEach(el => 
          {
            el.price = el.item.price;
            el.name = el.item.name;
            el.total = parseFloat(el.price) * parseInt(el.quantity);
            res.total += el.total;
            console.log(el.total);
            delete el.item;
          })

          //delete res.user;
          //res.total = res.orderItem.reduce((a,b) => parseFloat(a.total) + parseFloat(b.total), 0);
          console.log(res);
          return res;

        })
      )
  }

  getBasket()
  {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(env.environment.trueBackUrl + 'basket/', {headers})
      .pipe(
        map((res:any) => 
        {
          console.log('Koszyk wziety')
          delete res.basket.startDate;
          delete res.basket.endDate;
          delete res.basket.status;
          return res.basket;
        })
      )
  }

  addItemToBasket(body: OrderItemDto)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env.environment.trueBackUrl + 'order-item/', body, {headers})
  }

  deleteItemFromBasket(orderItemId: string)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(env.environment.trueBackUrl + `basket/order-item?id=${orderItemId}`, {headers: headers});  
  }

  saveTinyBasketChange(quantity: string, orderItemId: string)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(env.environment.trueBackUrl + `basket/order-item?qty=${quantity}&orderItemId=${orderItemId}`, {headers});
  }

}
