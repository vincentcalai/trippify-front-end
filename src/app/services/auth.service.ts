import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticateUser(username: string, password: string): boolean{
    if(username == 'VINCENT' && password == 'password'){
      return true;
    }
    return false;
  }
}
