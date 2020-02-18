import { Stock } from './../shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css']
})
export class PortfolioCardComponent implements OnInit {
  @Input() stock: Stock

  constructor() { 
    this.stock = new Stock

  }

  ngOnInit() {
  
  }

  checkChange(){
    if(this.stock.open > this.stock.price){
      return "red"
    }
    else if(this.stock.open < this.stock.price){
      return "green"
    }
    else {
      return "grey"
    }
  }

}
