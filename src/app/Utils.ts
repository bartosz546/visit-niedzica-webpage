import { MapNode } from './component/map-view/MapNode';

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

  public static assignHierarchicalIds(nodes: MapNode[], parentId: string = ''): void {
    nodes.forEach((node, index) => {
      const currentId = parentId ? `${parentId}-${index + 1}` : `${index + 1}`;

      node.id = currentId;

      if (node.children && node.children.length > 0) {
        this.assignHierarchicalIds(node.children, currentId);
      }
    });
  }
}
