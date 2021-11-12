import { Injectable } from '@angular/core';
import { Purchase } from '../purchase/purchase';
import { Sales } from './sales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../user/user-data';
import { SalesItem } from './sales-item';

const apiUrl = 'http://localhost:3000/api/sales/';

const apiUrlSP = 'http://localhost:3000/api/saleProduct/';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  formData:Sales;

  userList:UserData[];

  saleslist: SalesItem[];

  SalesOrder:Sales[];

  customerData=[];

  constructor(private Http:HttpClient ) { }

getSales(){
  return this.Http.get(apiUrl)
}
  getOrderByID(_id:number):any {
    const url = `${apiUrl}/${_id}`;
    return this.Http.get(url)
  }
    
   
  postSales(data:Sales){
    return this.Http.post(apiUrl,data,httpOptions)
  }
  postSP(data:SalesItem){
    return this.Http.post(apiUrlSP,data,httpOptions)
  }
  gteUserProduct(mobileNo:string){
    const url = `${apiUrlSP}/${mobileNo}`;
    return this.Http.get(url)
  }
}
