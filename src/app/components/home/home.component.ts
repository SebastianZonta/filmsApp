import { Component, HostListener, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnDestroy{
  movies: Movie[] = [];
  
  @HostListener('window:scroll', ['$event'])
  onEndScroll() {
    const currentScrollBarPosition = (document.documentElement.scrollTop || document.body.scrollTop) + 1400;
    const maxScrollPosition = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (currentScrollBarPosition > maxScrollPosition && !this.filmService.loading)
      this.filmService.getBillBoard().subscribe({
        next: (value) => this.movies.push(...value),
        error: (err) => console.log(err)
      })
  }

  constructor(private filmService: FilmsService) {
    this.filmService.getBillBoard().subscribe({
      next: (value) => {
        this.movies = value;
      }
    });
  }

  ngOnDestroy(): void {
    this.filmService.resetBillboardPage();
  }
}
