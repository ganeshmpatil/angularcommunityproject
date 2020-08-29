import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodHomeComponent } from './blood-home.component';

describe('BloodHomeComponent', () => {
  let component: BloodHomeComponent;
  let fixture: ComponentFixture<BloodHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
