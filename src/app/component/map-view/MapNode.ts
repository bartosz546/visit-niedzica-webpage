export interface MapNode {
  id?: string;
  title: string;
  imgSrc?: string;
  description?: string;
  lngLat?: [number, number];
  children?: MapNode[];
  isExpanded?: boolean; // Add this
}
