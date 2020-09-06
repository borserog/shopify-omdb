import { Subject, Observable } from 'rxjs';
import { MovieService } from './../services/movie.service';
import { MovieItem } from './../models/MovieItem.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-nominated',
  templateUrl: './nominated.component.html',
  styleUrls: ['./nominated.component.scss']
})
export class NominatedComponent implements OnInit {

  nominatedMovies$: Observable<MovieItem[]>;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.nominatedMovies$ = this.movieService.nominatedMoviesSubject;
  }

  removeNominated(movie: MovieItem): void {
    this.movieService.removeNominatedMovie(movie);
  }

  clearNominated(): void {
    this.movieService.clearNominated();
  }

}
