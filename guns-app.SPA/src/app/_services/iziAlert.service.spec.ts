/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IziAlertService } from './iziAlert.service';

describe('Service: IziAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IziAlertService]
    });
  });

  it('should ...', inject([IziAlertService], (service: IziAlertService) => {
    expect(service).toBeTruthy();
  }));
});
