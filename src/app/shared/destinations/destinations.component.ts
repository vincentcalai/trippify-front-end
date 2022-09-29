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
  noOfTrips: number = 0;

  tmpDest: string[] = ["Amsterdam", "Brussels", "Singapore", "Lisbon", "Madrid", "Tokyo"];

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public controlContainer: ControlContainer) {
  }


  ngOnInit(): void {
    const prevRequest = this.sharedVar.createTripModel.tripDetails;
    const prevRequestNoOfDest = prevRequest.noOfDestinations;
    const prevRequestDests = this.sharedVar.createTripModel.tripDetails.destinations;

    this.noOfTrips = prevRequestNoOfDest ? prevRequestNoOfDest : 0;

    console.log("this.noOfTrips: " + this.noOfTrips);

    if(this.noOfTrips){
      console.log("inside noOfTrips if loop");
      console.log("prevRequestDests.length: " + prevRequestDests.length);
      for (let i = 0; i < this.noOfTrips; i++) {
        // const destination = new Destinations();
        // destination.name = prevRequestDests[i].name;
        // destination.dateFrom = prevRequestDests[i].dateFrom;
        // destination.dateTo = prevRequestDests[i].dateTo;


        this.destinations.push(this.reactiveFormService.initDestinationFormGrp());
        //this.sharedVar.createTripModel.tripDetails.destinations.push(destination);

        this.getDestinationFormName(i).setValue(prevRequestDests[i].name);
        this.getDestinationFormDateFrom(i).setValue(prevRequestDests[i].dateFrom);
        this.getDestinationFormDateTo(i).setValue(prevRequestDests[i].dateTo);
      }
    }

    console.log(this.destinations);

    this.subscriptions.add(
      this.events.subscribe(newNoOfTrips => {
        console.log("this.noOfTrips: " + this.noOfTrips);
        console.log("newNoOfTrips: " + newNoOfTrips);
        if(newNoOfTrips > this.noOfTrips) {
          this.createNewTripDest(this.noOfTrips, newNoOfTrips);
        } else if(newNoOfTrips < this.noOfTrips){
          let arrLength = this.sharedVar.createTripModel.tripDetails.destinations.length;
          let startIdx = this.noOfTrips - newNoOfTrips;
          // console.log("delete from index onwards: " + (arrLength - startIdx) + " number of elements to be deleted: " + startIdx);
          // this.sharedVar.createTripModel.tripDetails.destinations.splice(arrLength - startIdx, startIdx);

          let formArrLength = this.destinations.length;
          for (let i = 0; i < startIdx ; i++) {
            this.destinations.removeAt(formArrLength - 1 - i);
          }
          console.log(this.destinations);
        }
        this.noOfTrips = newNoOfTrips;
      })
    );
  }

  createNewTripDest(startIdx: number, endIdx: number){

    for (let i = startIdx; i < endIdx; i++) {
      const destination = new Destinations();
      destination.name = '';
      destination.dateFrom = null;
      destination.dateTo = null;

      this.destinations.push(this.reactiveFormService.initDestinationFormGrp());
      this.sharedVar.createTripModel.tripDetails.destinations.push(destination);
    }
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
    this['dateFrom_error_' + index] = !destination.dateFrom ? 1 : 0;
    this.validateDateFromAndTo(index);
  }

  onChangeDateTo(index: number){
    this.validateDateTo(index);
    this.destinations.at(index).get('dateTo').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateTo);
  }

  validateDateTo(index: number) {
    const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
    this['dateTo_error_' + index] = !destination.dateTo ? 1 : 0;
    this.validateDateFromAndTo(index);
  }

  validateDateFromAndTo(index: number) {
    if(this['dateTo_error_' + index] == 0 && this['dateFrom_error_' + index] == 0){
      this.getDestinationFormDateFrom(index).setErrors(null);
      this.getDestinationFormDateTo(index).setErrors(null);
    }
  }

  validateAllDate(){
    const destinations = this.sharedVar.createTripModel.tripDetails.destinations;
    for(let i=0; i<destinations.length; i++){
      this['dateFrom_error_' + i] = !destinations[i].dateFrom ? 1 : 0;
      this['dateTo_error_' + i] = !destinations[i].dateTo ? 1: 0;
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



