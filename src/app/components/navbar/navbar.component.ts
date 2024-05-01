import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router){
  }

  searchFilm(pattern:string){
    pattern = pattern.trim();
    if(pattern.length === 0)
      return;

    this.router.navigate(['search', pattern])
  }
}
