import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { Gun } from '../_models/gun';
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

  models = {
    ceil: "999",
    floor: "0",
    category: "Shotgun",
    searchInput: ""
  };
  guns: Array<Gun> = [];

  constructor(private route: ActivatedRoute, private gunServ: GunsService,
    private izi: IziAlertService) { }

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      console.log(res);
      this.guns = res.gun.guns; //.slice(7,13);
      this.items = res.gun.guns;
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

      this.gunServ.getSpecGuns(this.models)
        .subscribe((res:any) => 
          {
            console.log(res);
            this.guns = res.guns;
            this.items = res.guns;
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


}
