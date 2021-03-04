import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRecordView } from '../_models/orderRecordView';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  orderList: Array<OrderRecordView>;
  pagination!: Pagination;

  ngOnInit() {


    this.pagination = {
      currentPage: 1,
      itemsPerPage: 4, 
      totalItems: 20, 
      totalPages: 3
    }

    this.route.data.subscribe((res: any) => 
    {
      this.orderList = res.orders;
      console.log(this.orderList);
    })

  }

  pageChanged(e: any)
  {


  }

}
