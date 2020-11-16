import { Component, Input, OnInit, Output } from '@angular/core';
import { Gun } from 'src/app/_models/gun';
import { GunsService } from 'src/app/_services/guns.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() gun: Gun;
  @Input() receivedRate;
  priceAfterParsing: number;
  currency_code: string;

  constructor(private gunServ: GunsService) { }

  ngOnInit() {
    //basic setup - horrible parsin
    this.currency_code = localStorage.getItem('currentRate');
    this.priceAfterParsing = +parseFloat(localStorage.getItem('currentRateValue')).toFixed(2);
    this.priceAfterParsing = this.priceAfterParsing * this.gun.price;
    this.priceAfterParsing = +parseFloat(this.priceAfterParsing.toString()).toFixed(2);

    this.gunServ.emitRate.subscribe(
      (rate: Array<string>) => 
      {
        if(rate !== null)
        {
          this.currency_code = rate[0];
          this.receivedRate = rate[1];
          this.priceAfterParsing = this.gun.price * this.receivedRate;
          this.priceAfterParsing = +parseFloat(this.priceAfterParsing.toString()).toFixed(2);
        }
      }
    )
  }


}
