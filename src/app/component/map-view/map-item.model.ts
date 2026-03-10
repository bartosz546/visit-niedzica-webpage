export interface MapNode {
  id: string;
  title: string;
  description: string;
  lngLat: [number, number]; // [longitude, latitude]
  children?: MapNode[];
}
