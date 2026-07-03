import { facts } from "./facts";
import { rules } from "./rules";
import type { GraphEdge, GraphNode, RuleGraph } from "./types";

export function buildRuleGraph(): RuleGraph {
  const factNodes: GraphNode[] = facts.map((fact) => ({ id: fact.id, kind: "fact", label: fact.label }));
  const ruleNodes: GraphNode[] = rules.map((rule) => ({ id: rule.id, kind: "rule", label: rule.label }));
  const edges: GraphEdge[] = rules.flatMap((rule) => [
    ...rule.prerequisites.map((factId) => ({ from: factId, to: rule.id, label: "requires" as const })),
    ...rule.conclusions.map((factId) => ({ from: rule.id, to: factId, label: "derives" as const })),
  ]);
  const adjacency = new Map<string, string[]>();

  for (const node of [...factNodes, ...ruleNodes]) {
    adjacency.set(node.id, []);
  }
  for (const edge of edges) {
    adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge.to]);
  }

  return { nodes: [...factNodes, ...ruleNodes], edges, adjacency };
}
