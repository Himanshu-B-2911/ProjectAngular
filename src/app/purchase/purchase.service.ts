import { Injectable } from '@angular/core';
import { Purchase } from './purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';



const apiUrl = 'http://localhost:3000/api/purchase/';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  _purchaseList: Purchase[]=[];

  constructor(private http:HttpClient) { }

//get Puchase
getPurchase():Observable<Purchase[]>{
  return this.http.get<Purchase[]>(apiUrl)
}
//Get Puchase By Id
getPurchaseById(_id: any): Observable<Purchase> {
  const url = `${apiUrl}/${_id}`;
    return this.http.get<Purchase>(url)
      }

//Purchase entry
addPurchase(data:Purchase):Observable<Purchase>{
  return this.http.post<Purchase>(apiUrl,data,httpOptions);

  }
  // Update users
  updatePuchase(_id: any, data: Purchase): Observable<any> {
    const url = `${apiUrl}/${_id}`;
        return this.http.put(url, data)
        }
  removePuchase(_id:any){
    const url = `${apiUrl}/${_id}`;
    return this.http.delete<Purchase>(url)
  }
}
