import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Response {
  access: any;
  refresh: any;
  role: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  fetchData = { access: String };
  email = '';
  userDetails = {};
  password = '';
  accessToken = '';
  refreshToken = '';
  role = '';
  display = 'block';

  //create new user
  createEmail = '';
  createName = '';
  createMobile = '';
  createPassword = '';
  createRole = 'normal';
  createModalDisplay = false;

  constructor(private http: HttpClient) {}

  logIn() {
    console.log(this.email);
    this.http
      .post<Response>('http://127.0.0.1:5001/users/sign-in', {
        email: this.email,
        password: this.password,
      })
      .subscribe((data) => {
        this.accessToken = data.access;
        this.refreshToken = data.refresh;
        this.role = data.role;
        if (this.accessToken) {
          this.display = 'none';
        }
        console.log(this.accessToken);
        console.log(this.refreshToken);
        console.log(this.role);
        console.log(data);
      });
  }

  getUserEmail(e: any) {
    this.email = e.target.value;
    // console.log(this.email);
  }

  getUserPassword(e: any) {
    this.password = e.target.value;
  }

  // Create new user

  getCreateEmail(e: any) {
    this.createEmail = e.target.value;
  }

  getCreateName(e: any) {
    this.createName = e.target.value;
  }

  getCreateMobile(e: any) {
    this.createMobile = e.target.value;
  }

  getCreatePassword(e: any) {
    this.createPassword = e.target.value;
  }

  createUser() {
    this.http
      .put<Response>('http://127.0.0.1:5001/users/create-user', {
        email: this.createEmail,
        name: this.createName,
        mobile_number: this.createMobile,
        password: this.createPassword,
        role: this.createRole,
      })
      .subscribe((data) => {
        console.log(data);
        this.createModalDisplay = false;
      });
  }

  openModal() {
    this.createModalDisplay = true;
  }

  closeModal() {
    this.createModalDisplay = false;
  }
}
