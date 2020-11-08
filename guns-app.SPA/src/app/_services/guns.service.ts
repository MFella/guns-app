import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getSpecGuns(model: any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.backUrl}/specific`, model, {headers: headers});
  }

}
