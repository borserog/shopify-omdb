import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly API_KEY = '1e66e61d';
  private static readonly RESOURCE_URL = `http://www.omdbapi.com/?apikey=${MovieService.API_KEY}&`;

  constructor(
    private http: HttpClient
  ) { }

  getMovies(title: string, page: string): Observable<any> {
    return this.http.get(MovieService.RESOURCE_URL, { params: { s: title, page }});
  }
}
