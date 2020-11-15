import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortPipe } from '../_pipes/short.pipe';
import { AuthService } from '../_services/auth.service';
import { GunsService } from '../_services/guns.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currs: Array<any> = [];

  constructor(private router: Router, public authServ: AuthService,
    public gunsServ: GunsService) { }

  ngOnInit(): void {
    let temper = Object.keys(this.gunsServ.rates).sort();

    this.currs = Object.assign(this.currs, temper);

  }


  toSearch()
  {
    const buttons = $('.navbar-nav > li');
    console.log(buttons);
    //(<HTMLOListElement>buttons[2])style.displat
    // tslint:disable-next-line: no-unused-expression

    //(<NodeListOf<HTMLElement>>document.querySelectorAll('.navbar-nav > li'))[2].style.display = 'none';
    //this.router.navigate(['/search']);
  }

  changeCurr(curr: string)
  {
    console.log(curr);
    this.gunsServ.myRate = curr;

    for(const [key, value] of Object.entries(this.gunsServ.rates))
    {
      if(key === curr)
      {
        localStorage.setItem('currentRate', curr);
        localStorage.setItem('currentRateValue', value);
      }
    }
  }

}
