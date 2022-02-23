import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeListComponent } from './shooting-range-list.component';

describe('ShootingRangeListComponent', () => {
  let component: ShootingRangeListComponent;
  let fixture: ComponentFixture<ShootingRangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
