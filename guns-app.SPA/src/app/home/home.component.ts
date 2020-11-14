import { style, transition } from '@angular/animations';
//import{ setInterval, clearInterval} from 'timers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {changeQuote} from '../helpers/help';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public authServ: AuthService, private route: ActivatedRoute) { }
  quotes: Array<Array<string>>;
  homeInterval: any;


  ngOnInit(): void {
    console.log(this.authServ.currentUser);

    this.homeInterval = setInterval(changeQuote, 10000);
  }

  gunsEnter()
  {
    let left_gun = document.querySelector('.gun_l');
    let right_gun = document.querySelector('.gun_r');
    if(left_gun.getAnimations().length === 0)
    {
      left_gun.animate([
        {transform: 'translateX(0px)'},
        {transform: 'translateX(-20px)'},
        {transform: 'translateX(-40px)'},
        {transform: 'translateX(-20px)'},
        {transform: 'translateX(0px)'}
      ],{
        duration: 550,
        iterations: 1
      });

      right_gun.animate([
        {transform: 'translateX(0px) scaleX(-1)'},
        {transform: 'translateX(20px) scaleX(-1)'},
        {transform: 'translateX(40px) scaleX(-1)'},
        {transform: 'translateX(20px) scaleX(-1)'},
        {transform: 'translateX(0px) scaleX(-1)'}
      ],{
        duration: 550,
        iterations: 1
      });
    }
  }

  ngOnDestroy()
  {
    window.clearInterval(this.homeInterval);
  }

} 
