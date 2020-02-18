import { Stock, Transaction } from './../shared/models/user.model';
import { DataService } from './../shared/services/data.service';
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

  constructor(
    private dataService: DataService
    ) { }


  ngOnInit() {
    this.dataService.currentData.subscribe((data: any) => {

      this.userDetails = data

    })
  }

}
