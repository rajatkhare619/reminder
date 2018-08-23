import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  serverURL = 'https://remindmeapplication.herokuapp.com';
  constructor(private http: HttpClient) { }

  sendEmail(message, to, scheduledTime) {
    const delayInMinutes = Math.round((scheduledTime.getTime() - new Date().getTime()) / 60000);
    this.http.get(`${this.serverURL}/email/${message}/${to}/${delayInMinutes}`, {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      });
  }
}
