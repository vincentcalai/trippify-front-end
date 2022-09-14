import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTripModel } from '../model/create-trip.model';
import { ParticularsModel } from '../model/particulars.model';
import { SharedVar } from './shared-var.service';

@Injectable({
  providedIn: 'root'
})
export class SharedMethods {



  constructor(private router: Router, public sharedVar: SharedVar) { }


  initializeIndSubmission() {
    this.sharedVar.createTripModel = new CreateTripModel();
    this.sharedVar.createTripModel.particulars = new ParticularsModel();
  }

  showForm(form: string) {
    let route: string[] = [];
    if (form == "create") {
      route = ['create-trip'];
    } else if (form == "manage") {
      route = ['manage-trip'];
    }
    console.log('route : ' + route);
    this.router.navigate(route, { skipLocationChange: true });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
}
