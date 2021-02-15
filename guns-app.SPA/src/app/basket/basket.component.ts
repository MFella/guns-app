import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Basket } from '../_models/basket';
import { IziAlertService } from '../_services/iziAlert.service';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  curr_delivery: string = '';
  curr_payment: string = '';

  constructor(private route: ActivatedRoute, private ordersServ: OrdersService,
      private izi: IziAlertService) { }

  userBasket: Basket


  ngOnInit() {

    this.route.data.subscribe((res) => 
    {
      this.userBasket = res.basket;
    })
  }

  changeBack(e: Event, type: string)
  {
    console.log(type);
    console.log(e.target);
    this.curr_payment = type;

    const green  = 'rgb(72, 219, 91)';
    const gray = 'rgba(0,0,0,.15)';
    switch(type){
      case 'online':
        (<HTMLElement>document.querySelector('label.online')).style.backgroundColor = green;
        (<HTMLElement>document.querySelector('label.debet')).style.backgroundColor = gray;
        (<HTMLElement>document.querySelector('label.cash')).style.backgroundColor = gray;
        (<HTMLElement>document.querySelector('label.paysafe')).style.backgroundColor = gray;
        break;
      case 'paysafe':
          (<HTMLElement>document.querySelector('label.online')).style.backgroundColor = gray;
          (<HTMLElement>document.querySelector('label.debet')).style.backgroundColor = gray;
          (<HTMLElement>document.querySelector('label.cash')).style.backgroundColor = gray;
          (<HTMLElement>document.querySelector('label.paysafe')).style.backgroundColor = green;
        break;
      case 'cash':
          (<HTMLElement>document.querySelector('label.online')).style.backgroundColor = gray;
          (<HTMLElement>document.querySelector('label.debet')).style.backgroundColor = gray;
          (<HTMLElement>document.querySelector('label.cash')).style.backgroundColor = green;
          (<HTMLElement>document.querySelector('label.paysafe')).style.backgroundColor = gray;
      break;
      case 'debet':
        (<HTMLElement>document.querySelector('label.online')).style.backgroundColor = gray;
        (<HTMLElement>document.querySelector('label.debet')).style.backgroundColor = green;
        (<HTMLElement>document.querySelector('label.cash')).style.backgroundColor = gray;
        (<HTMLElement>document.querySelector('label.paysafe')).style.backgroundColor = gray;
      break;
    }
  }

  changeForDelivery(e: Event, type: string)
  {

    const green  = 'rgb(72, 219, 91)';
    //const gray = 'rgba(0,0,0,.15)';
    this.curr_delivery = type;

    switch(type)
    {
      case 'registered':
        (<HTMLElement>document.querySelector('.delivery_cont.registered')).style.backgroundColor = green;
        (<HTMLElement>document.querySelector('.delivery_cont.pickup')).style.backgroundColor = "#ffffff";
        (<HTMLElement>document.querySelector('.delivery_cont.locker')).style.backgroundColor = "#ffffff";
      break;
      case 'pickup':
        (<HTMLElement>document.querySelector('.delivery_cont.registered')).style.backgroundColor = "#ffffff";
        (<HTMLElement>document.querySelector('.delivery_cont.pickup')).style.backgroundColor = green;
        (<HTMLElement>document.querySelector('.delivery_cont.locker')).style.backgroundColor = "#ffffff";
      break;
      case 'locker':
        (<HTMLElement>document.querySelector('.delivery_cont.registered')).style.backgroundColor = "#ffffff";
        (<HTMLElement>document.querySelector('.delivery_cont.pickup')).style.backgroundColor = "#ffffff";
        (<HTMLElement>document.querySelector('.delivery_cont.locker')).style.backgroundColor = green;
      break;
    }
  }

  deleteItem(id: string)
  {
    this.izi.question("Wanna delete this product from basket?", () =>
    {

      this.ordersServ.deleteItemFromBasket(id)
        .subscribe((res: any) =>
          {

            if(res.res)
            { 
              this.izi.success(res.msg);
              this.userBasket.orderItem = this.userBasket.orderItem.filter(x => x.item._id !== id);

              let newTotal = 0;
              this.userBasket.orderItem.forEach(el =>
              {
                newTotal += parseFloat(el.item.price) * el.quantity;
              });

              
              this.userBasket.total = newTotal.toString();
            }

            //  delete from html

          }, err =>
          {
            this.izi.error('Error occured during deleting item');
            console.log(err);
          })


    });
  }

  saveTinyChange(quantity: string, orderItemId: string)
  {

    this.ordersServ.updateOrderItemQuantity(quantity, orderItemId)
      .subscribe((res: any) =>
      {
        if(res.res)
        {
          this.izi.success(res.msg);
          //recalculate total
          let summy = 0;
          this.userBasket.orderItem.forEach(el =>
          {
            summy += el.quantity * parseFloat(el.item.price);
          });

          summy = Math.round(summy*100)/100;
          
          this.userBasket.total = summy.toString();

        }else {
          this.izi.error(res.msg);
        }

      }, err =>
      {
        this.izi.error('Error occured during changing quantity');
      })

    
  }

}
