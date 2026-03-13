import { Component } from '@angular/core';
import {
  ParallaxImageScrollSection
} from '../../component/parallax-image-scroll-section/parallax-image-scroll-section';
import {
  ParallaxVideoScrollSection
} from '../../component/parallax-video-scroll-section/parallax-video-scroll-section';

@Component({
  selector: 'app-landing-page',
  imports: [ParallaxImageScrollSection, ParallaxVideoScrollSection],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  readonly videos = [
    'assets/videos/niedzica-drone-footage-1.mp4',
    'assets/videos/niedzica-drone-footage-2.mp4',
    'assets/videos/niedzica-drone-footage-3.mp4',
    'assets/videos/niedzica-drone-footage-4.mp4',
  ];
}
