import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, Form, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
        this.noOfTrips = val;
      })
    );
    console.log("in destinations component!");
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
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
    //return this.controlContainer.control['destinations'] as FormArray;
  }

}
