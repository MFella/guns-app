import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Gun } from '../_models/gun';
import { AuthService } from '../_services/auth.service';
import { IziAlertService } from '../_services/iziAlert.service';

declare const stopCarousel: any;

@Component({
  selector: 'app-gun-detail',
  templateUrl: './gun-detail.component.html',
  styleUrls: ['./gun-detail.component.scss']
})
export class GunDetailComponent implements OnInit {

  gun: Gun;
  
  constructor(private route: ActivatedRoute, private izi: IziAlertService,
    private router: Router, public authServ: AuthService) { }

  ngOnInit() {
    stopCarousel();

    this.route.data.subscribe((res: any) => 
    {
      this.gun = res.gun.gun[0];
      console.log(res);
    }, (err) => {
      this.izi.error('Cant retrieve data!');
      this.router.navigate(['/search']);
    });
  }

  changeMain(e: any)
  {
    (<any>document.querySelector('.img_main')).src = e.target.src;
  }

}
