import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.css']
})
export class StockPortfolioComponent implements OnInit {
  @Input() card: any;
  constructor() { }

  ngOnInit() {
  }

}
