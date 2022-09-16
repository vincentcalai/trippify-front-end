import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-trip-details-form',
  templateUrl: './create-trip-details-form.component.html',
  styleUrls: ['./create-trip-details-form.component.css']
})
export class CreateTripDetailsFormComponent implements OnInit {

  public createTripDetailsForm: FormGroup;

  constructor(public reactiveFormService: ReactiveFormService, public sharedVar: SharedVar) { }

  ngOnInit(): void {
    this.createTripDetailsForm = this.reactiveFormService.initializeCreateTripDetailsForm();
  }

  confirmClicked(){

  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  get staticQn2(){
    return this.createTripDetailsForm.get('staticQn2');
  }

  get destinations(){
    return this.createTripDetailsForm.get('destinations');
  }

  get dateFrom(){
    return this.createTripDetailsForm.get('dateFrom');
  }

  get dateTo(){
    return this.createTripDetailsForm.get('dateTo');
  }
}
