import { Injectable } from '@angular/core';
import { NgxIzitoastService } from 'ngx-izitoast';

@Injectable({
  providedIn: 'root'
})
export class IziAlertService {

constructor(public iziToast: NgxIzitoastService) { }

  info(message: string)
  {
    this.iziToast.success({
      title: 'INFO',
      message
  });
 }

  success(message: string)
  {

    this.iziToast.success({
      title: 'OK',
      message,
  });

  }

  warning(message: string)
  {
    this.iziToast.warning({
      title: 'Caution',
      message
  });

  }

  error(message: string)
  {
    this.iziToast.error({
      title: 'Error',
      message
  });

  }

  question(message: string, callback: () => void): boolean
  {

    return <boolean>this.iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      id: 'question',
      title: 'Are you sure',
      message: message,
      position: 'center',
      buttons: [
        ['<button><b>YES</b></button>', function (instance, toast) {
 
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          console.log("DASDASDAS")
          callback();

        }, true],
        ['<button>NO</button>', function (instance, toast) {
 
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          return false;

        }],
      ],
      onClosing: () =>
      {
        return false;
      }
    })
  }

}
