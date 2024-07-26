import { TestBed } from '@angular/core/testing';

import { ProduitService } from './produits.service';

describe('ProduitsService', () => {
  let service: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
