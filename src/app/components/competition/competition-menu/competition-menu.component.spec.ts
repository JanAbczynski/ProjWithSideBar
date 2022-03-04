import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionMenuComponent } from './competition-menu.component';

describe('CompetitionMenuComponent', () => {
  let component: CompetitionMenuComponent;
  let fixture: ComponentFixture<CompetitionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
