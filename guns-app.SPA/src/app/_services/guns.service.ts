import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit, Output } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Comment} from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class GunsService {

  backUrl: string = `http://localhost:3000/guns`;
  rates: string = localStorage.getItem('rates');
  myRate: string;
  public emitRate = new BehaviorSubject<Array<string>>(null);

  constructor(private http: HttpClient) { 
    //good way?

    this.rates = JSON.parse(localStorage.getItem('rates'));
    this.myRate = localStorage.getItem('currentRate');
  }

  getAllGuns()
  {
    return this.http.get(`${this.backUrl}/all`);
  }

  getSpecGuns(model: any, pageNumber: string, pageSize: string)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    console.log('get spec')
    return this.http.post(`${this.backUrl}/specific`, model, {params} );
  }

  getGunByName(name: string)
  {
    let params = new HttpParams();
    params = params.append('name', name);
    return this.http.get(`${this.backUrl}/detail`, {params})
      // .pipe(
      //   map((res: any) => {
      //     return {complete : res.body.gun.complete, gun: res.body.gun.gun[0]};
      //   })
      // )
  }

  commentGun(comment: Comment, id: string)
  {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(`http://localhost:3000/comment/create`, comment, {params});
  }

  getCurrs()
  {
    return this.http.get(`http://localhost:3000/currencyrate`)
      .pipe(
        map((res: any) => 
        {
          console.log(res);
          if(res.success && res.data[0] !== undefined)
          {
            return {rates: res.data[0].rates[0]};
          }
          else
          {
            //throw new Error("WTF error");
            window.location.reload();
          }
        })
      )
  }

  saveNewCurr()
  {
   // return this.http.post(`http://localhost:3000/currencyrate/update`);
  }

}
