import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivparametreComponent } from './livparametre.component';

describe('LivparametreComponent', () => {
  let component: LivparametreComponent;
  let fixture: ComponentFixture<LivparametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivparametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivparametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
