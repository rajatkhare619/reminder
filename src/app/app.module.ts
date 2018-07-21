import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialComponentsModule} from "./material-components.module";
import { NoteComponent } from './note/note.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./header/header.component";
import { NewreminderComponent } from './newreminder/newreminder.component';
import {RoutingModule} from "./routing/routing.module";
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@coachcare/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerModule, MomentDateModule,
        MomentDateAdapter} from '@coachcare/datepicker';
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
/*import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);*/

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    SidebarComponent,
    HeaderComponent,
    NewreminderComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FlexLayoutModule,
    RoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
