import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css'],
})
export class NormalUserComponent implements OnInit {
  //for search
  searchInput = '';
  searchResult: any;
  clickedImage: any = [];
  modalDisplay: any;
  @Input() accessToken = '';

  //for update password
  passwordModalDisplay: any;
  newPassword = '';
  @Input() email = '';

  // functions for search
  getInput(e: any) {
    this.searchInput = e.target.value;
  }

  getSearch() {
    // console.log(this.searchInput);
    this.searchCocktail();
  }

  getModal(e: any) {
    this.modalDisplay = true;
    this.clickedImage.push(e);
    console.log(this.clickedImage);
  }

  closeModal() {
    this.modalDisplay = false;
    this.passwordModalDisplay = false;
    this.clickedImage.pop();
  }

  ngOnInit(): void {
    this.searchCocktail();
  }

  // functions for update password
  getNewPassword(e: any) {
    this.newPassword = e.target.value;
  }

  getPasswordModal() {
    this.passwordModalDisplay = true;
  }

  constructor(private http: HttpClient) {}

  searchCocktail() {
    const headers = new HttpHeaders({ authorization: this.accessToken });
    this.http
      .post<Response>(
        'http://127.0.0.1:5001/fave/search',
        {
          name: this.searchInput,
        },
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.searchResult = data;
          console.log(this.searchResult);
        },
        error: (e) => {
          console.log(e);
          if (e.error.message == 'Expired') {
            this.http
              .post<Response>('http://127.0.0.1:5001/users/refresh', {
                refresh: localStorage.getItem('refresh'),
              })
              .subscribe((data) => {
                // console.log((<any>data).access);

                this.accessToken = (<any>data).access;
                console.log(this.accessToken);
                this.searchCocktail();
              });
          } else {
            alert(e.error.message);
          }
        },
      });
  }

  updatePassword() {
    const headers = new HttpHeaders({ authorization: this.accessToken });
    this.http
      .patch<Response>(
        'http://127.0.0.1:5001/users/update-password',
        {
          email: this.email,
          password: this.newPassword,
        },
        { headers }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
          if (e.error.message == 'Expired') {
            this.http
              .post<Response>('http://127.0.0.1:5001/users/refresh', {
                refresh: localStorage.getItem('refresh'),
              })
              .subscribe((data) => {
                // console.log((<any>data).access);

                this.accessToken = (<any>data).access;
                console.log(this.accessToken);
                this.updatePassword();
              });
          } else {
            alert(e.error.message);
          }
        },
      });
  }
}
