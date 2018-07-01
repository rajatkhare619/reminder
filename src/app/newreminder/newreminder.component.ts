import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";

@Component({
  selector: 'app-newreminder',
  templateUrl: './newreminder.component.html',
  styleUrls: ['./newreminder.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NewreminderComponent implements OnInit {
reminderOptions = ["Phone", "Email", "Browser notification"];
emails = [];
keyCodes = [ENTER, SPACE];
  minDate;
  constructor() { }

  ngOnInit() {
    this.minDate = new Date();
  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeEmail(email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  getDate(date) {
    console.log(date.value._d);
  }
}
