import { Component, OnInit } from '@angular/core';
import { MapNode } from './map-item.model';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css'],
  imports: [MarkerComponent, MapComponent, CommonModule],
})
export class MapViewComponent implements OnInit {
  // Map state
  public mapCenter: [number, number] = [-70.53, 19.31]; // Default center
  public mapZoom: [number] = [9];

  // Data state
  public selectedNodeId: string | null = null;
  public visibleMarkers: MapNode[] = [];

  // Mock Hierarchical Data
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
    // Initially, let's show all top-level nodes, or everything.
    // For this example, we'll start by showing all items flattened.
    this.visibleMarkers = this.getAllNodesFlattened(this.mapData);
  }

  /**
   * Triggered when an item in the left panel is clicked.
   */
  public selectNode(node: MapNode, event: Event): void {
    event.stopPropagation(); // Prevent clicks from bubbling up to parent nodes

    this.selectedNodeId = node.id;
    this.mapCenter = [...node.lngLat]; // Update map center
    this.mapZoom = [12]; // Zoom in closer on selection

    // Filter markers to ONLY show the selected node and its descendants
    this.visibleMarkers = this.getDescendantsFlattened(node);
  }

  /**
   * Recursively flattens a node and all its children into a single array
   */
  private getDescendantsFlattened(node: MapNode): MapNode[] {
    let result: MapNode[] = [node];
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        result = result.concat(this.getDescendantsFlattened(child));
      });
    }
    return result;
  }

  /**
   * Recursively flattens the entire data tree (used for initial load)
   */
  private getAllNodesFlattened(nodes: MapNode[]): MapNode[] {
    let result: MapNode[] = [];
    nodes.forEach((node) => {
      result = result.concat(this.getDescendantsFlattened(node));
    });
    return result;
  }
}
