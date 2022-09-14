import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-particular-form',
  templateUrl: './create-particular-form.component.html',
  styleUrls: ['./create-particular-form.component.css']
})
export class CreateParticularFormComponent implements OnInit {

  subscriptions = new Subscription();
  public createTripForm: FormGroup;
  public isUserRegistered: any = null;
  public username = ["VINCENT"];


  constructor(public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,) { }

  ngOnInit(): void {
    this.createTripForm = this.initializeCreateTripForm();

    this.subscriptions.add(
      this.createTripForm.get('staticQn1')!.valueChanges.subscribe(val => {
        this.isUserRegistered = this.sharedVar.STATIC_QN_1_VAL_MAP.get(val);
        if(this.isUserRegistered){
          this.clearForm();
        } else{
          this.createTripForm.get('email')?.enable();
        }
      })
    )

    this.subscriptions.add(
      this.createTripForm.get('name')!.valueChanges.subscribe(val => {
        if(this.isUserRegistered){
          this.retrieveUserEmail();
          this.createTripForm.get('email')?.disable();
        }
      })
    )
  }
  clearForm() {
    this.name?.setValue(null);
    this.email?.setValue(null);
  }

  retrieveUserEmail(){
    console.log(this.createTripForm.get('name')!.value);
    if(this.createTripForm.get('name')!.value){
      this.email?.setValue("VINCENTCALAI@GMAIL.COM");
    }
  }

  initializeCreateTripForm(): FormGroup {
    const rfg =  this.reactiveFormService.initializeCreateTripForm();
    return rfg;
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  confirmClicked(){
    console.log("confirm clicked!" + " is form valid? : " + this.createTripForm.valid);
    console.log(this.createTripForm);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get staticQn1() {
    return this.createTripForm.get('staticQn1');
  }

  get name() {
    return this.createTripForm.get('name');
  }

  get email() {
    return this.createTripForm.get('email');
  }

}
