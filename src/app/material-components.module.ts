import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCalendar, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSnackBar, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatChipsModule, MatNativeDateModule, MatSnackBarModule
  ],
  exports: [MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatChipsModule, MatNativeDateModule, MatSnackBarModule]
})
export class MaterialComponentsModule { }
