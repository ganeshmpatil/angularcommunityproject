import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenregistryhomeComponent } from './citizenregistryhome.component';

describe('CitizenregistryhomeComponent', () => {
  let component: CitizenregistryhomeComponent;
  let fixture: ComponentFixture<CitizenregistryhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenregistryhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenregistryhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
