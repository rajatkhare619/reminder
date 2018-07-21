import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";
import {MessagingService} from "../messaging.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  scheduleTime;
  message;
  constructor(private msgService: MessagingService, private http: HttpClient) { }

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
   this.scheduleTime = date.value._d;
  }

  addReminder() {
    this.msgService.getPermission();
  }

  sendnotif() {
    const url = 'https://onesignal.com/api/v1/notifications';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ZGI5MTk3MjQtYmFmZi00YWM2LWJhMTEtMDUzYWMyNTM3N2Zm'
      })
    };
    const body = {
      "app_id": "5a844928-023c-4201-bb5d-d055cd760859",
      "include_player_ids": ["9ea0f20c-ba24-4691-b489-9cbba523a058"],
      "data": {"foo": "bar"},
      "contents": {"en": this.message},
      "send_after": this.scheduleTime
    };

    this.http.post(url, body, httpOptions)
      .subscribe(res => {
        console.log(res);
      } );
  }
}
