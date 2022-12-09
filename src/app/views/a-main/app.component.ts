import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trippify-front-end';

  public subscriptions: Subscription = new Subscription();
  public errorMsg: String = this.sharedVar.GENERAL_SYS_DOWN_ERR_MSG;
  public showError: boolean = false;

  constructor(
    public sharedVar: SharedVar,
    public apiService: ApiService){

  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.currentException
        .subscribe(error => {
          if(error != ''){
            this.showError = true;
            this.errorMsg = this.errorMsg + "<br />" + "Error: " + error;
            window.scroll(0, 0);
          } else {
            this.showError = false;
          }
      }));
  }

}
