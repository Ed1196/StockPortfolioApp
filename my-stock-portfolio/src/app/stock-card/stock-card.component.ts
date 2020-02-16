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

  purchase(quantity:number) {
    console.log(this.stockData['close'])
    this.stockService.purchaseStock(quantity, this.stockData['close'], "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzZTllYThmNzNkZWExMTRkZWI5YTY0OTcxZDJhMjkzN2QwYzY3YWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktc3RvY2stcG9ydGZvbGlvLWRiIiwiYXVkIjoibXktc3RvY2stcG9ydGZvbGlvLWRiIiwiYXV0aF90aW1lIjoxNTgxODM0OTE2LCJ1c2VyX2lkIjoiZXc5T2Q2OWJGTGRNbVBwSjd1eFVjdGJBMXE0MyIsInN1YiI6ImV3OU9kNjliRkxkTW1QcEo3dXhVY3RiQTFxNDMiLCJpYXQiOjE1ODE4MzQ5MTYsImV4cCI6MTU4MTgzODUxNiwiZW1haWwiOiJlZHdpbnExNDk2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlZHdpbnExNDk2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ywUgiE9mHDD3GcucgC-b7-XvCj7kvnS2wA2ZJuOQB-DAlBIlS73kpgrEc24FoWrJirxnCMW185z87Qj7xMRXT19YTNEnxWR2loa1UsJl7ONJP6HQABiCljr8-HH0JOnoIHMG6hOLpbpSIoTxWpxyWJ1VWQ9CtuiQLeHLPi7dlHvbECFm5t-9DJ1lHBNyAeH-g6UUTSVyy6vkHsCuGbLV6XGPjJSrBhl8AiHTwBm7yOXY8WiqUx_GnJqrXZZUQFXlIorCWQ5kJdQYeqUlLXIXmfOecKiyksaGMDE2iMk0G5G5e9yKd6itgzPTU2YF0h3YCTWqZcab6NhdsbJu-DCY8Q")
      .subscribe((data:any) => { console.log(data)})
  }

}
