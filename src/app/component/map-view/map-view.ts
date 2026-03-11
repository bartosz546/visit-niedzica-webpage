import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapNode } from './map-item.model';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { LngLatBounds } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css'],
  imports: [MarkerComponent, MapComponent, CommonModule],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapComponent') mapComponent!: MapComponent;

  public mapCenter: [number, number] = [20.3228, 49.4182];
  public mapZoom: [number] = [11];

  public selectedNodeId: string | null = null;
  public visibleMarkers: MapNode[] = [];

  public mapData: MapNode[] = [
    {
      id: '1',
      title: 'Samaná Peninsula',
      description: 'Beautiful peninsula in the Dominican Republic.',
      lngLat: [-69.3, 19.25],
      children: [
        {
          id: '1-1',
          title: 'Las Terrenas',
          description: 'A vibrant coastal town.',
          lngLat: [-69.53, 19.31],
          children: [
            {
              id: '1-1-1',
              title: 'Playa Bonita',
              description: 'Quiet and scenic beach.',
              lngLat: [-69.56, 19.3],
            },
          ],
        },
        {
          id: '1-2',
          title: 'El Limón',
          description: 'Famous for its waterfall.',
          lngLat: [-69.43, 19.28],
        },
      ],
    },
    {
      id: '2',
      title: 'Santo Domingo',
      description: 'The capital city.',
      lngLat: [-69.93, 18.48],
    },
  ];

  ngOnInit(): void {
    this.visibleMarkers = this.getAllNodesFlattened(this.mapData);
  }

  onMapLoad(event: any) {
    this.refreshMapSize();
  }

  ngAfterViewInit(): void {
    this.refreshMapSize();
  }

  public detailNode: MapNode | null = null;

  public onMarkerClick(node: MapNode): void {
    this.selectNode(node, new MouseEvent('click'));
  }

  public closeDetail(): void {
    this.detailNode = null;
  }

  public trackById(index: number, item: MapNode): string {
    return item.id;
  }

  refreshMapSize(): void {
    setTimeout(() => {
      if (this.mapComponent && this.mapComponent.mapInstance) {
        this.mapComponent.mapInstance.resize();
      }
    });
    console.log('mapComponent', this.mapComponent);
    console.log('mapInstance', this.mapComponent.mapInstance);
    (window as any).mapComponent = this.mapComponent;
  }

  public selectNode(node: MapNode, event?: Event): void {
    if (event) event.stopPropagation();

    node.isExpanded = !node.isExpanded;
    this.selectedNodeId = node.id;

    const descendants = this.getDescendantsFlattened(node);
    this.visibleMarkers = descendants;

    if (descendants.length > 0) {
      const bounds = new LngLatBounds();
      descendants.forEach((marker) => bounds.extend(marker.lngLat));

      const map = this.mapComponent?.mapInstance;
      if (map && node.isExpanded) {
        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 15,
          duration: 2000,
        });
      }
    }

    if (!node.children || node.children.length === 0) {
      this.detailNode = node;
    } else {
      this.detailNode = null;
    }

    setTimeout(() => {
      this.refreshMapSize();
    }, 300);
  }

  private getDescendantsFlattened(node: MapNode): MapNode[] {
    let result: MapNode[] = [node];
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        result = result.concat(this.getDescendantsFlattened(child));
      });
    }
    return result;
  }

  private getAllNodesFlattened(nodes: MapNode[]): MapNode[] {
    let result: MapNode[] = [];
    nodes.forEach((node) => {
      result = result.concat(this.getDescendantsFlattened(node));
    });
    return result;
  }
}
