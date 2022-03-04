import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeDialogComponent } from './shooting-range-dialog.component';

describe('ShootingRangeDialogComponent', () => {
  let component: ShootingRangeDialogComponent;
  let fixture: ComponentFixture<ShootingRangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
