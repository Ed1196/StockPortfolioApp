import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransactionsComponent } from './stock-transactions.component';

describe('StockTransactionsComponent', () => {
  let component: StockTransactionsComponent;
  let fixture: ComponentFixture<StockTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
