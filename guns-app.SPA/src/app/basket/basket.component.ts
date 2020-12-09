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

}
