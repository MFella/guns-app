import { HttpClient } from '@angular/common/http';
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

}
