import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBooksComponent } from './components/add-books/add-books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListComponent } from './components/books-list/book-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-books'},
  { path: 'books-list', component: BookListComponent},
  { path: 'add-books', component: AddBooksComponent},
  { path: 'edit-book/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
