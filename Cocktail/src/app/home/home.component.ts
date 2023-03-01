import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  fetchData = { access: String };
  email = '';
  userDetails = {};
  password = '';
  accessToken = '';
  refreshToken = '';
  role = '';
  display = 'block';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let headers = new HttpHeaders({});
    this.http
      .get<any>('http://127.0.0.1:5001/fave/favourites', {
        headers: headers,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  logIn() {
    let headers = new HttpHeaders({});
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

  submitUserEmail() {
    this.userDetails = { email: this.email, password: this.password };
    this.logIn();
    console.log(this.userDetails);
  }
}
