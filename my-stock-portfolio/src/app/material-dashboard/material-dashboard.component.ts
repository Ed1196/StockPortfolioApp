import { Stock, Transaction } from './../shared/models/user.model';
import { UserService } from './../shared/dbAccess/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent implements OnInit{

  @Input()
  ngSwitch: any

  userDetails: UserModel

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'search', cols: 1, rows: 3 },
          { title: 'portfolio', cols: 1, rows: 1 },
          { title: 'transactions', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'search', cols: 1, rows: 3 },
        { title: 'portfolio', cols: 1, rows: 1 },
        { title: 'transaction', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService) {
      this.userDetails = new UserModel;
      this.userService.getUserDetails().subscribe((data: any) => {

      this.userDetails.firstname = data.userdetails['firstname']
      this.userDetails.lastname = data.userdetails['lastname']
      this.userDetails.email = data.userdetails['email']
      
      let transList = data.userdetails['transactions']
      let stockList = data.userdetails['mystocks']

      let tempList: Stock[] = []

      for (let stock in stockList){
        let stockInterface = new Stock;
        stockInterface.name = stock;
        stockInterface.price = stockList[stock]['price']
        stockInterface.quantity = stockList[stock]['quantity']
        tempList.push(stockInterface)
      }
      this.userDetails.stocks = tempList

      let tempList2: Transaction[] = []
      for (let trans in transList){
        let transInterface = new Transaction;
        transInterface.symbol = transList[trans]['symbol']
        transInterface.price = transList[trans]['price']
        transInterface.quantity = transList[trans]['quantity']
        tempList2.push(transInterface)
      }
      this.userDetails.transactions = tempList2

    })
    
    
    
      
  }

  ngOnInit() {

    
  }
}
