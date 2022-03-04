import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOneRangeDialogComponent } from './select-one-range-dialog.component';

describe('SelectOneRangeDialogComponent', () => {
  let component: SelectOneRangeDialogComponent;
  let fixture: ComponentFixture<SelectOneRangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOneRangeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOneRangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
