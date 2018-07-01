import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCalendar, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatChipsModule, MatNativeDateModule
  ],
  exports: [MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatChipsModule, MatNativeDateModule]
})
export class MaterialComponentsModule { }
