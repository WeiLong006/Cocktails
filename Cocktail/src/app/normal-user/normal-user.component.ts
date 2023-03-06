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
  @Input() accessToken = ""

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

  ngOnInit(): void {
    this.searchCocktail();
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
      .subscribe((data) => {
        this.searchResult = data;
        console.log(this.searchResult);
      });
  }
}
