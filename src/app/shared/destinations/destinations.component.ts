import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  @Input() events: Observable<number>;
  noOfTrips: number;

  tmpDest: string[] = ["Amsterdam", "Brussels", "Singapore", "Lisbon", "Madrid", "Tokyo"];

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public controlContainer: ControlContainer) {
  }


  ngOnInit(): void {
    this.subscriptions.add(
      this.events.subscribe(val => {
        console.log(val);

        this.sharedVar.createTripModel.tripDetails.destinations = [];
        this.destinations.clear();
        for (let i = 0; i < val; i++) {
          const destination = new Destinations();
          destination.name = '';
          destination.dateFrom = {year: 0, month: 0, day: 0};
          destination.dateTo = {year: 0, month: 0, day: 0};

          this.destinations.push(this.reactiveFormService.initDestinationFormGrp());
          this.sharedVar.createTripModel.tripDetails.destinations.push(destination);
        }
        console.log(this.destinations);
        console.log(this.sharedVar.createTripModel.tripDetails.destinations);

        this.noOfTrips = val;
      })
    );
  }

  onChangeDest(index: number, name: string){
    this.destinations.at(index).get('name').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].name);
  }

  onChangeDateFrom(index: number){
    this.validateDateFrom(index);
    this.destinations.at(index).get('dateFrom').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateFrom);
  }

  validateDateFrom(index: number) {
    const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
    if(!destination.dateFrom || (destination.dateFrom.year == 0 && destination.dateFrom.month == 0 && destination.dateFrom.day == 0)){
      this['dateFrom_error_' + index] = 1;
    } else{
      this['dateFrom_error_' + index] = 0;
    }
  }

  onChangeDateTo(index: number){
    this.validateDateTo(index);
    this.destinations.at(index).get('dateTo').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateTo);
  }

  validateDateTo(index: number) {
    const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
    if(!destination.dateTo || (destination.dateTo.year == 0 && destination.dateTo.month == 0 && destination.dateTo.day == 0)){
      this['dateTo_error_' + index] = 1;
    } else{
      this['dateTo_error_' + index] = 0;
    }
  }

  validateAllDate(){
    console.log("validate all dates");
    const destinations = this.sharedVar.createTripModel.tripDetails.destinations;
    for(let i=0; i<destinations.length; i++){
      if(!destinations[i].dateFrom || (destinations[i].dateFrom.year == 0 && destinations[i].dateFrom.month == 0 && destinations[i].dateFrom.day == 0)){
        this['dateFrom_error_' + i] = 1;
      } else{
        this['dateFrom_error_' + i] = 0;
      }

      if(!destinations[i].dateTo || (destinations[i].dateTo.year == 0 && destinations[i].dateTo.month == 0 && destinations[i].dateTo.day == 0)){
        this['dateTo_error_' + i] = 1;
      } else{
        this['dateTo_error_' + i] = 0;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get destinations(){
    return this.controlContainer.control.get('destinations') as FormArray;
  }

  getDestinationFormName(index: number){
    return this.destinations.get(index.toString()).get('name');
  }

  getDestinationFormDateFrom(index: number){
    return this.destinations.get(index.toString()).get('dateFrom');
  }

  getDestinationFormDateTo(index: number){
    return this.destinations.get(index.toString()).get('dateTo');
  }

}
