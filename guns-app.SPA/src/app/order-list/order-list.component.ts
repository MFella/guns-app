import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRecordView } from '../_models/orderRecordView';
import { Pagination } from '../_models/pagination';
import { IziAlertService } from '../_services/iziAlert.service';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderServ: OrdersService,
    private izi: IziAlertService) { }

  orderList: Array<OrderRecordView>;
  pagination!: Pagination;

  ngOnInit() {


    // this.pagination = {
    //   currentPage: 1,
    //   itemsPerPage: 4, 
    //   totalItems: 20, 
    //   totalPages: 3
    // }

    this.route.data.subscribe((res: any) => 
    {
      console.log(res);
      this.orderList = res.orders[0];
      this.pagination = res.orders[1];
      console.log(this.orderList);
    })

  }

  pageChanged(e: any)
  {
    console.log(e);

    this.orderServ.getAllOrders(e.page, e.itemsPerPage)
    .subscribe((res: any) =>
    {
      console.log(res);
      this.orderList = res[0];
      this.pagination = res[1];

    }, err =>
    {
      this.izi.error(err);
    })

  }

}
