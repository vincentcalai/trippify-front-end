import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
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

  onChangeDest(destination: string){
    console.log(destination);
    console.log(this.sharedVar.createTripModel.tripDetails.destinations);
    this.destinations.setValue(this.sharedVar.createTripModel.tripDetails.destinations);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get destinations(){
    return this.controlContainer.control.get('destinations');
  }

}
