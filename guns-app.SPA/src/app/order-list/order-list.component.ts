import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRecordView } from '../_models/orderRecordView';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  orderList: Array<OrderRecordView>;
  

  ngOnInit() {

    this.route.data.subscribe((res: any) => 
    {
      this.orderList = res.orders;
      console.log(this.orderList);
    })

  }

}
