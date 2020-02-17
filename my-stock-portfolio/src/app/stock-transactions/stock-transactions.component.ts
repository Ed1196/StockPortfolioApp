import { UserModel } from 'src/app/shared/models/user.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-stock-transactions',
  templateUrl: './stock-transactions.component.html',
  styleUrls: ['./stock-transactions.component.css']
})
export class StockTransactionsComponent implements OnInit {
  @Input() card: any;

  @Input()
  userDetails: UserModel

  constructor() { }


  ngOnInit() {
    
  }

}
