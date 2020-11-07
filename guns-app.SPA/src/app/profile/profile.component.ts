import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public izi: IziAlertService, public authServ: AuthService) { }

  ngOnInit() {
    console.log(this.authServ.currentUser);
  }

}
