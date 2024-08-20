import { TestBed } from '@angular/core/testing';

import { SecuritesService } from './securites.service';

describe('SecuritesService', () => {
  let service: SecuritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
