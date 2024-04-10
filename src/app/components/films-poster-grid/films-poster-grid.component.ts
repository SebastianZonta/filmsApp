import { Component, input } from '@angular/core';
import { Movie } from '../../interfaces/billboard-response';
import { CommonModule } from '@angular/common';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-films-poster-grid',
  standalone: true,
  imports: [CommonModule, StarRatingModule],
  templateUrl: './films-poster-grid.component.html',
  styleUrl: './films-poster-grid.component.scss',
  providers: [StarRatingConfigService]
})
export class FilmsPosterGridComponent {
  movies = input.required<Movie[]>();
  constructor(){
  }
}
