import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradecardComponent } from './tradecard.component';

describe('TradecardComponent', () => {
  let component: TradecardComponent;
  let fixture: ComponentFixture<TradecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
