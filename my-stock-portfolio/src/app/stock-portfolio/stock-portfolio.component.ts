import { MaterialDashboardComponent } from './../material-dashboard/material-dashboard.component';
import { HomePageComponent } from './../home-page/home-page.component';
import { interval } from 'rxjs';
import { StockService } from './../shared/dbAccess/stock.service';
import { UserService } from './../shared/dbAccess/user.service';
import { Stock } from './../shared/models/user.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageEvent, MatSnackBar } from '@angular/material';





@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.css']
})
export class StockPortfolioComponent implements OnInit {
  @Input() card: any;
  @Input() userDetails: UserModel;
  total: number;
  @Output() outputToParent = new EventEmitter<UserModel>();
  isColor: string;
  pE: PageEvent

  start: number = 0
  end:number = 4

  currentUpdateState 


  constructor(private userService: UserService,
              private stockService: StockService,
              private _snackBar: MatSnackBar) {

    this.userDetails = new UserModel(),
    this.total = 0
    this.currentUpdateState = "All Stocks"

    interval(2*40000).subscribe ( x => {
      if(this.currentUpdateState == "All Stocks"){
        console.log("Retrieve Data for all stocks")
        this.getData()
      } else {
        console.log("Retrieve Data for current stocks")
        this.getCompactData()
      }
    })


  }

  ngOnInit() {
    
  }

  NotificationToParent(userDetails: UserModel) {
    this.outputToParent.emit(userDetails)
  }

  changeUpdateType() {
    if (this.currentUpdateState == "All Stocks") {
      this.currentUpdateState = "Current Four"
    } else {
      this.currentUpdateState = "All Stocks"
    }
  }

  loadData(event?:PageEvent){
 
    if (event.pageIndex > event.previousPageIndex){
      this.start = this.start + 4
      this.end = this.end + 4
    } else {
      this.start = this.start - 4
      this.end = this.end - 4
    }
  }

  getData(){
    if(this.userDetails.stocks.length > 0){
      this.stockService.updateStocks().subscribe((data) => {
        
        if(data['success'] == false){
          let message: string =
          "Alpha Vantage Api calls frequency of 5 per minute or 500 per day has been hit. Data updating has been switched to the ones in the current view. Please wait before switching back to update all."
          this.openSnackBar(message)
          this.currentUpdateState = "Current Four"

        } else {

          let tempList: Stock[] = []

        
          for (let stock in data['mystocks']){
            let stockInterface = new Stock;
            stockInterface.name = stock;
            stockInterface.price = data['mystocks'][stock]['price']
            stockInterface.quantity = data['mystocks'][stock]['quantity']
            stockInterface.open = data['mystocks'][stock]['open']
            tempList.push(stockInterface)
          }
          this.userDetails.stocks = tempList.reverse()
          this.userDetails.totalportfolio = data['portfolio']
          this.NotificationToParent(this.userDetails)
            
          }
  
      })
    }
  }

  getCompactData(){
    let stockList = this.userDetails.stocks.slice(this.start, this.end)
    let stockListNames = [];

    for(let stock of stockList){
      
      stockListNames.push(stock['name'])
    }

    if(stockListNames.length > 0){
      this.stockService.updateStocksCompact(stockListNames).subscribe((data) => {
        
        if(data['success'] == false){
          this.openSnackBar(data['message'])
        } else {

          let tempList: Stock[] = []

        
          for (let stock in data['mystocks']){
            let stockInterface = new Stock;
            stockInterface.name = stock;
            stockInterface.price = data['mystocks'][stock]['price']
            stockInterface.quantity = data['mystocks'][stock]['quantity']
            stockInterface.open = data['mystocks'][stock]['open']
            tempList.push(stockInterface)
          }
          this.userDetails.stocks = tempList.reverse()
          this.userDetails.totalportfolio = data['portfolio']
          this.NotificationToParent(this.userDetails) 
          }
      })
    }
      
    
    
  }

  openSnackBar(message:string){
    this._snackBar.open(message,"close",{
      duration: 10000,
    })
  }  
  

}
