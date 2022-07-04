import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeViewComponent } from './shooting-range-view.component';

describe('ShootingRangeViewComponent', () => {
  let component: ShootingRangeViewComponent;
  let fixture: ComponentFixture<ShootingRangeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
