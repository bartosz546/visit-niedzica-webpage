import { Component } from '@angular/core';
import { MapViewComponent } from '../../component/map-view/map-view';
import { ParallaxImageScrollSection } from '../../component/parallax-image-scroll-section/parallax-image-scroll-section';
import { MapNode } from '../../component/map-view/MapNode';
import { Utils } from '../../Utils';

@Component({
  selector: 'app-map',
  imports: [MapViewComponent, ParallaxImageScrollSection],
  templateUrl: './map-page.html',
  styleUrl: './map-page.css',
})
export class MapPage {
  public mapData: MapNode[] = [
    {
      title: 'Niedzica',
      description:
        'Urokliwa miejscowość nad Jeziorem Czorsztyńskim, której symbolem jest bajkowy Zamek Dunajec górujący nad wodą i górami.',
      lngLat: [20.30079052221815, 49.40925941395444],
      children: [
        {
          title: 'Atrakcje',
          children: [
            {
              title: 'Zamek Dunajec',
              description:
                'Odwiedź ruiny zamku i odkryj historię jednego z najbardziej tajemniczych miejsc regionu.',
              lngLat: [20.31971708524814, 49.42277244797265],
            },
            {
              title: 'Plaża Pieniny',
              description:
                'Wspaniałe miejsce na rodzinny camping z widokiem na Pienińskie Szczyty.',
              lngLat: [20.314810325708784, 49.42419576828662],
            },
          ],
        },
      ],
    },
    {
      title: 'Czorsztyn',
      description:
        'Kameralna miejscowość w Pieninach, znana z malowniczych ruin zamku i spektakularnych widoków na Jezioro Czorsztyńskie oraz Tatry.',
      lngLat: [20.331700830860623, 49.44139696989278],
      children: [
        {
          title: 'Atrakcje',
          children: [
            {
              title: 'Zamek Czorsztyn',
              description: 'Odwiedź ruiny zamku piętnasto wiecznego zamku.',
              lngLat: [20.31211553182194, 49.435468356368375],
            },
            {
              title: 'Czorsztynianka',
              description: 'Wybierz się w rejs po jeziorze Czorsztyńskim.',
              lngLat: [20.311569308649023, 49.436829980179176],
            },
          ],
        },
      ],
    },
    {
      title: 'Łopuszna',
      description:
        'Spokojna wieś na pograniczu Podhala i Gorców, zachwycająca drewnianą architekturą i autentycznym góralskim klimatem.',
      lngLat: [20.131788257605645, 49.470431006378256],
      children: [
        {
          title: 'Atrakcje',
          children: [
            {
              title: 'Zabytkowy Dwór',
              description:
                'Zwiedź zabytkowy Dwór w Łopusznej i przenieś się do świata dawnej szlachty pod Tatrami.',
              lngLat: [20.134648705140737, 49.47480767861221],
            },
          ],
        },
        {
          title: 'Noclegi',
          children: [
            {
              title: 'Willa Akiko',
              description:
                'Zrelaksuj się w Willi Akiko – przytulnym miejscu inspirowanym japońską harmonią i spokojem, gdzie właścicielki goszczą swoich gości w prawdziwie japońskim stylu.',
              lngLat: [20.167438999895644, 49.491666792629495],
            },
            {
              title: 'Willa Biały Jeleń',
              description: 'Komfortowy i pięknie urządzony z dbałością o szczegóły pensjonat.',
              lngLat: [20.104475931976978, 49.47415514934052],
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    Utils.assignHierarchicalIds(this.mapData);
  }
}
