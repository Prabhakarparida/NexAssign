
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  userList:any;
  currentUser:any;
  profileImage:any;
  constructor(private router: Router) {
    let userDB= sessionStorage.getItem("userData");
     this.userList=JSON.parse(userDB);
     this.currentUser=this.userList[this.userList.length-1];
     this.profileImage=this.currentUser.profilePic;
     console.log(this.profileImage);
   }
  ngOnInit() {
  }
}