import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizencardComponent } from './citizencard.component';

describe('CitizencardComponent', () => {
  let component: CitizencardComponent;
  let fixture: ComponentFixture<CitizencardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizencardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizencardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
