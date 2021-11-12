import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api/product/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _productList: Product[];

  constructor(private http:HttpClient) { }
//==============Get Product
getProduct(){
    return this.http.get(apiUrl).toPromise();
             }

//==============Get User By Id
getProductById(_id: any): Observable<Product> {
     const url = `${apiUrl}/${_id}`;
       return this.http.get<Product>(url).pipe(
         tap(_ => console.log(`fetched post by id=${_id}`)),
         catchError(this.handleError<Product>(`getPost id=${_id}`))
          );
  }

//===================Add users
addProduct(data :Product):Observable<Product>{
         return this.http.post<Product>(apiUrl,data,httpOptions)       
         }

//===================Update users
updateProduct(_id: any, data: Product): Observable<any> {
  const url = `${apiUrl}/${_id}`;
      return this.http.put(url,data).pipe(
            tap(_ => console.log(`updated post id=${_id}`)),
            catchError(this.handleError<any>('updatePost'))
            );
     }
//===================Delete users
removeProduct(_id: string): Observable<{}>  {
const url = `${apiUrl}/${_id}`;
  return this.http.delete<Product>(url);
}

//==================Error Handling===========================
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

private log(message: string) {
  console.log(message);
}
}
