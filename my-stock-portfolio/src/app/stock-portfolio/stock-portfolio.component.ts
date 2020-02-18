import { interval } from 'rxjs';
import { StockService } from './../shared/dbAccess/stock.service';
import { UserService } from './../shared/dbAccess/user.service';
import { Stock } from './../shared/models/user.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';





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


  constructor(private userService: UserService,
              private stockService: StockService) {
    this.userDetails = new UserModel(),
    this.total = 0
    interval(4*30000).subscribe ( x => {
      console.log("Its been a minute")
      this.stockService.updateStocks().subscribe((data) => {
        let tempList: Stock[] = []

        for (let stock in data['mystocks']){
          let stockInterface = new Stock;
          stockInterface.name = stock;
          stockInterface.price = data['mystocks'][stock]['price']
          stockInterface.quantity = data['mystocks'][stock]['quantity']
          tempList.push(stockInterface)
        }
        this.userDetails.stocks = tempList
        this.userDetails.totalportfolio = data['portfolio']
        this.NotificationToParent(this.userDetails)

        
      })
    })
  }

  ngOnInit() {
    for(let stock of this.userDetails.stocks){
      this.total = (stock.quantity * stock.price) + this.total
    }
  }

  NotificationToParent(userDetails: UserModel) {
    this.outputToParent.emit(userDetails)
  }

  

  
  

}
