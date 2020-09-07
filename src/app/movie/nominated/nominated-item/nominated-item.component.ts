import { MovieService } from './../../services/movie.service';
import { MovieItem } from './../../models/MovieItem.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nominated-item',
  templateUrl: './nominated-item.component.html',
  styleUrls: ['./nominated-item.component.scss']
})
export class NominatedItemComponent implements OnInit {
  @Input() movie: MovieItem;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
  }

  removeNominated(movie: MovieItem): void {
    this.movieService.removeNominatedMovie(movie);
  }
}
