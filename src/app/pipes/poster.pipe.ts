import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster',
  standalone: true
})
export class PosterPipe implements PipeTransform {
  transform(poster: string | null): unknown {
    return poster === null ? "../../assets/images/download.jpeg" : `http://image.tmdb.org/t/p/w500${poster}`;
  }
}
