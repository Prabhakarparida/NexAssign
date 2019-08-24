
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { Options } from 'ng5-slider';
import { Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
   private products  = []; 
   imagepath:any;
   private intrestData = []
   items = [];
   registerForm: FormGroup;
   homeAddress:boolean=false;
   companyAddress:boolean=false;
   userData:any; 
   firstName:any;
   lastName:any;
   email:any;
   mobile:any;
   state:any;
   country:any;
   homeaddress1:any;
   homeaddress2:any;
   value: number = 20;
   options: Options = {
     floor: 20,
     ceil: 60,
   };

  constructor(private http: Http,private httpClient: HttpClient, private router: Router,private formBuilder: FormBuilder) {
    this.getuserData();
  
   }
   ngOnInit() {
    this.formvalidation();
  }
  formvalidation()
  {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
      intrestData: ['', [Validators.required]],
      homeAddress1: ['', [Validators.required]],
      homeAddress2: ['', [Validators.required]],
      companyAddress1: ['', [Validators.required]],
      companyAddress2: ['', [Validators.required]],
      subscribeData: ['', [Validators.required]],
  });
  }
   // Validation section end

  get f() 
   { 
    return this.registerForm.controls;
   }
   onSelect(event)
  {
    if(event=="Home")
    {
      this.homeAddress=true;
      this.companyAddress=false;
    }
    else if(event=="Company")
    {
      this.companyAddress=true;
      this.homeAddress=false;
    }
    else
    {
      this.companyAddress=false;
      this.homeAddress=false;
    }
  }
  getuserData()
  {
    this.httpClient.get("http://localhost:3000/posts/13").subscribe(res =>{
      this.products = [res];
      for ( let c of this.products ) {
            this.firstName = c.firstName;
            this.lastName = c.lastName;
            this.email = c.email;
            this.mobile = c.mobile;
            this.state = c.state;
            this.country = c.country;
            this.imagepath = c.profilePic;
            this.intrestData = c.intrest;
      }
  });

    }
    private  marshalData(){
      this.userData={};
       if(this.registerForm.value.subscribeData == true)
       {
         this.userData.subscribe="newsletters";
       }
       else{
        this.userData.subscribe="Not subscribe";
       }
       if(this.registerForm.value.address=="Home")
       {
        this.userData.homeaddress1 = this.registerForm.value.homeAddress1;
        this.userData.homeaddress2 = this.registerForm.value.homeAddress2;
       }
       else if(this.registerForm.value.address=="Company"){
        this.userData.companyaddress1 = this.registerForm.value.companyAddress1;
        this.userData.companyaddress2 = this.registerForm.value.companyAddress2;
       }
       this.userData.firstName= this.registerForm.value.firstName;
       this.userData.lastName= this.registerForm.value.lastName;
       this.userData.email=  this.registerForm.value.email;
       this.userData.mobile=  this.registerForm.value.mobile;
       this.userData.country =  this.registerForm.value.country;
       this.userData.state=  this.registerForm.value.state;
       this.userData.age=this.value;
       this.userData.intrest = this.items;
       return this.userData;
     }
     onSubmit() {
      this.marshalData();
      this.http.put("http://localhost:3000/posts/13", this.userData)
      .subscribe(
        data => {
            
        },
        error => {
            
        });
     }
}