import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeout, catchError, map } from 'rxjs/operators';
import { SharedVar } from '../shared-var.service';
import { ResponseModel } from 'src/app/model/response.model';
import { AUTH_USER, TOKEN } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public servicePrefix;
  public timeout = 200000;

  constructor(public http: HttpClient,
    public sharedVar: SharedVar) {
    this.servicePrefix = environment.apiUrl;
  }

  postCreateTrip(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.servicePrefix + "/trip/createTrip", this.sharedVar.createTripModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  getAllTrips(page: number, itemsPerPage: number): Observable<Object> {
    return this.http.get(this.servicePrefix + '/trip/getTrips?page=' + page + '&size=' + itemsPerPage).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  deleteTrip(id: number) {
    return this.http.delete(this.servicePrefix + '/trip/deleteTrip/' + id).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  postDestCodes() {
    return this.http.get(this.servicePrefix + '/code/retrieveDestCode')
      .pipe(
        timeout(this.timeout),
        catchError(this.handleError)
      );
  }

  postCreateUser(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.servicePrefix + "/user/createUser", this.sharedVar.createUserModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  jwtAuthenticate(username, password){
    return this.http.post<any>( this.servicePrefix + "/authenticate",{
      username,
      password
    })
    .pipe(
      map(
        data => {
          sessionStorage.setItem(AUTH_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          console.log(data);
          return data;
        }
      )
    );
  }

  handleError(error){
    alert('An unexpected error has occured.')
    return throwError(error.message || "Server Error has occured.");
  }

}
