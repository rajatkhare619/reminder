import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailScriptUrl = 'https://script.google.com/macros/s/AKfycbwMb9f0X77vuOTevTyKpgluYmDCMxGaOCgEpybQjAYMfQdgYWI/exec';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  sendEmail() {
  const formData = new FormData();

  formData.append("email", "test@example.com");
    formData.append("message", "Hello");
    this.http.post(this.emailScriptUrl, {name: "Application Desvelopment Analystd"}, this.httpOptions)
      .subscribe(res => {
        console.log(res);
      } );
  }
}
