import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Response {
  name: any;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  //for search
  searchInput = '';
  searchResult: any;
  clickedImage: any = [];
  modalDisplay: any;

  //for favourites
  @Input() email = '';
  @Input() accessToken = '';
  refreshToken = '';
  favourites: any;
  favouritesDisplay = false;
  confirmDeleteAll = false;

  //for update password
  passwordModalDisplay: any;
  newPassword = '';

  //for search
  getInput(e: any) {
    this.searchInput = e.target.value;
  }

  getSearch() {
    // console.log(this.searchInput);
    this.searchCocktail();
    console.log(this.email);
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

  // functions for update password
  getNewPassword(e: any) {
    this.newPassword = e.target.value;
  }

  getPasswordModal() {
    this.passwordModalDisplay = true;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchCocktail();
  }

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
          this.favouritesDisplay = false;
          this.searchResult = data;
          // console.log('error');
          // console.log(data);
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

  searchFavourites() {
    const headers = new HttpHeaders({ authorization: this.accessToken });
    this.http
      .post<Response>(
        'http://127.0.0.1:5001/fave/favourites',
        {
          email: this.email,
        },
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.favouritesDisplay = true;
          this.favourites = data;
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
                this.searchFavourites();
              });
          } else {
            alert(e.error.message);
          }
        },
      });
  }

  createFavourites(e: any) {
    console.log(this.accessToken);
    const headers = new HttpHeaders({ authorization: this.accessToken });
    // console.log(this.accessToken);
    this.http
      .put<Response>(
        'http://127.0.0.1:5001/fave/create-fave',
        {
          email: this.email,
          name: e.name,
          category: e.category,
          instruction: e.instruction,
          glass: e.glass,
          ingredient1: e.ingredient1,
          ingredient2: e.ingredient2,
          ingredient3: e.ingredient3,
          ingredient4: e.ingredient4,
          ingredient5: e.ingredient5,
          image: e.image,
        },
        { headers }
      )
      .subscribe({
        next: (data) => {
          // console.log(data);
          alert(`${data.name} has been added to your favourites!`);
          this.closeModal();
        },
        error: (e) => {
          console.log(e.error.message);
          // this.refreshToken = localStorage.getItem('refresh');
          if (e.error.message == 'Expired') {
            this.http
              .post<Response>('http://127.0.0.1:5001/users/refresh', {
                refresh: localStorage.getItem('refresh'),
              })
              .subscribe((data) => {
                // console.log((<any>data).access);

                this.accessToken = (<any>data).access;
                console.log(this.accessToken);
              });
          } else {
            alert(e.error.message);
          }
        },
      });
  }

  deleteFavourites(e: any) {
    const headers = new HttpHeaders({ authorization: this.accessToken });
    if (confirm(`Are you sure you wish to delete ${e.name}?`)) {
      this.http
        .post<Response>(
          'http://127.0.0.1:5001/fave/delete-fave',
          {
            email: this.email,
            name: e.name,
            category: e.category,
            instruction: e.instruction,
            glass: e.glass,
            ingredient1: e.ingredient1,
            ingredient2: e.ingredient2,
            ingredient3: e.ingredient3,
            ingredient4: e.ingredient4,
            ingredient5: e.ingredient5,
            image: e.image,
          },
          { headers }
        )
        .subscribe({
          next: (data) => {
            this.searchFavourites();
            console.log(data);
            alert(`${e.name} has been deleted!`);
          },
          error: (e) => {
            if (e.error.message == 'Expired') {
              this.http
                .post<Response>('http://127.0.0.1:5001/users/refresh', {
                  refresh: localStorage.getItem('refresh'),
                })
                .subscribe((data) => {
                  // console.log((<any>data).access);

                  this.accessToken = (<any>data).access;
                  console.log(this.accessToken);
                });
            } else {
              alert(e.error.message);
            }
          },
        });
    }
  }

  deleteAllFavourites() {
    const headers = new HttpHeaders({ authorization: this.accessToken });
    if (confirm(`Are you sure you wish to delete all?`)) {
      this.http
        .post<Response>(
          'http://127.0.0.1:5001/fave/delete-all',
          {
            email: this.email,
          },
          { headers }
        )
        .subscribe({
          next: (data) => {
            this.searchFavourites();
            console.log(data);
          },
          error: (e) => {
            if (e.error.message == 'Expired') {
              this.http
                .post<Response>('http://127.0.0.1:5001/users/refresh', {
                  refresh: localStorage.getItem('refresh'),
                })
                .subscribe((data) => {
                  this.accessToken = (<any>data).access;
                  console.log(this.accessToken);
                });
            } else {
              alert(e.error.message);
            }
          },
        });
    }
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
          alert(data);
          this.closeModal();
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
