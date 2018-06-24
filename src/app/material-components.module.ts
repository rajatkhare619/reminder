import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule
  ],
  exports: [MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule]
})
export class MaterialComponentsModule { }
