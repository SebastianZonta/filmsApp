import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { FilmsPosterGridComponent } from '../films-poster-grid/films-poster-grid.component';
import { Movie } from '../../interfaces/billboard-response';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilmsPosterGridComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public Text: string = '';
  public Movies: Movie[] = [];
  constructor(private activatedRoute: ActivatedRoute, private filmService: FilmsService){
    this.activatedRoute.params.subscribe({
      next: (parameter) => {
        this.Text = parameter['text'];
        this.filmService.searchFilm(this.Text).subscribe({
          next: (movies) => this.Movies = movies
        })
      }
    })
  }
}
