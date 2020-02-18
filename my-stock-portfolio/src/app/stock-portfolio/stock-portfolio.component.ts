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


  constructor(private userService: UserService,
              private stockService: StockService,
              private _snackBar: MatSnackBar) {
    this.userDetails = new UserModel(),
    this.total = 0
    interval(2*35000).subscribe ( x => {
      this.getData()
    })
  }

  ngOnInit() {

  }

  NotificationToParent(userDetails: UserModel) {
    this.outputToParent.emit(userDetails)
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
    this.stockService.updateStocks().subscribe((data) => {
      console.log(data)

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

  openSnackBar(message:string){
    this._snackBar.open(message,"close",{
      duration: 2*3500,
    })
  }  
  

}
