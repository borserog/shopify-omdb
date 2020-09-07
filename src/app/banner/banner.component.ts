import { MovieService } from './../movie/services/movie.service';
import { Component, OnInit } from '@angular/core';

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
    // shame :~
    setTimeout(() => {
      this.movieService.clearNominated();
      this.isSubmitted = true;
    }, 1500);
    setTimeout(() => {
      this.isSubmitted = false;
    }, 4000);
  }
}
