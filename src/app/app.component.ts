import { MovieService } from './services/movie.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, EmptyError, ReplaySubject, Subject } from 'rxjs';
import { tap, map, delay, catchError, throttleTime, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'shopify-omdb';
  movies$: Observable<any>;
  movieSubject = new Subject();
  nominatedMovies = [];
  disableSelections = false;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.movieSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((queryParam: string) => {
        return this.movieService.getMovies(queryParam, '10').pipe(
          map(({ Search: movies }) => movies)
        );
      }),
    );
  }

  ngAfterViewInit(): void {
    this.movieSubject.next('titanic');
  }

  onKey(content: string): void {
    this.movieSubject.next(content);
  }

  onMovieCheck(state: string, option: any): void {
    if (state) {
      this.nominatedMovies.push(option);
    } else {
      this.removeNominated(option.imdbID);
    }

    // todo: turn into an event
    if (this.nominatedMovies.length >= 5) {
      this.disableSelections = true;
    } else {
      this.disableSelections = false;
    }
  }

  isMovieSelected(movieId: string): boolean {
    return this.nominatedMovies.some((movie) => movie.imdbID === movieId);
  }

  isSelectionDisabled(): boolean {
    return this.nominatedMovies.length >= 5;
  }

  removeNominated(movieId: string): void {
    this.nominatedMovies = this.nominatedMovies.filter((movie) => {
      return movie.imdbID !== movieId;
     } );
  }

  clearNominated(): void {
    this.nominatedMovies = [];
  }
}
