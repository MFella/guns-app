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

  models: Array<string> = ['0', '1000', 'Shotgun', ''];
  guns: Array<Gun> = [];

  constructor(private route: ActivatedRoute, private gunServ: GunsService,
    private izi: IziAlertService) { }

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      console.log(res);
      this.guns = res.gun.guns.slice(7,13);
    })
  }

  retrieveItems()
  {
      //get specific guns: price range, category, etc


  }

}
