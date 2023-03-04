import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NormalUserComponent } from './normal-user/normal-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminPageComponent,
    NormalUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
