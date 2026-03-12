import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';
import { CommonModule } from '@angular/common';
import { LngLatBounds } from 'mapbox-gl';
import { MapNode } from './MapNode';
import { FilterNoLngLat } from './FilterNoLngLat';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css'],
  imports: [MarkerComponent, MapComponent, CommonModule, FilterNoLngLat, FaIconComponent],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapComponent') mapComponent!: MapComponent;
  @Input() mapData: MapNode[] = [];

  public mapZoom: [number] = [11];

  public selectedNodeId: string | null = null;
  public visibleMarkers: MapNode[] = [];

  ngOnInit(): void {
    this.visibleMarkers = this.getAllNodesFlattened(this.mapData);
  }

  onMapLoad(event: any) {
    this.refreshMapSize();
  }

  ngAfterViewInit(): void {
    this.refreshMapSize();
    this.centerMapOnAllPoints();
  }

  public detailNode: MapNode | null = null;

  public onMarkerClick(node: MapNode): void {
    this.selectNode(node, new MouseEvent('click'));
  }

  public closeDetail(): void {
    this.detailNode = null;
  }

  public trackById(index: number, item: MapNode): string {
    return item.id as string;
  }

  refreshMapSize(): void {
    setTimeout(() => {
      if (this.mapComponent && this.mapComponent.mapInstance) {
        this.mapComponent.mapInstance.resize();
      }
    });
  }

  public selectNode(node: MapNode, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    node.isExpanded = !node.isExpanded;
    this.selectedNodeId = node.id as string;

    const descendants = this.getDescendantsFlattened(node);
    this.visibleMarkers = descendants;

    if (descendants.length > 0) {
      const bounds = new LngLatBounds();
      descendants.forEach((marker: MapNode) => {
        if (marker.lngLat) {
          bounds.extend(marker.lngLat);
        }
      });

      const map = this.mapComponent?.mapInstance;
      if ((map && node.isExpanded) || !node.children?.length) {
        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 15,
          duration: 2000,
        });
      }
    }

    if (!node.children || !node.children?.length) {
      this.detailNode = node;
    } else {
      this.detailNode = null;
    }

    setTimeout(() => {
      this.refreshMapSize();
    }, 300);
  }

  private centerMapOnAllPoints() {
    const descendants = this.getAllNodesFlattened(this.mapData);
    if (descendants.length > 0) {
      const bounds = new LngLatBounds();
      descendants.forEach((marker: MapNode) => {
        if (marker.lngLat) {
          bounds.extend(marker.lngLat);
        }
      });

      setTimeout(() => {
        const map = this.mapComponent?.mapInstance;
        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 15,
          duration: 2000,
        });
      });
    }
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

  protected readonly faChevronLeft = faChevronLeft;
}
