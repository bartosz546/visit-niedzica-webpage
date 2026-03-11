import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MAPBOX_API_KEY } from 'ngx-mapbox-gl';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  providers: [
    {
      provide: MAPBOX_API_KEY,
      useValue:
        'pk.eyJ1IjoiYmFydG9zejU0NiIsImEiOiJjbW1sMWRkZnQxd3V3MnBwcmVyMGhrNjNoIn0.-4CCQmDdgUYVK3kFfwaCJQ',
    },
  ],
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private lastScrollTop = 0;
  private elementHeight = 0;

  ngAfterViewInit(): void {
    this.elementHeight = document.getElementById('nav')?.offsetHeight ?? 0;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const delta = scrollTop - this.lastScrollTop;
    const navElement: HTMLElement | null = document.getElementById('nav');
    if (!navElement) {
      return;
    }

    if (scrollTop <= 0) {
      navElement.classList.add('sticky-nav-bar');
      navElement.classList.remove('nav-bar-hidden');
      this.lastScrollTop = 0;
      return;
    }

    if (delta > 0 && window.scrollY > this.elementHeight) {
      navElement.classList.add('nav-bar-hidden');
      navElement.classList.remove('sticky-nav-bar');
    }

    if (delta < 0 && Math.abs(delta) < this.elementHeight) {
      navElement.classList.remove('nav-bar-hidden');
      navElement.classList.add('sticky-nav-bar');
    }

    this.lastScrollTop = scrollTop;
  }

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
}
