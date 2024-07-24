import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyautComponent } from './loyaut.component';

describe('LoyautComponent', () => {
  let component: LoyautComponent;
  let fixture: ComponentFixture<LoyautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoyautComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
