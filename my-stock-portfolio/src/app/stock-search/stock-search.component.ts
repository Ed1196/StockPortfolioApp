import { StockModel } from './../shared/models/stock.model';
import { StockService } from './../shared/dbAccess/stock.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { FormControl } from '@angular/forms';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {

  @Input() card: any;

  @ViewChild('stockInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  stockCtrl = new FormControl()

  filteredStocks: Observable<string[]>;
  stockModel: StockModel;

  constructor(private stockService: StockService) {
    this.stockModel = new StockModel;
   }

  ngOnInit() {
    this.stockCtrl.valueChanges.pipe(
      startWith(null),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (query: string) => this.stockService.searchStock(query)
        ))
        .subscribe( (stocks: Observable<string []>) => {this.filteredStocks = stocks['stockList']}) 
  }

}
