import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPsideBarComponent } from './tpside-bar.component';

describe('TPsideBarComponent', () => {
  let component: TPsideBarComponent;
  let fixture: ComponentFixture<TPsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPsideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
