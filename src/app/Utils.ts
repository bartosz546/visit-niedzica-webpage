import { MapNode } from './component/map-view/MapNode';
import { Router } from '@angular/router';

export class Utils {
  public static async setTimeoutAsync(delayInMs: number): Promise<void> {
    return new Promise<void>((res, rej) => {
      try {
        setTimeout(() => {
          res();
        }, delayInMs);
      } catch (err) {
        rej();
      }
    });
  }

  public static assignHierarchicalIds(
    nodes: MapNode[],
    parentId: string = '',
    parentNode?: MapNode,
  ): void {
    nodes.forEach((node, index) => {
      const currentId = parentId ? `${parentId}-${index + 1}` : `${index + 1}`;
      node.id = currentId;

      // Link the parent object directly
      if (parentNode) {
        node.parent = parentNode;
      }

      if (node.children?.length) {
        // Pass 'node' as the parent for the next level
        this.assignHierarchicalIds(node.children, currentId, node);
      }
    });
  }

  public static navigate(url?: string, router?: Router) {
    if (!url) return;

    const isExternal = /^(http|https):\/\//.test(url);

    if (isExternal) {
      window.open(url, "_blank");
    } else {
      router?.navigateByUrl(url).then();
    }
  }
}
