import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifeCategorieComponent } from './ajout-modife-categorie.component';

describe('AjoutModifeProduitComponent', () => {
  let component: AjoutModifeCategorieComponent;
  let fixture: ComponentFixture<AjoutModifeCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutModifeCategorieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutModifeCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
