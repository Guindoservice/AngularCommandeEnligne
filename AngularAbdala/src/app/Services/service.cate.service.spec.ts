import { TestBed } from '@angular/core/testing';

import { ServiceCateService } from './service.cate.service';

describe('ServiceCateService', () => {
  let service: ServiceCateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
