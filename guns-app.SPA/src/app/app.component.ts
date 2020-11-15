import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { slider, imFaded} from './route-animations';
import {fadeIn, fadeOut} from './helpers/help';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //slider,
    //fader
    imFaded
  ]
})
export class AppComponent {
  title = 'guns-app';
  currencies: Map<string, string>;


  prepareRoute(outlet: RouterOutlet)
  {
    // let temp = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    // let arrows = (document.querySelectorAll('.arrows'));

    // switch(temp)
    // {
    //   case 'isLeft':
    //     (<HTMLElement>arrows[1]).style.display = 'block';
    //     //$('.arr_l').fadeOut();
    //     (<HTMLElement>arrows[0]).style.display = 'none';
        
    //     break;
    //   case 'isRight':
    //    // $('.arr_r').fadeOut();
    //    // $('.arr_l').fadeIn();
    //    (<HTMLElement>arrows[1]).style.display = 'none';
    //    (<HTMLElement>arrows[0]).style.display = 'block';
    //     break;
    //   case 'home':
    //     //$('.arr_r').fadeIn();
    //     //$('.arr_l').fadeIn();
    //     (<HTMLElement>arrows[1]).style.display = 'none';
    //     (<HTMLElement>arrows[0]).style.display = 'none';
    //     default:
    //     console.log('Something lese');
    // }

    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

