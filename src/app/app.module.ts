import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';  
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng5SliderModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2ImgMaxModule,
    HttpModule,
    HttpClientModule, 
 
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
  
  ],

  bootstrap: [AppComponent]
  
})
export class AppModule { }

