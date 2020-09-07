import { MovieService } from './../movie/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { interval, noop } from 'rxjs';
import { first, tap, delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  isVisible = true;
  isSubmitted = false;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
  }

  isBannerHidden(): string {
    return this.movieService.nominationLimitReached() && this.isVisible ? 'visible' : 'hidden';
  }

  submitNominations(): void {
    interval(1500).pipe(
      tap(() => {
        this.isSubmitted = true;
        this.movieService.clearNominated();
      }),
      delay(2000),
      tap(() => {
        this.isSubmitted = false;
      }),
      take(1)
      ).subscribe(noop);
  }
}
