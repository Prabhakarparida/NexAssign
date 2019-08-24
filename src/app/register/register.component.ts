
import { Component, OnInit,OnChanges,SimpleChanges,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { IfStmt } from '@angular/compiler';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  listOfInterest=[];
  userInterest:string;
  submitted = false;
  userData:any; 
  userList=[];
  maps=[];
  profile:any;
  file:any;
  items = [];
  homeAddress:boolean=false;
  companyAddress:boolean=false;
  subscribe:any;
  uploadedImage: File;
  imagePreview: any;
      value: number = 20;
      options: Options = {
        floor: 20,
        ceil: 60,
      };
 
    constructor(private http: Http, private formBuilder: FormBuilder,private router: Router,private ng2ImgMax: Ng2ImgMaxService,public sanitizer: DomSanitizer) { }
    ngOnInit() 
    {
     this.formvalidation();
    }
  
    // Validation section start
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

//address field section start
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
  //address field section end

//Image section start 
   onImageChange(event) {
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 310, 350).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
        this.getImagePreview(this.uploadedImage);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
}
getImagePreview(file: File) {
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
}
//Image section end

  // User data section start
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
     this.userData.profilePic=this.imagePreview;
     this.userData.age=this.value;
     this.userData.intrest = this.items;
     return this.userData;
   }
// User data section end

onSubmit() {

  this.submitted = true;
  this.marshalData();
  this.http.post("http://localhost:3000/posts", this.userData)
  .subscribe(
    data => {
        this.router.navigate(['/profile']);
    },
    error => {
        
    });
 }

}
