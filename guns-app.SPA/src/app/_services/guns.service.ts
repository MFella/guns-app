import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Comment} from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class GunsService {

  backUrl: string = `http://localhost:3000/guns`

constructor(private http: HttpClient) { }

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

}
