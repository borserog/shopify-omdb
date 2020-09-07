import { MovieService } from './movie/services/movie.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subject, noop } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { MovieItem, MovieItems } from './movie/models/MovieItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  movies$: Observable<MovieItems>;

  movieSubject = new Subject();
  onDestroy = new Subject<void>();
  disableSelections = false;
  initialQuery = 'titanic';
  page = 1;
  loading = false;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.movieSubject.pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(([queryParam, numberOfResults]) => {
        return this.movieService.getMovies(queryParam, numberOfResults.toString());
      }),
    );
  }

  ngAfterViewInit(): void {
    this.movieSubject.next([this.initialQuery, this.page]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onInputChange(content: string): void {
    this.page = 1;
    this.movieSubject.next([content, this.page]);
  }

  isMovieNominated(movie: MovieItem): boolean {
    return this.movieService.isMovieNominated(movie);
  }

  isNominationLimitReached(): boolean {
    return this.movieService.nominationLimitReached();
  }

  onMovieNominated(movie: MovieItem): void {
    this.movieService.addNominatedMovie(movie);
  }

  onNominationRemoved(removedMovie: MovieItem): void {
    return this.movieService.removeNominatedMovie(removedMovie);
  }

  nextPage(filterInput: string): void {
    this.page++;
    this.movieSubject.next([filterInput, this.page]);
  }

  previousPage(filterInput: string): void {
    this.page--;
    this.movieSubject.next([filterInput, this.page]);
  }

  getTotalPages(totalResults: number): number {
    return Math.ceil(totalResults / 10);
  }
}
