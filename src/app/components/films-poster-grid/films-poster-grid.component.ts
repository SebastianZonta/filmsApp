import { Component, input } from '@angular/core';
import { Movie } from '../../interfaces/billboard-response';
import { CommonModule } from '@angular/common';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { CustomStarRatingServiceService } from '../../services/custom-star-rating-service.service';
import { PosterPipe } from '../../pipes/poster.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films-poster-grid',
  standalone: true,
  imports: [CommonModule, StarRatingModule, PosterPipe],
  templateUrl: './films-poster-grid.component.html',
  styleUrl: './films-poster-grid.component.scss',
  providers: [{ provide: StarRatingConfigService, useClass: CustomStarRatingServiceService }]
})
export class FilmsPosterGridComponent {
  movies = input.required<Movie[]>();
  constructor(private router: Router) {

  }

  onMovieClick(filmId: number) {
    this.router.navigate(['film', filmId]);
  }
}
