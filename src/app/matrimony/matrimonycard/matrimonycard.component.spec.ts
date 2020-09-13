import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrimonycardComponent } from './matrimonycard.component';

describe('MatrimonycardComponent', () => {
  let component: MatrimonycardComponent;
  let fixture: ComponentFixture<MatrimonycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrimonycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
