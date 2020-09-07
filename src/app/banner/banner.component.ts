import { MovieService } from './../movie/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  isVisible = true;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
  }

  isBannerHidden(): string {
    return this.movieService.nominationLimitReached() && this.isVisible ? 'visible' : 'hidden';
  }

  submitNominations(): void {
    setTimeout(() => {
      this.movieService.clearNominated();
    }, 1000);
  }
}
