import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parallax-image-scroll-section',
  imports: [],
  templateUrl: './parallax-image-scroll-section.html',
  styleUrl: './parallax-image-scroll-section.css',
})
export class ParallaxImageScrollSection {
  @Input() imageSrc!: string;
  @Input() header!: string;
  @Input() subheader!: string;
}
