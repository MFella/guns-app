import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../_models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.route.data.subscribe(
      (res: any) => 
      {
        this.order = res.order;   
        console.log('----------');
        console.log(this.order);
        console.log('----------');
      }
    )

  }

  showGunDetails(name: string)
  {
    this.router.navigate(['/search', name]);
  }

}
