import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateListComponent } from './mate-list.component';

describe('MateListComponent', () => {
  let component: MateListComponent;
  let fixture: ComponentFixture<MateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
