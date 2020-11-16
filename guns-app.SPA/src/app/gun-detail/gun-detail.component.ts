import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Gun } from '../_models/gun';
import { AuthService } from '../_services/auth.service';
import { GunsService } from '../_services/guns.service';
import { IziAlertService } from '../_services/iziAlert.service';
import {Comment} from '../_models/comment';
declare const stopCarousel: any;

@Component({
  selector: 'app-gun-detail',
  templateUrl: './gun-detail.component.html',
  styleUrls: ['./gun-detail.component.scss']
})
export class GunDetailComponent implements OnInit {

  gun: Gun;
  rate: number = 0;
  avg_rate: number = 0;
  afterParse: number = 0;
  native_curr: string = '';
  content: any = '';
  stars = new Array(5).fill(false);

  constructor(private route: ActivatedRoute, private izi: IziAlertService,
    private router: Router, public authServ: AuthService, private gunsServ: GunsService) { }

  ngOnInit() {
    stopCarousel();

    this.route.data.subscribe((res: any) => 
    {
      this.gun = res.gun[0];
      this.native_curr = localStorage.getItem('currentRate');
      console.log(localStorage.getItem('currentRate'));

      this.afterParse = ((+parseFloat(localStorage.getItem('currentRateValue')).toFixed(2))
      *(+parseFloat(this.gun.price.toString()).toFixed(2)));
      this.afterParse = +parseFloat(this.afterParse.toString()).toFixed(2);

      this.gun.comments.forEach((el,index) => 
      {
        this.avg_rate += parseFloat(el.rating);
      })
      this.avg_rate = Math.floor(this.avg_rate/this.gun.comments.length);

      this.setStarsColor(this.avg_rate);
    }, (err) => {
      this.izi.error('Cant retrieve data!');
      this.router.navigate(['/search']);
    });
  }

  changeMain(e: any)
  {
    (<any>document.querySelector('.img_main')).src = e.target.src;
  }

  letShine(i: number)
  {
    console.log(this.rate);
    this.rate = (i+1);
    let stars = <NodeListOf<HTMLElement>>document.querySelectorAll('i.fa.fa-star.comment');
    
    stars.forEach((el, index, arr) => //(index-1)<i ? el.style.color = 'yellow' : 'black');
    {
      if(index-1 < i)
      {
        el.style.color = 'yellow';

      } else el.style.color = 'black';
    })
  }

  addComment()
  {
    const comm: Comment = {
      rating: this.rate.toString(),
      date: new Date(),
      remarker: this.authServ.currentUser.name + ' ' + this.authServ.currentUser.surname,
      content: this.content
    };

    this.gunsServ.commentGun(comm, this.gun._id)
      .subscribe((res) =>
      {
        
        this.izi.success('Your comment has been added!;)');
        this.gun.comments.push(comm);
        this.resetCommentsField();
        
        this.avg_rate = 0;
        this.gun.comments.forEach((el,index) => 
        {
          this.avg_rate += parseFloat(el.rating);
        })
        this.avg_rate = Math.floor(this.avg_rate/this.gun.comments.length);
  
        this.setStarsColor(this.avg_rate);
      }, (err) =>
      {
        this.izi.error('Cannot add this comment'); 
      });
  }

  resetCommentsField()
  {
    this.rate = 0;
    this.content = '';
    (<NodeListOf<HTMLElement>>document.querySelectorAll('i.fa.fa-star.comment'))
      .forEach(el => el.style.color = 'black');
  }

  setStarsColor(i: number)
  {
    const stars = <NodeListOf<HTMLElement>>document.querySelectorAll('.fa.fa-star.head');
    stars.forEach((el,index) =>{

      if((index) < i)
      {
        (<HTMLElement>el).style.color = 'yellow';
      } else
      {
        (<HTMLElement>el).style.color = 'black';
      }
    })
  
  }

}
