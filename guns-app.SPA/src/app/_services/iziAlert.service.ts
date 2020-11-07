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


}
