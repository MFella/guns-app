import { Component, OnInit } from '@angular/core';
import { IziAlertService } from '../_services/iziAlert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public izi: IziAlertService) { }

  ngOnInit() {
  }

}
