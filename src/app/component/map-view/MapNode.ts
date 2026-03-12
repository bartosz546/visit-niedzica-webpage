export interface MapNode {
  id?: string;
  title: string;
  description?: string;
  imgSrc?: string;
  detailsLink?: string;
  lngLat?: [number, number];
  children?: MapNode[];
  isExpanded?: boolean;
  parent?: MapNode;
}
