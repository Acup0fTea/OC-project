import { Component,OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent {

  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ){ 
    this.bookForm = this.formBuilder.group({
      name:[''],
      price:[''],
      description:['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): any{
    this.crudService.Addbook(this.bookForm.value)
    .subscribe({
      complete: () => console.log('Data added successfully'),
      next: () => this.ngZone.run(() => this.router.navigateByUrl('/books-list')),
      error: (err) => console.log(err)
    })
  }
}

/* .subscribe({
  complete: () => console.log('Data added successfully'),
  next: () => this.ngZone.run(() => this.router.navigateByUrl('/books-list')),
  error: (err) => console.log(err)
})
*/
/*    .subscribe(() => {
      console.log("Data added successfully");
      this.ngZone.run(() => this.router.navigateByUrl('/books-list'))   // return to show product
    }, (err) => {
      console.log(err);  
    })*/