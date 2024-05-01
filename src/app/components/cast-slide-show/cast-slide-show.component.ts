import { AfterViewInit, Component, input } from '@angular/core';
import { Cast } from '../../interfaces/film-details-response';
import Swiper from 'swiper';
import { NgStyle } from '@angular/common';
import { PosterPipe } from '../../pipes/poster.pipe';

@Component({
  selector: 'app-cast-slide-show',
  standalone: true,
  imports: [NgStyle, PosterPipe],
  templateUrl: './cast-slide-show.component.html',
  styleUrl: './cast-slide-show.component.scss'
})
export class CastSlideShowComponent implements AfterViewInit{
  myswiper!: Swiper;
  Casts = input(new Array<Cast>(), { alias: 'cast' });

  ngAfterViewInit(): void {
    this.myswiper = new Swiper('.swiper', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 20,
      loop: true
    });
  }

  onSlideNext(){
    this.myswiper.slideNext();
  }

  onSlidePrevious(){
    this.myswiper.slidePrev();
  }
}
