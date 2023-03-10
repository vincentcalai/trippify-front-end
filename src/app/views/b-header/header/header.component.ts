import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  constructor(public sharedVar: SharedVar, public authService: AuthService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.currentGlobalCode
        .subscribe(data => {
          if(data && data.result){
            data.result.cdTyp.CD_DEST.forEach(
              destCd => {
                if(this.sharedVar.destMap.has(destCd.ctry)){
                  let destArray = this.sharedVar.destMap.get(destCd.ctry);
                  destArray.push(destCd.city);
                  this.sharedVar.destMap.set(destCd.ctry, destArray);
                } else {
                  const initDestArr = [destCd.city];
                  this.sharedVar.destMap.set(destCd.ctry, initDestArr);
                }
              })
            let ctryList = Array.from( this.sharedVar.destMap.keys() );
            this.sharedVar.destCtryList$.next(ctryList);
          }
        })
    )

    this.subscriptions.add(
      this.sharedVar.currentRegUsers
        .subscribe(data => {
          if(data && data.regUsersList){
            data.regUsersList.forEach(
              user => {
                if(this.sharedVar.usernameList.findIndex(username => username == user.username) < 0){
                  this.sharedVar.usernameList.push(user.username);
                  let userObj = new UserModel();
                  userObj.id = user.id;
                  userObj.username = user.username;
                  userObj.email = user.email;
                  userObj.contactNo = user.contactNo;
                  this.sharedVar.userModelList.push(userObj);
                }
              }
            )
          }
        })
    )
  }

  logout(): void {
    this.authService.logout();
  }

}
