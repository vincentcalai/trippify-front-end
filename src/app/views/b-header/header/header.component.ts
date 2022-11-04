import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
          if(data){
            let destList = [];
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
  }

  logout(): void {
    this.authService.logout();
  }

}
