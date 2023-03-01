import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  searchInput = '';

  getInput(e: any) {
    this.searchInput = e.target.value;
  }

  getSearch() {
    console.log(this.searchInput);
  }
}
