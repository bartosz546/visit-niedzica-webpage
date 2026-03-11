import { Component } from '@angular/core';
import { MapViewComponent } from '../../component/map-view/map-view';
import {
  ParallaxImageScrollSection
} from '../../component/parallax-image-scroll-section/parallax-image-scroll-section';

@Component({
  selector: 'app-map',
  imports: [MapViewComponent, ParallaxImageScrollSection],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {}
