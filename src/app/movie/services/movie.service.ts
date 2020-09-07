import { MovieItem, MovieItems, emptyMovieItems } from './../models/MovieItem.model';
import { MoviesDTO, isMovieDTOValid } from './../models/movieDTO.model';
import { mapMoviesDtoToItems } from '../models/MovieItem.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly API_KEY = '1e66e61d';
  private static readonly RESOURCE_URL = `http://www.omdbapi.com/?apikey=${MovieService.API_KEY}&`;
  private static readonly LOCAL_STORAGE_KEY = 'omdbNominatedMovies';

  private nominatedMovies: MovieItem[] = this.getNominatedMoviesFromLocalStorage();
  readonly nominatedMoviesSubject = new BehaviorSubject<MovieItem[]>(this.nominatedMovies);

  constructor(
    private http: HttpClient
  ) {  }

  getMovies(title: string, page: string): Observable<MovieItems> {
    return this.http.get<MoviesDTO>(MovieService.RESOURCE_URL, { params: {
      s: title,
      page,
      type: 'movie',
    }}).pipe(
      map((moviesDTO) => {
        if (isMovieDTOValid(moviesDTO)) {
          return mapMoviesDtoToItems(moviesDTO);
        }
        return emptyMovieItems;
      })
    );
  }

  addNominatedMovie(movie: MovieItem): void {
    this.nominatedMovies.push(movie);
    this.nominatedMoviesSubject.next(this.nominatedMovies);
    this.nominatedMoviesToLocalStorage();
  }

  isMovieNominated(movie: MovieItem): boolean {
    return this.nominatedMovies.some((nominatedMovie) => nominatedMovie.imdbId === movie.imdbId);
  }

  removeNominatedMovie(movie: MovieItem): void {
    this.nominatedMovies = this.nominatedMovies.filter((nominatedMovie) => {
      return nominatedMovie.imdbId !== movie.imdbId;
     } );
    this.nominatedMoviesSubject.next(this.nominatedMovies);
    this.nominatedMoviesToLocalStorage();
  }

  nominationLimitReached(): boolean {
    return this.nominatedMovies.length >= 5;
  }

  clearNominated(): void {
    console.log('clear nominated');
    this.nominatedMovies = [];
    this.nominatedMoviesSubject.next(this.nominatedMovies);
    localStorage.removeItem(MovieService.LOCAL_STORAGE_KEY);
  }

  getNominatedMovies(): MovieItem[] {
    return [...this.nominatedMovies];
  }

  getNominatedMoviesFromLocalStorage(): MovieItem[] {
    return JSON.parse(localStorage.getItem(MovieService.LOCAL_STORAGE_KEY)) ?? [];
  }


  private nominatedMoviesToLocalStorage(): void {
    if (this.nominatedMovies.length <= 0) {
      this.clearNominated();
    }

    localStorage.setItem(MovieService.LOCAL_STORAGE_KEY, JSON.stringify(this.nominatedMovies));
  }
}
