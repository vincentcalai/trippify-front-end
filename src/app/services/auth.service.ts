import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  jwtAuthenticate(username: string, password: string) {
    return this.apiService.jwtAuthenticate(username, password);
  }
}
