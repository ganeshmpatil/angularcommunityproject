import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrimonyHomeComponent } from './matrimony-home.component';

describe('MatrimonyHomeComponent', () => {
  let component: MatrimonyHomeComponent;
  let fixture: ComponentFixture<MatrimonyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrimonyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrimonyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
