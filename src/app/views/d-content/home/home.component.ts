import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.sharedVar.changeResponse(null);
    this.sharedMethods.initializeCreateTripModel();

    this.subscriptions.add(
      this.apiService.postDestCodes()
        .subscribe(resp => {
          this.sharedVar.changeCodes(resp);
        },
          err => {
            this.sharedVar.changeException(err);
          }
        ));

    this.subscriptions.add(
      this.apiService.retrieveRegUsers()
        .subscribe(resp => {
          this.sharedVar.changeRegUsers(resp);
        },
          err => {
            this.sharedVar.changeException(err);
          }
        ));

  }

  submitTripClicked(action: string){
    this.sharedMethods.showForm(action);
  }


}
