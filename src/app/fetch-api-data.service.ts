import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';

const apiUrl = 'https://cinefacts-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  //the true user state - updated by this class
  private userSubject = new BehaviorSubject<any>(null);
  public userObservable$ : Observable<any> = this.userSubject.asObservable();

  //update local user and storage if the login is successful
  private handleLogin = (result:any):any => {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result.user.Username);
    this.userSubject.next({
      _id: result.user._id,
      Email: result.user.Email,
      Username: result.user.Username,
      Birthday: result.user.Birthday,
      FavoriteMovies: result.user.FavoriteMovies
    });
  }
  
  private handleUserUpdated = (result:any):any => {
    this.userSubject.next({
      _id: result._id,
      Email: result.Email,
      Username: result.Username,
      Birthday: result.Birthday,
      FavoriteMovies: result.FavoriteMovies
    });
  }

  private handleLoginError = (error: HttpErrorResponse):any => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    return throwError( () =>{
      console.log("An error occured: " + error.error.message);
    });
  }

  //check local storage for a user name and key - if found, get user data
  public checkLocalStoarge = ():void => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if(token && user){
      this.getUser(user).subscribe({
        next: (result: any) => this.onUserFound(result),
        error: (err: Error) => this.onUserFail(),
      });
    }
    else{
      this.userSubject.next(null);
    }
  }
  //on user found
  private onUserFound = (result: any):void => {
    this.userSubject.next({
      _id: result._id,
      Email: result.Email,
      Username: result.Username,
      Birthday: result.Birthday,
      FavoriteMovies: result.FavoriteMovies
    });
  }
  //on user not found
  private onUserFail = ():void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null)
  }

  public logout = ():void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // register user
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(
      catchError(this.handleError)
    );
  }

  // login user
  public userLogin(username: string, password: string): Observable<any> {
    return this.http.post(apiUrl + 'login', {Username: username, Password: password})
    .pipe(
      map(this.extractResponseData),
      tap(this.handleLogin),
      catchError(this.handleLoginError)
    )
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
        tap(this.handleUserUpdated),
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

  // add favorite
  public addFavorite(username: string, movieId: string): Observable<any> {

    const token = localStorage.getItem('token');

    return this.http.post(apiUrl + 'users/' + username +'/movies/' + movieId, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        tap(this.handleUserUpdated),
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
        tap(this.handleUserUpdated),
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
      console.log("An error occured: "+error.message);
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



