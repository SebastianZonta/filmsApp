import { Component } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { FilmsService } from '../../services/films.service';
import { Movie } from '../../interfaces/billboard-response';
import { FilmsPosterGridComponent } from '../films-poster-grid/films-poster-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlideshowComponent, FilmsPosterGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies: Movie[] = [];
  constructor(private filmService: FilmsService){
    this.filmService.getBillBoard().subscribe({
      next: (value) => {
        this.movies = value.results;
      }
    });
  }
}
