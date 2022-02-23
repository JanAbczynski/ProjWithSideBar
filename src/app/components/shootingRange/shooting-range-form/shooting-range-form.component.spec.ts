import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeFormComponent } from './shooting-range-form.component';

describe('ShootingRangeFormComponent', () => {
  let component: ShootingRangeFormComponent;
  let fixture: ComponentFixture<ShootingRangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
