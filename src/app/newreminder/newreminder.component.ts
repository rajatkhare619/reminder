import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, OnChanges,
  OnInit, Renderer2,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {COMMA, ENTER, SPACE, NUMPAD_MINUS} from "@angular/cdk/keycodes";
import {MatChipInputEvent, MatSnackBar} from "@angular/material";
import {MessagingService} from "../messaging.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationService} from "../notification.service";
import {EmailService} from "../email.service";
import {SmsService} from "../sms.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newreminder',
  templateUrl: './newreminder.component.html',
  styleUrls: ['./newreminder.component.scss'],
  encapsulation: ViewEncapsulation.None,

})

export class NewreminderComponent implements OnInit {
  t=false;
  oneSignalStarted = false;
  reminderOptions = ["Phone", "Email", "Browser notification"];
  emails = [];
  emailsValid = true;
  showEmail = false;
  showPhone = false;
  showDateTimePicker = false;
  selectedReminderMethods = [];
  keyCodes = [ENTER, SPACE, COMMA];
  minDate;
  scheduleTime;
  message;
  phone;
  formValid = false;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  reminderForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    selectedReminderMethods: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    email: new FormControl(''),
    emails: new FormArray([]),
    time: new FormControl(new Date())
  });

  @ViewChildren('chipList') chipList;
  constructor(private msgService: MessagingService,
              private http: HttpClient,
              private notificationService: NotificationService,
              private snackbar: MatSnackBar,
              private emailService: EmailService,
              private smsService: SmsService,
              private changeDetRef: ChangeDetectorRef,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.minDate = new Date();
    this.reminderForm.get('selectedReminderMethods').valueChanges.subscribe((methods) => {
      console.log(methods);
      methods.includes("Phone") ? (this.showPhone = true, this.reminderForm.get('phone').setValidators([Validators.required])) : (this.showPhone = false, this.reminderForm.get('phone').setValidators([]));
      methods.includes("Email") ? (this.showEmail = true, this.reminderForm.get('email').setValidators([Validators.required])) : (this.showEmail = false, this.reminderForm.get('email').setValidators([]));
      if (methods.includes("Browser notification") && !this.oneSignalStarted) {
        this.notificationService.startOneSignal();
        this.oneSignalStarted = true;
      }
      this.isValidEmails();
      this.showDateTimePicker = methods.length > 0;

    });
    this.reminderForm.valueChanges.subscribe((value) => {
      this.isValidEmails();
      if (this.reminderForm.controls['phone'].status === "VALID" && this.reminderForm.controls['message'].status === "VALID"
        && this.reminderForm.controls['time'].status === "VALID" && this.reminderForm.controls['selectedReminderMethods'].status === "VALID"
        && this.emailsValid) {
        this.formValid = true;
      } else {
        this.formValid = false;
      }
     // console.log(this.reminderForm);
    });
    this.changeDetRef.detectChanges();

  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.re.test(value.trim())) {
      const emails = this.reminderForm.get('emails') as FormArray;
      emails.push(new FormControl(value.trim()));
    } else {
      this.snackbar.open("Please enter a valid email", null, {
        duration: 2000
      });
    }

    if (input) {
      input.value = '';
    }

    this.isValidEmails();
  }

  removeEmail(index: number): void {
    const emails = this.reminderForm.get('emails') as FormArray;

    if (index >= 0) {
      emails.removeAt(index);
    }

    this.isValidEmails();
  }

  getDate(date) {
    this.scheduleTime = date.value._d;
  }

  addReminder() {
    const message = this.reminderForm.get('message').value;
    const methods = this.reminderForm.get('selectedReminderMethods').value;
    const emails = this.reminderForm.get('emails').value;
    const time = this.scheduleTime || new Date();
    if (methods.includes("Phone")) {
      this.smsService.sendSms(message, this.reminderForm.get('phone').value, time);
    }
    if (methods.includes("Email")) {

      this.emailService.sendEmail(message, emails, time);

    }
    if (methods.includes("Browser notification")) {
      this.notificationService.setNotification(message, time);
    }

    this.snackbar.open("Reminder set", null, { duration: 2000} );
  }

  isValidEmails() {
    if (this.reminderForm.get('selectedReminderMethods').value && this.reminderForm.get('selectedReminderMethods').value.includes('Email')) {
      (this.reminderForm.get('emails') as FormArray).length > 0 ? (this.emailsValid = true, this.reminderForm.controls['email'].setErrors(null)) : (this.emailsValid = false);
    } else {
      this.emailsValid = true;
    }
  }

  resetForm() {
    this.reminderForm.reset({
      message: '',
      selectedReminderMethods: [],
      phone: '',
      email:'',
      emails: new FormArray([]),
      time: new Date().setTime(new Date().getTime() + (60 * 60 * 1000))
    });
    while((this.reminderForm.controls['emails'] as FormArray).length !== 0) {
      (this.reminderForm.controls['emails'] as FormArray).removeAt(0);
    }
  }

}
