import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeout, catchError } from 'rxjs/operators';
import { SharedVar } from '../shared-var.service';

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

  postCreateTrip(): Observable<Object> {
    console.log(this.sharedVar.createTripModel);
    return this.http.post(this.servicePrefix + "/trip/create-trip", this.sharedVar.createTripModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  // get(url): Observable<Object> {
  //   return this.http.get(this.servicePrefix + url).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // put(url,model): Observable<Object> {
  //   return this.http.put(this.servicePrefix + url, model).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // delete(url): Observable<Object> {
  //   return this.http.delete(this.servicePrefix + url).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  handleError(error){
    alert('An unexpected error has occured.')
    return throwError(error.message || "Server Error has occured.");
  }
}
