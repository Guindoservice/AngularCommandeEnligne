import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProduitComponent } from './confirm-produit.component';

describe('ConfirmProduitComponent', () => {
  let component: ConfirmProduitComponent;
  let fixture: ComponentFixture<ConfirmProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
