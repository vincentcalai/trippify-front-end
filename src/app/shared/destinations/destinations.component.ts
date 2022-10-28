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
  cityListArray: string[][] = [[]];

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public controlContainer: ControlContainer) {
  }


  ngOnInit(): void {
    this.noOfTrips = this.sharedVar.createTripModel.tripDetails.noOfDestinations;
    this.initDestFormGroup(this.noOfTrips);

    this.subscriptions.add(
      this.events.subscribe(newNoOfTrips => {
        this.destinations.clear();
        this.initDestFormGroup(newNoOfTrips);
        this.noOfTrips = newNoOfTrips;
      })
    );
  }

  initDestFormGroup(newNoOfTrips: number) {
    let prevReqDestinations = this.sharedVar.createTripModel.tripDetails.destinations;
    for(let i = 0; i < newNoOfTrips; i++){
      let cityListOptions = [];
      this.cityListArray.push(cityListOptions);
      this.destinations.push(this.reactiveFormService.initDestinationFormGrp());
      if(!prevReqDestinations[i]){
        const destination = new Destinations();
        destination.ctryName = null;
        destination.cityName = null;
        destination.dateFrom = null;
        destination.dateTo = null;
        this.sharedVar.createTripModel.tripDetails.destinations.push(destination);
      } else{
        if(prevReqDestinations[i].ctryName){
          let cities = this.sharedVar.destMap.get(prevReqDestinations[i].ctryName);
          cities.forEach(city => this.cityListArray[i].push(city));
        }
        if(prevReqDestinations[i].dateTo) this['dateTo_error_' + i] = 0;
        if(prevReqDestinations[i].dateFrom) this['dateFrom_error_' + i] = 0;
        this.validateDateFromLaterThanDateTo(i, prevReqDestinations[i].dateFrom, prevReqDestinations[i].dateTo);
        this.getDestinationFormCtryName(i).setValue(prevReqDestinations[i].ctryName);
        this.getDestinationFormCityName(i).setValue(prevReqDestinations[i].cityName);
        this.getDestinationFormDateFrom(i).setValue(prevReqDestinations[i].dateFrom);
        this.getDestinationFormDateTo(i).setValue(prevReqDestinations[i].dateTo);
      }
    }

  }

  onChangeCtryDest(index: number, name: string){
    this.cityListArray[index] = [];
    this.sharedVar.createTripModel.tripDetails.destinations[index].cityName = '';
    this.getDestinationFormCtryName(index).setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].ctryName);
    let cities = this.sharedVar.destMap.get(name);
    cities.forEach(city => this.cityListArray[index].push(city));
  }

  onChangeCityDest(index: number, name: string){
    this.getDestinationFormCityName(index).setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].cityName);
  }

  onChangeDate(index: number, dateType: string){
    const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
    if(dateType === 'dateFrom'){
      this['dateFrom_error_' + index] = this.validateDate(destination.dateFrom);
      this.getDestinationFormDateFrom(index).setValue(destination.dateFrom);
    } else if(dateType == 'dateTo'){
      this['dateTo_error_' + index] = this.validateDate(destination.dateTo);
      this.getDestinationFormDateTo(index).setValue(destination.dateTo);
    }
    if((this['dateFrom_error_' + index] == 0 || this['dateFrom_error_' + index] == 3) && (this['dateTo_error_' + index] == 0 || this['dateTo_error_' + index] == 3)){
      this.validateDateFromLaterThanDateTo(index, destination.dateFrom, destination.dateTo);
    }
  }

  // onChangeDateFrom(index: number){
  //   const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
  //   this['dateFrom_error_' + index] = this.validateDate(destination.dateFrom);
  //   this.getDestinationFormDateFrom(index).setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateFrom);
  // }

  // onChangeDateTo(index: number){
  //   const destination = this.sharedVar.createTripModel.tripDetails.destinations[index];
  //   this['dateTo_error_' + index] = this.validateDate(destination.dateTo);
  //   this.getDestinationFormDateTo(index).setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateTo);
  // }

  validateDate(date: any) {
    if(!date) {
      return 1;
    }else if(this.isDateFormatInvalid(date)){
      return 2;
    }
    return 0;
  }

  validateDateFromLaterThanDateTo(index, dateFrom, dateTo) {
    if (dateFrom && dateTo) {
      const dateFromValue = this.reactiveFormService.getMomentDateFormat(dateFrom);
      const dateToValue = this.reactiveFormService.getMomentDateFormat(dateTo);
      if (dateToValue.isBefore(dateFromValue, 'day')) {
        this['dateTo_error_' + index] = 3;
        this['dateFrom_error_' + index] = 3;
      } else{
        this['dateTo_error_' + index] = 0;
        this['dateFrom_error_' + index] = 0;
      }
    }
  }

  isDateFormatInvalid(date: any): boolean {
      if(!(date.year && date.month && date.day)){
        return true;
      }
      if(!this.reactiveFormService.DATE_YEAR_REGEX.test(date.year)){
        return true;
      }
      if(!this.reactiveFormService.DATE_MONTH_REGEX.test(date.month)){
        return true;
      }
      if(!this.reactiveFormService.DATE_DAY_REGEX.test(date.day)){
        return true;
      }
      return false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get destinations(){
    return this.controlContainer.control.get('destinations') as FormArray;
  }

  getDestinationFormCtryName(index: number){
    return this.destinations.get(index.toString()).get('ctryName');
  }

  getDestinationFormCityName(index: number){
    return this.destinations.get(index.toString()).get('cityName');
  }

  getDestinationFormDateFrom(index: number){
    return this.destinations.get(index.toString()).get('dateFrom');
  }

  getDestinationFormDateTo(index: number){
    return this.destinations.get(index.toString()).get('dateTo');
  }

}



