import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  constructor(public sharedVar: SharedVar) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.currentGlobalCode
        .subscribe(data => {
          console.log(data);
          if(data){
            let ctryList = [];
            data.result.cdTyp.CD_CTRY.forEach(ctry => {
              ctryList.push(ctry.cdDesc);
            })
            this.sharedVar.ctryList$.next(ctryList);
          }
        })
    )
  }

}
