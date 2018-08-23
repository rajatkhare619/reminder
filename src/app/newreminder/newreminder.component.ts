import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent, MatSnackBar} from "@angular/material";
import {MessagingService} from "../messaging.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "../notification.service";
import {EmailService} from "../email.service";
import {SmsService} from "../sms.service";

@Component({
  selector: 'app-newreminder',
  templateUrl: './newreminder.component.html',
  styleUrls: ['./newreminder.component.scss'],
  encapsulation: ViewEncapsulation.None,

})

export class NewreminderComponent implements OnInit {

reminderOptions = ["Phone", "Email", "Browser notification"];
emails = [];
  selectedReminderMethods = [];
keyCodes = [ENTER, SPACE];
  minDate;
  scheduleTime;
  message;
  phone;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private msgService: MessagingService,
              private http: HttpClient,
              private notificationService: NotificationService,
              private snackbar: MatSnackBar,
              private emailService: EmailService,
              private smsService: SmsService) { }

  ngOnInit() {
    this.minDate = new Date();
  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.re.test(value)) {
      this.emails.push(value.trim());
    } else {
      this.snackbar.open("Please enter a valid email", null, {
        duration: 2000
      });
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

    if (this.selectedReminderMethods.includes("Phone")) {
      this.smsService.sendSms(this.message, this.phone, this.scheduleTime);
    }
    if (this.selectedReminderMethods.includes("Email")) {
      this.emailService.sendEmail(this.message, this.emails, this.scheduleTime);
    }
    if (this.selectedReminderMethods.includes("Browser notification")) {
      this.notificationService.setNotification(this.message, this.scheduleTime);
    }
  }

  selectedReminderMethodsChanged(methods) {
    if (methods.includes("Browser notification")) {
     this.notificationService.startOneSignal();
    }
  }
}
