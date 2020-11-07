/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GunsService } from './guns.service';

describe('Service: Guns', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GunsService]
    });
  });

  it('should ...', inject([GunsService], (service: GunsService) => {
    expect(service).toBeTruthy();
  }));
});
