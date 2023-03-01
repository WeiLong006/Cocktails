import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data = {};
  email = '';
  userDetails = {};
  password = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let headers = new HttpHeaders({});
    this.http
      .get<any>('http://127.0.0.1:5001/fave/favourites', {
        headers: headers,
      })
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }

  logIn() {
    let headers = new HttpHeaders({});
    this.http
      .post('http://127.0.0.1:5001/users/sign-in', {
        email: this.email,
        password: this.password,
      })
      .subscribe((data) => {
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

  submitUserEmail() {
    this.userDetails = { email: this.email, password: this.password };
    this.logIn();
    console.log(this.userDetails);
  }
}
