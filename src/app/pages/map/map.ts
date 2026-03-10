import { Component } from '@angular/core';
import { MapViewComponent } from '../../component/map-view/map-view';

@Component({
  selector: 'app-map',
  imports: [MapViewComponent],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {}
