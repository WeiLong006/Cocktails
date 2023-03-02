import { Component } from '@angular/core';
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
  searchInput = '';
  // searchResult: any[] = [];
  searchResult: any;

  getInput(e: any) {
    this.searchInput = e.target.value;
  }

  getSearch() {
    // console.log(this.searchInput);
    this.searchCocktail();
  }

  constructor(private http: HttpClient) {}

  searchCocktail() {
    let search = new HttpHeaders({ name: this.searchInput });
    this.http
      .post<Response>('http://127.0.0.1:5001/fave/search', {
        name: this.searchInput,
      })
      .subscribe((data) => {
        this.searchResult = data;
        console.log(this.searchResult);
        console.log(this.searchResult[0].image);
      });
  }
}
