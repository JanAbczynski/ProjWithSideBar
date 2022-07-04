import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewStandComponent } from './crew-stand.component';

describe('CrewStandComponent', () => {
  let component: CrewStandComponent;
  let fixture: ComponentFixture<CrewStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewStandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
