import { Component, OnInit } from '@angular/core';
import { Book } from '../service';
import {Observable} from  'rxjs';
import { BookService } from '../service';

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {


  nbBooks: number = 0;


  books: Book[] = [];
  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.countBooks().subscribe(nbBooks => this.nbBooks = nbBooks);
    this.bookService.getBooks().subscribe(books => this.books = books);
  }
}
