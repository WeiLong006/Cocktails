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
  searchResult: any;
  clickedImage: any = [];
  modalDisplay = false;

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
        this.searchResult = data;
        console.log(this.searchResult);
      });
  }
}
