import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewreminderComponent} from "../newreminder/newreminder.component";
import {WelcomeComponent} from "../welcome/welcome.component";
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'addreminder', component: NewreminderComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
