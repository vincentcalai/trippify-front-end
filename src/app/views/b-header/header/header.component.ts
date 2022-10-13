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
          if(data){
            let cityList = [];
            data.result.cdTyp.CD_CITY.forEach(city => {
              cityList.push(city.cdDesc);
            })
            this.sharedVar.cityCode$.next(cityList);
          }
        })
    )
  }

}
