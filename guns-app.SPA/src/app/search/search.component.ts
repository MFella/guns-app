import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterOutlet } from '@angular/router';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Gun } from '../_models/gun';
import { Pagination } from '../_models/pagination';
import { GunsService } from '../_services/guns.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [RouterOutlet]
})
export class SearchComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  page = 1;
  currentPage = 4;
  smallnumPages = 0;
  rotate = true;
  maxSize = 5;
  pagination: Pagination;

  models = {
    ceil: "999",
    floor: "0",
    category: "",
    searchInput: ""
  };
  guns: Array<Gun> = [];

  constructor(private route: ActivatedRoute, private gunServ: GunsService,
    private izi: IziAlertService, private router: Router) { }

  ngOnInit(): void {

    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 12,
      totalPages: 3
    };

    this.route.data.subscribe((res:any) => {
      console.log(res);
      this.guns = res.gun.guns; //.slice(7,13);
      this.pageOfItems = this.guns.slice(0,3);
      this.items = res.gun.guns;
      this.pagination = res.gun.pag;
    })
  }

  retrieveItems()
  {
      //get specific guns: price range, category, etc
      // console.log(this.models);

      // const toSearch = {
      //   searchQuery: this.models,
      //   pageParams: {
      //     pageNo: 1,
      //     pageSize: 4
      //   }
      // }
      this.gunServ.getSpecGuns(this.models, this.pagination.currentPage.toString(), this.pagination.itemsPerPage.toString())
        .subscribe((res:any) => 
          {
            this.guns = res.guns;
            this.items = res.guns;
            this.pagination.totalItems = res.itemsCount;
          }, err => {
            
            this.izi.error('Error occured during retriving data');
          }, () => 
          {
            this.models.searchInput = '';
          })
  }


  onChangePage(pageOfItems: Array<Gun>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  pageChanged(e: any)
  {
    this.pagination.currentPage = e.page;
    this.pagination.itemsPerPage = e.itemsPerPage;

    //animation
    $('.renderGuns').fadeOut(500);
    $('pagination').css('pointer-events', 'none');

    setTimeout(() => {
      $('.renderGuns').fadeIn(200);
      $('pagination').delay(200).css('pointer-events', 'auto')
      this.retrieveItems();
    }, 450);
  }

  toDetails()
  {
    //this.router.navigate(['/name'],{relativeTo: this.route});
  }

}
