import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';  
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

