import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapNode } from './map-item.model';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css'],
  imports: [MarkerComponent, MapComponent, CommonModule],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapComponent') mapComponent!: MapComponent;

  public mapCenter: [number, number] = [-70.53, 19.31];
  public mapZoom: [number] = [9];

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
    // 1. Center map and filter markers like before
    this.selectNode(node, new MouseEvent('click'));

    // 2. Logic for detail view vs expansion
    if (!node.children || node.children.length === 0) {
      this.detailNode = node;
    } else {
      // It has children, so ensure it is expanded in the sidebar
      node.isExpanded = true;
      this.detailNode = null; // Close detail view if it was open
    }
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

  public selectNode(node: MapNode, event: Event): void {
    event.stopPropagation();

    // Toggle the expanded state for the accordion effect
    node.isExpanded = !node.isExpanded;

    this.selectedNodeId = node.id;
    this.mapCenter = [...node.lngLat];
    this.mapZoom = [12];

    // Show only this element and its children on the map
    this.visibleMarkers = this.getDescendantsFlattened(node);

    // After the DOM updates (the sidebar grows/shrinks), trigger the map resize
    setTimeout(() => {
      this.refreshMapSize();
    }, 300); // Wait for the CSS transition to finish
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
