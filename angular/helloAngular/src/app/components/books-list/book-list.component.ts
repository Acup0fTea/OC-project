import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  Books:any = [];

  constructor (private CrudService: CrudService ) { }

  ngOninit (): void {
    this.CrudService.GetBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

  delete(id:any, i:any):void {
    console.log(id);
    if(window.confirm("Do you want to delete this product?")){
      this.CrudService.deleteBook(id).subscribe(res => {
        this.Books.splice(i, 1);
      })
    }
    
  }
}
