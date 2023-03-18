import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { ResponseModel } from 'src/app/model/response.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public errorMsg: string = '';
  public createUserForm: FormGroup;

  subscriptions: Subscription = new Subscription();
  modalRef: BsModalRef;
  @ViewChild('confirmInputsModal', { static: true }) confirmInputsModal: TemplateRef<any>;

  constructor(public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public apiService: ApiService,
    public modalService: BsModalService,
    public sharedMethods: SharedMethods,
    private router: Router) { }

  ngOnInit(): void {
    this.createUserForm = this.initializeCreateUserForm();
    this.sharedMethods.initializeCreateUserModel();
  }

  initializeCreateUserForm(): FormGroup {
    const rfg =  this.reactiveFormService.initializeCreateUserForm();
    return rfg;
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  backToHomeScreen(){
    this.router.navigate([''], { skipLocationChange: true });
  }

  confirmClicked(){
    this.modalRef = this.modalService.show(this.confirmInputsModal, this.sharedVar.sharedModalConfig);
  }

  confirmCreateUser(){
    if(this.createUserForm.valid){
      this.sharedVar.createUserModel.user.username = this.username?.value;
      this.sharedVar.createUserModel.user.password = this.password?.value;
      this.sharedVar.createUserModel.user.contactNo = this.contactNo?.value;
      this.sharedVar.createUserModel.user.email = this.email?.value;
      console.log("create user success!");
      this.subscriptions.add(
        this.apiService.postCreateUser().pipe(take(1), finalize(() => {
          this.modalRef.hide();
        })).subscribe( (resp: ResponseModel) => {
          if (resp.statusCode != 0) {
            this.errorMsg = resp.resultMessage;
            resp.resultMessage = "";
          } else {
            this.sharedVar.changeResponse(resp);
            this.backToHomeScreen();
          }
        } ,
          error => {
          this.sharedVar.changeException(error);
        })
      );

    } else{
      console.log("create user failed!");
      this.reactiveFormService.displayValidationErrors(this.createUserForm);
    }
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get cfmPassword() {
    return this.createUserForm.get('cfmPassword');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get contactNo() {
    return this.createUserForm.get('contactNo');
  }


}
