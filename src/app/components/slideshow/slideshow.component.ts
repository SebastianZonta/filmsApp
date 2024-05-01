import { Component, input, AfterViewInit } from '@angular/core';
import { Movie } from '../../interfaces/billboard-response';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements AfterViewInit {
  movies = input(new Array<Movie>(), {alias: 'movies'});
  public myswiper!: Swiper;

  ngAfterViewInit(): void {
    this.myswiper = new Swiper('.swiper', {
      autoplay: true
    });
  }

  onSlideNext(){
    this.myswiper.slideNext();
  }

  onSlidePrevious(){
    this.myswiper.slidePrev();
  }

}
