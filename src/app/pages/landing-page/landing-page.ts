import { Component } from '@angular/core';
import {
  ParallaxImageScrollSection
} from '../../component/parallax-image-scroll-section/parallax-image-scroll-section';
import {
  ParallaxVideoScrollSection
} from '../../component/parallax-video-scroll-section/parallax-video-scroll-section';
import { RouterLink } from '@angular/router';
import { MapNode } from '../../component/map-view/MapNode';
import { MapViewComponent } from '../../component/map-view/map-view';

@Component({
  selector: 'app-landing-page',
  imports: [ParallaxImageScrollSection, ParallaxVideoScrollSection, RouterLink, MapViewComponent],
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

  public mapData: MapNode[] = [
    {
      title: 'Kultura',
      children: [
        {
          title: 'Galeria Sztuki Pienińskiej',
          description:
            'Dom Stanisława Czepiela. Wyjątkowa możliwość odwiedzenia domu Pienińskiego artysty.',
          imgSrc: './assets/images/dom-stanislawa-czapiela.jpg',
          lngLat: [20.43399353830905, 49.4390477384274],
        },
        {
          title: 'Powozownia',
          description:
            'Piękna i zadbana powozownia, którą można zwiedzić w cenie biletu na zamek w Dunajec.',
          imgSrc: './assets/images/powoz.jpg',
          lngLat: [20.32463887656982, 49.42477360623603],
        },
      ],
    },
    {
      title: 'Historia',
      children: [
        {
          title: 'Zamek Dunajec',
          description:
            'Odwiedź ruiny zamku i odkryj historię jednego z najbardziej tajemniczych miejsc regionu.',
          imgSrc: './assets/images/niedzica.png',
          lngLat: [20.31971708524814, 49.42277244797265],
          detailsLink: 'https://zamekniedzica.pl',
        },
        {
          title: 'Zamek Czorsztyn',
          description: 'Odwiedź ruiny zamku piętnasto wiecznego zamku.',
          imgSrc: './assets/images/zamek-czorsztyn.png',
          lngLat: [20.31211553182194, 49.435468356368375],
        },
        {
          title: 'Zabytkowy Dwór',
          description:
            'Zwiedź zabytkowy Dwór w Łopusznej i przenieś się do świata dawnej szlachty pod Tatrami.',
          imgSrc: './assets/images/dwor-w-lopusznej.png',
          lngLat: [20.134648705140737, 49.47480767861221],
        },
      ],
    },
    {
      title: 'Parki Narodowe',
      children: [
        {
          title: 'Pieniński Park Narodowy',
          description:
            'Pieniński Park Narodowy to malowniczy obszar chroniony, słynący przede wszystkim z unikalnego przełomu Dunajca oraz wapiennych szczytów, takich jak Trzy Korony i Sokolica, które oferują jedne z najpiękniejszych panoram w Polsce.',
          imgSrc: './assets/images/pieninski-park-narodowy.jpg',
          lngLat: [20.398865714660122, 49.42198740808084],
        },
      ],
    },
    {
      title: 'Ścieżki Rowerowe',
      children: [
        {
          title: 'Velo Czorsztyn',
          description:
            'Jedna z lepszych tras rowerowych w Polsce. Świetne miejsce na rodzinny wypad.',
          imgSrc: './assets/images/velo-czorsztyn.jpg',
          lngLat: [20.28642512492322, 49.44994923572959],
        },
        {
          title: 'Ścieżka rowerowa dookoła Jeziora Czorsztyńskiego',
          description:
            'Malownicza, 40-kilometrowa trasa, prawdziwa uczta dla zmysłów, prowadząca przez kojące kompleksy leśne i wzdłuż lśniącej tafli wody, z licznymi punktami widokowymi oraz przystankami gastronomicznymi idealnymi na regenerację sił.',
          imgSrc: './assets/images/velo-czorsztyn.jpg',
          lngLat: [20.28642512492322, 49.44994923572959],
        },
      ],
    },
    {
      title: 'Gastronomia',
      children: [
        {
          title: 'Tawerna Kapitańska',
          description: 'Spróbuj lokalnych potraw w restaruracji z długą kulturą i tradycją.',
          imgSrc: './assets/images/tawerna-kapitanska.jpg',
          lngLat: [20.31385228980016, 49.446230883943066],
        },
        {
          title: 'Zajazd pod Smrekami',
          description:
            'Regionalna atmosfera, duża przestrzeń i smaczna kuchnia dostępna zimą. Must-eat: gęsta zupa czosnkowa i pyszny filet z pieczarkami. Idealne miejsce na szybki i pożywny posiłek w samym sercu gór.',
          imgSrc: './assets/images/zajazd-pod-smrekami.jpg',
          lngLat: [20.337884883642563, 49.4403153244892],
        },
        {
          title: 'Velo Grill',
          description:
            'Miejsce z bajecznymi widokami dające przyjemność schłodzenia się zimnym napojem w dobrej cenie.',
          imgSrc: './assets/images/villa-grill.jpg',
          lngLat: [20.337884883642563, 49.4403153244892],
        },
      ],
    },
    {
      title: 'Nocleg',
      children: [
        {
          title: 'Kinga Apartamenty',
          description: 'Klimatyczne miejsce u podnóża Pienińskich Szczytów.',
          imgSrc: './assets/images/kinga-apartamenty.jpg',
          lngLat: [20.291499950612497, 49.385955311832085],
        },
        {
          title: 'Willa Akiko',
          description:
            'Zrelaksuj się w Willi Akiko – przytulnym miejscu inspirowanym japońską harmonią i spokojem, gdzie właścicielki goszczą swoich gości w prawdziwie japońskim stylu.',
          imgSrc: './assets/images/akiko.jpg',
          lngLat: [20.167438999895644, 49.491666792629495],
        },
        {
          title: 'Willa Biały Jeleń',
          description: 'Komfortowy i pięknie urządzony z dbałością o szczegóły pensjonat.',
          imgSrc: '',
          lngLat: [20.104475931976978, 49.47415514934052],
        },
      ],
    },
    {
      title: 'Atrakcje Turystyczne',
      children: [
        {
          title: 'Zamek Dunajec',
          description:
            'Odwiedź ruiny zamku i odkryj historię jednego z najbardziej tajemniczych miejsc regionu.',
          imgSrc: './assets/images/niedzica.png',
          lngLat: [20.31971708524814, 49.42277244797265],
          detailsLink: 'https://zamekniedzica.pl',
        },
        {
          title: 'Czorsztynianka',
          description: 'Wybierz się w rejs po jeziorze Czorsztyńskim.',
          imgSrc: './assets/images/czorsztynianka.png',
          lngLat: [20.311569308649023, 49.436829980179176],
        },
        {
          title: 'Plaża Pieniny',
          description: 'Wspaniałe miejsce na rodzinny camping z widokiem na Pienińskie Szczyty.',
          imgSrc: './assets/images/plaza-pieniny.png',
          lngLat: [20.314810325708784, 49.42419576828662],
          detailsLink: '#',
        },
        {
          title: 'Kulig',
          description:
            'Kulig to jedna z najbardziej wyjątkowych zimowych atrakcji w górach, która pozwala poczuć prawdziwy klimat góralskiej tradycji. Przejazd saniami ciągniętymi przez konie, wśród ośnieżonych lasów i malowniczych górskich krajobrazów, to niezapomniane przeżycie zarówno dla dorosłych, jak i dla dzieci. Towarzyszące dźwięki dzwonków, zimowe powietrze i blask pochodni tworzą niepowtarzalną atmosferę, która na długo pozostaje w pamięci.',
          imgSrc: './assets/images/kuligi-niedzica.jpg',
          lngLat: [20.30233227690118, 49.40523783992745],
        },
      ],
    },
  ];
}
