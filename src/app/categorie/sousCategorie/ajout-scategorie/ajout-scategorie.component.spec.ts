import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutScategorieComponent } from './ajout-scategorie.component';

describe('AjoutScategorieComponent', () => {
  let component: AjoutScategorieComponent;
  let fixture: ComponentFixture<AjoutScategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutScategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutScategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
