import { Observable, empty, from } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StockModel } from './../models/stock.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  readonly rootUrl = 'http://127.0.0.1:5000';
  stock: StockModel;
  public authData = []

  constructor(private http:HttpClient) {
    this.stock = new StockModel();
   }

   searchStock(constrain: string): Observable<any> {
     if (constrain == null || constrain == ''){
       var emptyList = [{'success': true, 'stockList':[]}]
       return from(emptyList)
     } else {
      let params = new HttpParams().set("query", constrain);
      return this.http.get(this.rootUrl + "/stock-search", {params: params})
     }
    
   }
}
