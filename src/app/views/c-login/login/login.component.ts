import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMsg: string = '';
  msgCount: number = 0;

  constructor(
    private authenticateService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authenticateService.isUserLoggedIn()){
      this.router.navigate(['home'], {skipLocationChange: true});
    }
  }

  handleJWTAuthLogin(){
    this.authenticateService.jwtAuthenticate(this.username,this.password)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home'], {skipLocationChange: true});
        console.log("login successful");
      },
      error => {
        console.log("login fail");
        this.errorMsg = "Please enter a valid credential. Login failed.";
      }
    )
  }

  createUser(){
    console.log("create user!");
    this.router.navigate(['create-user'], {skipLocationChange: true});
  }

}
