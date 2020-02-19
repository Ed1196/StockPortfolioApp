import { Stock } from './../shared/models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate('800ms ease-out')),
      transition(':leave', animate('800ms ease-in')),
    ])
  ]
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
