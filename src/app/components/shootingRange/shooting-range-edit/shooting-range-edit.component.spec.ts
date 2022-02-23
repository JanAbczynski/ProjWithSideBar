import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeEditComponent } from './shooting-range-edit.component';

describe('ShootingRangeEditComponent', () => {
  let component: ShootingRangeEditComponent;
  let fixture: ComponentFixture<ShootingRangeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
