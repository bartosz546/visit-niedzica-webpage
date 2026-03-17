import { Component } from '@angular/core';
import { MapViewComponent } from '../../component/map-view/map-view';
import { ParallaxImageScrollSection } from '../../component/parallax-image-scroll-section/parallax-image-scroll-section';
import { MapNode } from '../../component/map-view/MapNode';
import { Utils } from '../../Utils';

@Component({
  selector: 'app-map',
  imports: [MapViewComponent, ParallaxImageScrollSection],
  templateUrl: './czorsztyn-page.html',
  styleUrl: './czorsztyn-page.css',
})
export class CzorsztynPage {
  public mapData: MapNode[] = [
    {
      title: 'Czorsztyn',
      description:
        'Kameralna miejscowość w Pieninach, znana z malowniczych ruin zamku i spektakularnych widoków na Jezioro Czorsztyńskie oraz Tatry.',
      lngLat: [20.331700830860623, 49.44139696989278],
      children: [
        {
          title: 'Zamek Czorsztyn',
          description: 'Odwiedź ruiny zamku piętnasto wiecznego zamku.',
          imgSrc: './assets/images/zamek-czorsztyn.png',
          lngLat: [20.31211553182194, 49.435468356368375],
        },
        {
          title: 'Czorsztynianka',
          description: 'Wybierz się w rejs po jeziorze Czorsztyńskim.',
          imgSrc: './assets/images/czorsztynianka.png',
          lngLat: [20.311569308649023, 49.436829980179176],
        },
      ],
    },
  ];

  constructor() {
    Utils.assignHierarchicalIds(this.mapData);
  }
}
