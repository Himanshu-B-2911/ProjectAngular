import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from './stock';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/stock/';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class StockService {

  _stockList: Stock[];

  constructor(private Http:HttpClient) { }

  //----------Get Stock
   getStock(){
        return this.Http.get(apiUrl)
    }

  //Get Stock By Id
    getStockById(_id: string): Observable<Stock> {
        const url = `${apiUrl}/${_id}`;
          return this.Http.get<Stock>(url)
     }
  //---------Updat Stock by Id
    updateStock(_id:any,data:any){
        const url = `${apiUrl}/${_id}`;
          return this.Http.put(url,data)
       }
 //-----Send Data to StockTable
   postStock(data:Stock){
      return this.Http.post(apiUrl,data,httpOptions);
    }
}