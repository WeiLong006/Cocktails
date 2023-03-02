import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Response {
  name: any;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  //for search
  searchInput = '';
  searchResult: any;
  clickedImage: any = [];
  modalDisplay: any;

  //for favourites
  @Input() email = '';
  favourites: any;
  favouritesDisplay = false;

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
    this.clickedImage.pop();
  }

  constructor(private http: HttpClient) {}

  searchCocktail() {
    let search = new HttpHeaders({ name: this.searchInput });
    this.http
      .post<Response>('http://127.0.0.1:5001/fave/search', {
        name: this.searchInput,
      })
      .subscribe((data) => {
        this.favouritesDisplay = false;
        this.searchResult = data;
        console.log(this.searchResult);
      });
  }

  searchFavourites() {
    this.http
      .post<Response>('http://127.0.0.1:5001/fave/favourites', {
        email: this.email,
      })
      .subscribe((data) => {
        this.favouritesDisplay = true;
        this.favourites = data;
        console.log(data);
      });
  }

  createFavourites(e: any) {
    console.log(e.name);
    this.http
      .put<Response>('http://127.0.0.1:5001/fave/create-fave', {
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
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteFavourites(e: any) {
    this.http
      .post<Response>('http://127.0.0.1:5001/fave/delete-fave', {
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
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteAllFavourites() {
    this.http
      .post<Response>('http://127.0.0.1:5001/fave/delete-all', {
        email: this.email,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
