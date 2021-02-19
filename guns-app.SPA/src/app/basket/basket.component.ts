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
  primitiveB: Basket;

  ngOnInit() {

    this.route.data.subscribe((res) => 
    {
      console.log(res.basket);
      this.userBasket = res.basket;
      this.primitiveB = Object.assign({}, res.basket);

      this.changeBack(res.basket.typeOfPayment);
      this.changeForDelivery(res.basket.typeOfDelivery);
      (<any>document.querySelector(`#${res.basket.typeOfPayment}`)).checked = true;
      (<any>document.querySelector(`#${res.basket.typeOfDelivery}`)).checked = true;

    })
  }

  public changeBack(type: string)
  {
    this.curr_payment = type;
    this.userBasket.typeOfPayment = type;

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

  changeForDelivery(type: string)
  {

    const green  = 'rgb(72, 219, 91)';
    this.curr_delivery = type;
    this.userBasket.typeOfDelivery = type;

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

  toggleSave(index: number, e: any)
  {
    this.userBasket.orderItem[index].quantity = parseInt(e.target.value);
    (<any>document.querySelectorAll('.btn_update')[index]).disabled = false;
  }

  saveTinyChange(quantity: string, orderItemId: string, whichOne: number)
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
          
          (<any>document.querySelectorAll('.btn_update')[whichOne]).disabled = true;


        }else {
          this.izi.error(res.msg);
        }

      }, err =>
      {
        this.izi.error('Error occured during changing quantity');
      })
  }

  saveAllChanges()
  {

    this.ordersServ.updateBasket(this.userBasket)
      .subscribe((res: any) =>
      {
        if(res.res)
        {
          //this.primitiveB = Object.assign({}, this.userBasket)
          this.izi.success(res.msg);
        }

        console.log(res);

      }, (err) =>
      {
        this.izi.error(err);
      })

  }

  checkDiss(index: number)
  {
    return this.userBasket.orderItem[index].quantity === this.primitiveB.orderItem[index].quantity
  }

  // checkTinyChange(index: number, e: any)
  // {
  //   this.userBasket.orderItem[index].quantity = parseInt(e.target.value);
  //   return JSON.stringify(this.userBasket.orderItem[index].quantity) === JSON.stringify(this.primitiveB.orderItem[index].quantity);
  // }

  // disableAllChanges()
  // {

  //   return JSON.stringify(this.userBasket) === JSON.stringify(this.primitiveB);
  // }

}
