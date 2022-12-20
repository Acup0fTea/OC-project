import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  // get id
  getID: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private NgZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private CrudService: CrudService
  ) {
    this.getID = this.activatedRoute.snapshot.paramMap.get('id');

    this.CrudService.GetBook(this.getID).subscribe(res => {
      this.updateForm.setValue({  // pull form book list
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    })

    this.updateForm = this.formBuilder.group({  // pull form book list
      name:[''],
      price:[''],
      description:['']
    })
  }
  ngOnInit() { }

  onUpdate(): any{
    this.CrudService.UpdateBook(this.getID, this.updateForm.value).subscribe(() => {
      console.log('Data updated');
      this.NgZone.run(() => this.router.navigateByUrl('/books-list'))
    }, (err) => {
      console.log(err);

    })
  }
}
