import { Pipe, PipeTransform } from '@angular/core';
import { MapNode } from './MapNode';

@Pipe({
  name: 'filterNoLngLat',
})
export class FilterNoLngLat implements PipeTransform {
  transform(items: MapNode[]) {
    return items.filter((item) => !!item.lngLat);
  }
}
