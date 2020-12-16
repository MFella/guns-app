import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Basket } from '../_models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  curr_delivery: string = '';
  curr_payment: string = '';

  constructor(private route: ActivatedRoute) { }

  userBasket:Basket


  ngOnInit() {

    this.route.data.subscribe((res) => 
    {
      this.userBasket = res.basket;
      console.log(res);
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




}
