import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ParallaxVideoScrollSection
} from '../../component/parallax-video-scroll-section/parallax-video-scroll-section';

@Component({
  selector: 'app-article-page',
  imports: [ParallaxVideoScrollSection],
  templateUrl: './article-page.html',
  styleUrl: './article-page.css',
})
export class ArticlePage implements AfterViewInit, OnDestroy {
  @ViewChild('revealElement1') revealElement1!: ElementRef<HTMLElement>;
  @ViewChild('revealElement2') revealElement2!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | undefined;

  readonly videos1 = [
    'assets/videos/niedzica-footage-3.mp4',
    'assets/videos/niedzica-footage-2.mp4',
  ];

  readonly videos2 = [
    'assets/videos/niedzica-footage-1.mp4',
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // this.privateObserve1();
    this.privateObserve2();
  }

  privateObserve1() {
    const options = {
      rootMargin: '0px 0px -100% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.revealElement1.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.revealElement1.nativeElement, 'active');
      }
    }, options);

    this.observer.observe(this.revealElement1.nativeElement);
  }

  privateObserve2() {
    const options = {
      rootMargin: '0px 0px -100% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.revealElement2.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.revealElement2.nativeElement, 'active');
      }
    }, options);

    this.observer.observe(this.revealElement2.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
