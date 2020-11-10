import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Gun } from '../_models/gun';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-gun-detail',
  templateUrl: './gun-detail.component.html',
  styleUrls: ['./gun-detail.component.scss']
})
export class GunDetailComponent implements OnInit {

  gun: Gun;
  
  constructor(private route: ActivatedRoute, private izi: IziAlertService,
    private router: Router) { }

  ngOnInit() {

    this.route.data.subscribe((res: any) => 
    {
      this.gun = res.gun.gun[0];
      console.log(res);
    }, (err) => {
      this.izi.error('Cant retrieve data!');
      this.router.navigate(['/search']);
    });
  }

}
