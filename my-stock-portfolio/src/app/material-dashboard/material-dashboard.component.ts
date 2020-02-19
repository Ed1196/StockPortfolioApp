import { DataService } from './../shared/services/data.service';
import { Stock, Transaction } from './../shared/models/user.model';
import { UserService } from './../shared/dbAccess/user.service';
import { UserModel } from 'src/app/shared/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate('800ms ease-out')),
      transition(':leave', animate('800ms ease-in')),
    ])
  ]
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
    private userService: UserService,
    private dataService: DataService) {


      this.userDetails = new UserModel;

      this.userService.getUserDetails().subscribe((data: any) => {
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
    })
      
  }

  ngOnInit() {
    this.dataService.currentData.subscribe((data: UserModel) =>{
      this.userDetails = data
    })
  }

  GetOutputVal(userDetails: UserModel){
    if(userDetails)
    {
      this.userDetails = userDetails
    }
  }
}
