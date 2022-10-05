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
  public errorMsg: String = "This system is currently not available. Please try again at a later time.";
  public showError: boolean = false;

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods) { }

  ngOnInit(): void {
    this.sharedMethods.initializeIndSubmission();

    this.subscriptions.add(
    this.sharedVar.currentException
      .subscribe(error => {
        console.log(error);
        if(error != ''){
          console.log("show error...");
          this.showError = true;
          this.errorMsg = this.errorMsg + "<br />" + "Error: " + error;
          window.scroll(0, 0);
        }else {
          console.log("dont show error...");
          this.showError = false;
        }
    }));

  }

  submitTripClicked(action: string){
    this.sharedMethods.showForm(action);
  }


}
