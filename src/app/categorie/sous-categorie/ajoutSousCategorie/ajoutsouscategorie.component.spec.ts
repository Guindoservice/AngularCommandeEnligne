import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSousCategorieComponent } from './ajoutsouscategorie.component';

describe('AjoutModifeProduitComponent', () => {
  let component: AjoutSousCategorieComponent;
  let fixture: ComponentFixture<AjoutSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSousCategorieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
