import { Observable, empty, from } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StockModel } from './../models/stock.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  readonly rootUrl = 'https://my-stock-portfolio-api.herokuapp.com';
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

   getStockInfo(symbol: string): Observable<any> {
     let params = new HttpParams().set("symbol", symbol);
    return this.http.get(this.rootUrl + "/stock", {params: params})
   }

   purchaseStock(quantity, price, symbol, open){
    var reqHeader = new HttpHeaders({'No-Auth':'False'})
    const body = {
      quantity: quantity,
      price: price,
      symbol: symbol,
      open: open
    }
    return this.http.post(this.rootUrl + "/purchase", body, {headers: reqHeader})
   }

   updateStocks(){
    var reqHeader = new HttpHeaders({'No-Auth':'False'})
    return this.http.get(this.rootUrl + "/update-info", {headers: reqHeader})
   }

   updateStocksCompact(stocks: string[]){
    var reqHeader = new HttpHeaders({'No-Auth':'False'})
    const body = {
      stocks: stocks
    }

    return this.http.post(this.rootUrl + "/update-info-compact", body, {headers: reqHeader})

   }

}
