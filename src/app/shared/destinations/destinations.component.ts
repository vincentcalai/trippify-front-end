import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
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

  onChangeDateFrom(index: number, dateFrom: string){
    this.destinations.at(index).get('dateFrom').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateFrom);
  }

  onChangeDateTo(index: number, dateTo: string){
    this.destinations.at(index).get('dateTo').setValue(this.sharedVar.createTripModel.tripDetails.destinations[index].dateTo);
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
