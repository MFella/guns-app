import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GunsService } from '../_services/guns.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends GunsService{

  private envUrl = '/api/settings';
  private configSettings: any = null;

 // constructor() { }

  get settings()
  {
    return this.configSettings;
  }

  public load(): Promise<any>{

    return this.getCurrs().toPromise();
  }


}
