import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRecord } from '../_models/orderrecord';
import { AuthService } from './auth.service';
import * as env from '../../environments/environment';
import { map } from 'rxjs/operators';
import { OrderItemDto } from '../_models/Dtos/orderItemDto';
import { OrderItemToDeleteDto } from '../_models/Dtos/orderItemToDeleteDto';
import { Basket } from '../_models/basket';
import { BasketLikeDto } from '../_models/basketLikeDto.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

constructor(private http: HttpClient, private authServ: AuthService) { }




  getAllOrders(pageNumber: number, pageSize: number)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(env.environment.trueBackUrl + `order-list?pageNumber=${pageNumber}&pageSize=${pageSize}`, {headers})
      .pipe(
        map((res: any) => 
          {
            let i = 0;
            let ordersReduces: OrderRecord[] = [];
            console.log(res.orders);

            for(const el of res.orders)
            {
              ordersReduces[i] = {id: "0", startDate: "22-02-2001", total: "0"};
              ordersReduces[i].id = el._id;
              ordersReduces[i].startDate = el.startDate.split('T')[0] + ' ' + el.startDate.split('T')[1].split('.')[0];
              ordersReduces[i].total = (el.total === undefined? "0" : el.total);
              i++;
            }

            console.log("XD");
            return [ordersReduces, res.pagination];

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
          res.endDate = res.endDate.split('T')[0] + ' ' + res.endDate.split('T')[1].split('.')[0];
          res.startDate = res.startDate.split('T')[0] + ' ' + res.startDate.split('T')[1].split('.')[0];

          res.orderItem.forEach(el => 
          {
            el.price = el.item.price;
            el.name = el.item.name;
            el.total = parseFloat(el.price) * parseInt(el.quantity);
            //res.total += el.total;
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

  updateOrderItemQuantity(quantity: string, orderItemId: string)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(env.environment.trueBackUrl + `basket/order-item?qty=${quantity}&orderItemId=${orderItemId}`, {headers});
  }

  updateBasket(basket: Basket)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let summy = 0;
    basket.orderItem.forEach(el =>
    {
      summy += el.quantity * parseFloat(el.item.price);
    });

    summy = Math.round(summy*100)/100;
    
    basket.total = summy.toString();

    return this.http.put(env.environment.trueBackUrl + `basket/wholeUpdate`, basket, {headers});
  }

  basketBecomeOrder(basketLike: BasketLikeDto)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(env.environment.trueBackUrl + 'basket/', basketLike, {headers});


  }

}
