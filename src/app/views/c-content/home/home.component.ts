import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public errorMsg: String = "";

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods) { }

  ngOnInit(): void {
    this.sharedMethods.initializeIndSubmission();

    this.subscriptions.add(
    this.sharedVar.currentException
      .subscribe(error => {
        if(error != ''){
          window.scroll(0, 0);
          this.errorMsg = "This system is currently not available. Please try again at a later time.";
        }
    }));

  }

  submitTripClicked(action: string){
    this.sharedMethods.showForm(action);
  }


}
