import { MatSnackBar } from '@angular/material';
import { Stock, Transaction } from './../shared/models/user.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { DataService } from './../shared/services/data.service';
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
  @Input() stock: string;

  userDetails: UserModel;

  stockData: StockModel;

  constructor(
    private stockService:StockService,
    private dataService: DataService,
    private _snackBar: MatSnackBar
    ) {

   }

  ngOnInit() {
      this.stockData = new StockModel
      this.dataService.currentData.subscribe((data:UserModel) => {
        this.userDetails = data
      })
  }

  async panelWasOpen(stock: string){
    this.panelOpenState = true;
    await  this.stockService.getStockInfo(this.stock).subscribe((data: StockModel) => {
    this.stockData = data

    })
  }

  openSnackBar(message:string){
    this._snackBar.open(message,"close",{
      duration: 2*3500,
    })
  } 

  //Class StockService and function purchaseStock 
  purchase(quantity:number) {

    if(quantity % 1 !=0){
      this.openSnackBar("Invalid Input!")
    } else {
      this.stockService.purchaseStock(quantity, this.stockData['close'], this.stockData['symbol'], this.stockData['open'])
      .subscribe((data:any) => { 

        if(data.success){
          this.userDetails.account = data.userdetails['account']
          this.userDetails.firstname = data.userdetails['firstname']
          this.userDetails.lastname = data.userdetails['lastname']
          this.userDetails.email = data.userdetails['email']
          this.userDetails.totalportfolio = data.userdetails['totalportfolio']
          
          let transList = data.userdetails['transactions']
          let stockList = data.userdetails['mystocks']

          let tempList: Stock[] = []

          for (let stock in stockList){
            let stockInterface = new Stock;
            stockInterface.name = stock;
            stockInterface.price = stockList[stock]['price']
            stockInterface.quantity = stockList[stock]['quantity']
            stockInterface.open = stockList[stock]['open']
            tempList.push(stockInterface)
          }
          this.userDetails.stocks = tempList.reverse()

          let tempList2: Transaction[] = []
          for (let trans in transList){
            let transInterface = new Transaction;
            transInterface.symbol = transList[trans]['symbol']
            transInterface.price = transList[trans]['price']
            transInterface.quantity = transList[trans]['quantity']
            tempList2.push(transInterface)
          }
          this.userDetails.transactions = tempList2.reverse()  

        } else {
          this.openSnackBar(data.message)
        }

           
      })
    }

    
  }

}
