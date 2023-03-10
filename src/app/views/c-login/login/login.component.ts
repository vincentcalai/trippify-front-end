import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMsg: string = '';
  responseMsg: string = '';
  msgCount: number = 0;

  public subscriptions: Subscription = new Subscription();

  constructor(
    private authenticateService: AuthService,
    public sharedVar: SharedVar,
    private router: Router) { }

  ngOnInit(): void {
    
    this.subscriptions.add(
        this.sharedVar.responseSource
        .subscribe(resp => {
          if(resp){
            this.responseMsg = resp.resultMessage;
          }
        }
      )
    )

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
    this.router.navigate(['create-user'], {skipLocationChange: true});
  }

}
