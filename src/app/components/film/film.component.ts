import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { FilmDetailResponse } from '../../interfaces/film-detail-response';
import { PosterPipe } from '../../pipes/poster.pipe';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { CustomStarRatingServiceService } from '../../services/custom-star-rating-service.service';
import { CommonModule, Location } from '@angular/common';
import { Cast } from '../../interfaces/film-details-response';
import { CastSlideShowComponent } from '../cast-slide-show/cast-slide-show.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [PosterPipe, StarRatingModule, CommonModule, CastSlideShowComponent],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss',
  providers: [{ provide: StarRatingConfigService, useClass: CustomStarRatingServiceService }]
})
export class FilmComponent {
  public MovieDetail!: FilmDetailResponse | null;
  public Cast!:Cast[];

  constructor(private activatedRoute: ActivatedRoute,
    private filmsService: FilmsService,
    private location: Location,
    private router: Router) {
    const { id } = this.activatedRoute.snapshot.params;
    combineLatest(
      [
        this.filmsService.getFilmDetail(id),
        this.filmsService.getFilmCast(id)
      ]).subscribe(([filmDetailResponse, filmCastResponse]) => {
        if(!filmDetailResponse){
          this.router.navigateByUrl('/home');
          return;
        }
        this.MovieDetail = filmDetailResponse;
        this.Cast = filmCastResponse.filter(cast => cast.profile_path !== null)
      });
  }

  onGoBack(){
    this.location.back();
  }
}
