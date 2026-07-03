import type { RuleGraph, TopologicalResult } from "./types";

export function topologicalSort(graph: RuleGraph): TopologicalResult {
  const indegree = new Map<string, number>(graph.nodes.map((node) => [node.id, 0]));

  for (const targets of graph.adjacency.values()) {
    for (const target of targets) {
      indegree.set(target, (indegree.get(target) ?? 0) + 1);
    }
  }

  const queue = graph.nodes.filter((node) => (indegree.get(node.id) ?? 0) === 0).map((node) => node.id);
  const order: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift() as string;
    order.push(current);

    for (const neighbor of graph.adjacency.get(current) ?? []) {
      indegree.set(neighbor, (indegree.get(neighbor) ?? 0) - 1);
      if ((indegree.get(neighbor) ?? 0) === 0) {
        queue.push(neighbor);
      }
    }
  }

  const cycleNodeIds = graph.nodes.map((node) => node.id).filter((id) => !order.includes(id));

  return {
    order,
    cycleNodeIds,
    isDag: cycleNodeIds.length === 0,
  };
}
