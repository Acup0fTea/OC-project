import { Injectable } from '@angular/core';
import { catchError, map, pipe } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Book{
  _id!: string;
  name!: string;
  price!: string;
  description!: string;
}


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // node /epress API
  REST_API: string = 'http://localhost:8000/api';

  // Http headers
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  Addbook(data: Book): Observable<any>{
    let API_URL = `${this.REST_API}/add-books`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  // Get all objects
  GetBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL,{headers: this.httpHeaders})
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

    // update 
    UpdateBook(id:any, data:any): Observable<any>{
      let API_URL = `${this.REST_API}/update-book/${id}`;
      return this.httpClient.put(API_URL, data, {headers: this.httpHeaders})
        .pipe(
        catchError(this.handleError)
        )
    }

  // Delete
  deleteBook(id: any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  // error
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = err.error.message;
    } else {
      // handle server error
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => console.log(errorMessage));
    
  }
}
