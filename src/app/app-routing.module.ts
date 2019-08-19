import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { ProfileComponent } from './profile/profile.component'; 
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo:'/register', pathMatch:'full'},
  { path: 'profile', component: ProfileComponent },
 
  ];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } 
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
