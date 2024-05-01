import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillBoardResponse, Movie } from '../interfaces/billboard-response';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilmDetailResponse } from '../interfaces/film-detail-response';
import { Cast, FilmCreditsResponse } from '../interfaces/film-details-response';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private billBoardPage: number = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: environment.MoviesDb.APIKEY,
      language: 'en-US',
      page: this.billBoardPage
    }
  }

  getBillBoard(): Observable<Movie[]> {
    if(this.loading)
        return of([]);

    this.loading = true;

    return this.http.get<BillBoardResponse>(`${environment.MoviesDb.BASEURL}/movie/now_playing`, { params: this.params }).pipe(tap(() => {
      this.billBoardPage = this.billBoardPage + 1;
      this.loading = false;
    }), map((value) => value.results));
  }

  searchFilm(pattern: string) : Observable<Movie[]>{
    const params = {... this.params, page: '1', query: pattern, include_adult: true};

    return this.http.get<BillBoardResponse>(`${environment.MoviesDb.BASEURL}/search/movie`, {params: params})
    .pipe(
      map
      (
        response => response.results
      ));
  }

  resetBillboardPage(){
    this.billBoardPage = 1;
  }

  getFilmDetail(filmId: number) : Observable<FilmDetailResponse | null>{
    return this.http.get<FilmDetailResponse>(`${environment.MoviesDb.BASEURL}/movie/${filmId}`, {params: this.params})
    .pipe(catchError(_ => of(null)));
  }

  getFilmCast(filmId: number) : Observable<Cast[]>{
    return this.http.get<FilmCreditsResponse>(`${environment.MoviesDb.BASEURL}/movie/${filmId}/credits`, {params: this.params})
    .pipe(
      map(data => data.cast),
      catchError(_ => of([])));
  }
}
