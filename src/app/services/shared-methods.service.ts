import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BudgetModel } from '../model/budget.model';
import { CreateTripModel } from '../model/create-trip.model';
import { ParticularsModel } from '../model/particulars.model';
import { TripDetailsModel } from '../model/trip-details.model';
import { UserModel } from '../model/user.model';
import { ViewTripModel } from '../model/view-trip.model';
import { SharedVar } from './shared-var.service';

@Injectable({
  providedIn: 'root'
})
export class SharedMethods {


  constructor(public router: Router, public sharedVar: SharedVar) { }


  initializeCreateTripModel() {
    this.sharedVar.createTripModel = new CreateTripModel();
    this.sharedVar.createTripModel.particulars = new ParticularsModel();
    this.sharedVar.createTripModel.budget = new BudgetModel();
    this.sharedVar.createTripModel.tripDetails = new TripDetailsModel();
    this.sharedVar.createTripModel.tripDetails.destinations = [];
  }

  initializeCreateUserModel() {
    this.sharedVar.createUserModel = new UserModel();
  }

  initializedViewModel(){
    this.sharedVar.viewTripModel = new ViewTripModel();
    this.sharedVar.viewTripModel.particulars = new ParticularsModel();
    this.sharedVar.viewTripModel.budget = new BudgetModel();
    this.sharedVar.viewTripModel.tripDetails = new TripDetailsModel();
    this.sharedVar.viewTripModel.tripDetails.destinations = [];
  }

  showForm(form: string) {
    let route: string[] = [];
    if (form == "create") {
      route = ['create-trip'];
    } else if (form == "manage") {
      route = ['manage-trip'];
    }
    this.router.navigate(route, { skipLocationChange: true });
  }

  getDayName(dateStr){
      var dateMomentObject = moment(dateStr, "DD/MM/YYYY");
      return dateMomentObject.format('dddd').substring(0,3).toUpperCase();
  }

  getDayDiff(dateFromStr, dateToStr){
    var dateFromMomentObject = moment(dateFromStr, "DD/MM/YYYY");
    var dateToMomentObject = moment(dateToStr, "DD/MM/YYYY");
    return dateToMomentObject.diff(dateFromMomentObject, 'days');
}


  scrollToTop() {
    window.scroll(0, 0);
  }
}
