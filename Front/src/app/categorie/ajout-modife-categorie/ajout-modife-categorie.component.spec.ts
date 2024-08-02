import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifeProduitComponent } from './ajout-modife-categorie.component';

describe('AjoutModifeProduitComponent', () => {
  let component: AjoutModifeProduitComponent;
  let fixture: ComponentFixture<AjoutModifeProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutModifeProduitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutModifeProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
