import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillBoardResponse } from '../interfaces/billboard-response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  getBillBoard() : Observable<BillBoardResponse>{
    return this.http.get<BillBoardResponse>(`https://api.themoviedb.org/3/movie/now_playing?api_key=${environment.MoviesDb.APIKEY}&language=en-US&page=1`)
  }
}
