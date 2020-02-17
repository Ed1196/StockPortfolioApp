import { StockModel } from './../shared/models/stock.model';
import { StockService } from './../shared/dbAccess/stock.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  panelOpenState = false;
  @Input() stock: string

  stockData: StockModel;

  constructor(private stockService:StockService) {

   }

  ngOnInit() {
      this.stockData = new StockModel
  }

  async panelWasOpen(stock: string){
    this.panelOpenState = true;
    await  this.stockService.getStockInfo(this.stock).subscribe((data: StockModel) => {
    this.stockData = data

    })
  }

  //Class StockService and function purchaseStock 
  purchase(quantity:number) {
    this.stockService.purchaseStock(quantity, this.stockData['close'], this.stockData['symbol'])
      .subscribe((data:any) => { console.log(data)})
  }

}
