
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  userData:any; 
  userList=[];
  maps=[];
  profile:any;
  file:any;

    constructor(private formBuilder: FormBuilder,private router: Router) { }
    ngOnInit() {
      
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobile: ['', [Validators.required, Validators.minLength(10)]],
          state: ['', [Validators.required]],
          country: ['', [Validators.required]],
          address: ['', [Validators.required]],
      });
  }
  onFileChanged(event) {
    this.file = event.target.value;
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let reqData=this.marshalData();
    let userDB= sessionStorage.getItem("userData");
    if(userDB!=null ){
     this.userList=JSON.parse(userDB);
     this.userList.push(reqData);
     sessionStorage.setItem("userData",JSON.stringify(this.userList));
   }else{
    this.maps.push(reqData);
    sessionStorage.setItem("userData",JSON.stringify(this.maps));
   }
    this.router.navigate(["./profile"]);
   }

   private  marshalData(){
   
    this.userData={};
     this.userData.firstName=  this.registerForm.value.firstName;
     this.userData.lastName= this.registerForm.value.lastName;
     this.userData.address = this.registerForm.value.address;
     this.userData.country =  this.registerForm.value.country;
     this.userData.email=  this.registerForm.value.email;
     this.userData.mobile=  this.registerForm.value.mobile;
     this.userData.state=  this.registerForm.value.state;
     this.userData.profilePic=this.file;
     return this.userData;
   }

}
