import type { RuleGraph, SccResult } from "./types";

export function stronglyConnectedComponents(graph: RuleGraph): SccResult {
  let index = 0;
  const stack: string[] = [];
  const indices = new Map<string, number>();
  const lowlink = new Map<string, number>();
  const onStack = new Set<string>();
  const components: string[][] = [];

  function visit(nodeId: string) {
    indices.set(nodeId, index);
    lowlink.set(nodeId, index);
    index += 1;
    stack.push(nodeId);
    onStack.add(nodeId);

    for (const neighbor of graph.adjacency.get(nodeId) ?? []) {
      if (!indices.has(neighbor)) {
        visit(neighbor);
        lowlink.set(nodeId, Math.min(lowlink.get(nodeId) ?? 0, lowlink.get(neighbor) ?? 0));
      } else if (onStack.has(neighbor)) {
        lowlink.set(nodeId, Math.min(lowlink.get(nodeId) ?? 0, indices.get(neighbor) ?? 0));
      }
    }

    if (lowlink.get(nodeId) === indices.get(nodeId)) {
      const component: string[] = [];
      let current = "";
      do {
        current = stack.pop() as string;
        onStack.delete(current);
        component.push(current);
      } while (current !== nodeId);
      components.push(component);
    }
  }

  for (const node of graph.nodes) {
    if (!indices.has(node.id)) {
      visit(node.id);
    }
  }

  return {
    components,
    cyclicComponents: components.filter((component) => component.length > 1),
  };
}
