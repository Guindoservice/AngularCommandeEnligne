import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutLivraisonComponent } from './ajoutLivraison.component';

describe('AjoutModifeProduitComponent', () => {
  let component: AjoutLivraisonComponent;
  let fixture: ComponentFixture<AjoutLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutLivraisonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
