import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://cinefacts-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  //user state
  //the true state - updated by this class
  private userSubject = new BehaviorSubject<string>("");
  public userObservable$ : Observable<string> = this.userSubject.asObservable();
  public updateLocalUser(username: string): void{
    this.userSubject.next(username);
  }

  // User Endpoints
  // register user
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }

  //to do:

  // login user
  public userLogin(username: string, password: string): Observable<any> {

    //to do return the result AFTER assigning the new user

    return this.http.post(apiUrl + 'login', {Username: username, Password: password})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get users
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // get all users
  public getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // update user
  public updateUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // delete user
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // User Favorites Endpoints
  // add favorite
  public addFavorite(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username +'/movies/'+movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // remove favorite
  public removeFavorite(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username +'/movies/'+movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  //Helper fuctions
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    //Responce is not recognized as a type. I changed it to any.
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    //log the error in the console
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    //return the error message
    return throwError( () =>{
      console.log("An error occured: "+error.error.message);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  // Movie Endpoints
  // get all movies
  public getAllMovies(): Observable<any> {

    console.log("Getting all movies");
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // get movie
  public getMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieTitle, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  //Helper fuctions
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    //Responce is not recognized as a type. I changed it to any.
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    //log the error in the console
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    //return the error message
    return throwError( () =>{
      console.log("An error occured: "+error.error.message);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  constructor(private http: HttpClient) {}

  // Documentation Endpoint

  // get documantation
  public getDocumentation(): Observable<any> {
    return this.http.get(apiUrl + 'ducumentation/')
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  //Helper fuctions
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    //Responce is not recognized as a type. I changed it to any.
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    //log the error in the console
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    //return the error message
    return throwError( () =>{
      console.log("An error occured: "+error.error.message);
    });
  }
}



