import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public authServ: AuthService) { }

  ngOnInit(): void {
    console.log(this.authServ.isLoggedIn());
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

}
