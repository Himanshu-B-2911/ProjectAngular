import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, of } from 'rxjs';
import { UserData } from './user-data';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api/user/';
//const apiUrl = 'http://localhost:3000/';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  _usersList: UserData[]=[];

  constructor(private http:HttpClient ) { }
 
// Get users
       getUser(){
       return this.http.get(apiUrl).toPromise()
                }
//Get User By Id
    getUserById(_id: any): Observable<UserData> {
        const url = `${apiUrl}/${_id}`;
          return this.http.get<UserData>(url).pipe(
            tap(_ => console.log(`fetched post by id=${_id}`)),
            catchError(this.handleError<UserData>(`getPost id=${_id}`))
             );
            }
// add users
        addUser(data :UserData):Observable<UserData>{
            return this.http.post<UserData>(apiUrl,data,httpOptions)       
            }
// Update users
      updateUser(_id: any, data: UserData): Observable<any> {
          const url = `${apiUrl}/${_id}`;
              return this.http.put(url, data).pipe(
                    tap(_ => console.log(`updated post id=${_id}`)),
                    catchError(this.handleError<any>('updatePost'))
                    );
             }
// Delete users
     removeUser (_id: string): Observable<{}>  {
        const url = `${apiUrl}/${_id}`;
          return this.http.delete<UserData>(url);
      }


//Error Handling
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