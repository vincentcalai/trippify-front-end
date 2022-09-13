import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-particular-form',
  templateUrl: './create-particular-form.component.html',
  styleUrls: ['./create-particular-form.component.css']
})
export class CreateParticularFormComponent implements OnInit {

  public createTripForm: FormGroup;
  public isUserRegistered: boolean;

  constructor(public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,) { }

  ngOnInit(): void {
    this.isUserRegistered = true;

    this.createTripForm = this.initializeCreateTripForm();
    console.log("this.isUserRegistered : " + this.isUserRegistered);
    console.log("this.createTripForm : " + this.createTripForm);

    this.onChanges();

  }

  fieldIsInvalid(name: string){

  }

  onChanges(): void {
    this.createTripForm.get('staticQn1')!.valueChanges.subscribe(val => {
      console.log(val);
      if(this.sharedVar.STATIC_QN_1_VAL_MAP.get(val)){
        this.createTripForm.controls['name'].disable();
        this.createTripForm.controls['email'].disable();
      } else{
        this.createTripForm.controls['name'].enable()
        this.createTripForm.controls['email'].enable();
      }
    });
  }

  initializeCreateTripForm(): FormGroup {
    const rfg =  this.reactiveFormService.initializeCreateTripForm();
    return rfg;
  }

  confirmClicked(){
    console.log("confirm clicked!");
    console.log(this.createTripForm);
  }

}
