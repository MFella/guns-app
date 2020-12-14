import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Basket } from '../_models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  userBasket:Basket


  ngOnInit() {

    this.route.data.subscribe((res) => 
    {

      this.userBasket = res.basket;
      console.log(this.userBasket.orderItem.length);
    })
  }

  changeBack(e: Event, type: string)
  {
    console.log(type);
    console.log(e.target);

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
      default:
        console.log('dasdasd');
    }
  }

}
