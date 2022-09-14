import { Component, OnInit } from '@angular/core';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods) { }

  ngOnInit(): void {
    this.sharedMethods.initializeIndSubmission();
  }

  submitTripClicked(action: string){
    console.log("action: " + action);
    this.sharedMethods.showForm(action);
  }


}
