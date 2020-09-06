import { MovieItem } from './../../models/MovieItem.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: MovieItem;
  @Input() isNominated: boolean;
  @Input() isLimitReached: boolean;

  @Output() movieNominated = new EventEmitter<MovieItem>();
  @Output() nominatioRemoved = new EventEmitter<MovieItem>();

  constructor() { }

  ngOnInit(): void {
  }

  nominate(): void {
    this.movieNominated.emit(this.movie);
  }

  removeNomination(): void {
    this.nominatioRemoved.emit(this.movie);
  }
}
