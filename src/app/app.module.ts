import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    NavbarComponent,
    ErrorComponent,
    RegisterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
