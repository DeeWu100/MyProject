import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service';
import { Book } from '../service';
import { map, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'bs-book-detail',
  templateUrl: './book-detail.component.html',
  styles: []
})
export class BookDetailComponent implements OnInit {

  book!: Book;  // Use non-null assertion instead of @ts-ignore

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params['bookId']),
        switchMap(id => this.bookService.getBook(id))
      )
      .subscribe({
        next: book => this.book = book,
        error: err => console.error('Failed to load book', err)
      });
  }

  delete(): void {
    if (!this.book?.id) {
      console.error('No book ID found');
      return;
    }

    this.bookService.deleteBook(this.book.id)
      .pipe(
        finalize(() => this.router.navigate(['/book-list']))
      )
      .subscribe({
        next: () => console.log('Book deleted'),
        error: err => console.error('Delete failed', err)
      });
  }
}
