import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../service/model/book';
import { finalize } from 'rxjs/operators';
import { BookService } from '../service/api/book.service';

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {

  book: Book = {
    title: '',
    isbn: '',
    language: Book.LanguageEnum.ENGLISH // set default value as a string enum
  };
  languages = Object.values(Book.LanguageEnum);

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {}

  create(): void {
    console.log('Submitting book:', this.book); // For debug
    this.bookService.createBook(this.book)
      .subscribe({
        next: () => this.router.navigate(['/book-list']),
        error: (err) => console.error('Error creating book:', err)
      });
  }
}
