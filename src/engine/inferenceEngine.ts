import { facts } from "./facts";
import { buildRuleGraph } from "./graph";
import { rankRecommendations } from "./recommendationRanker";
import { rules } from "./rules";
import { stronglyConnectedComponents } from "./scc";
import { topologicalSort } from "./topologicalSort";
import type { FactId, InferenceTrace, TriggeredRule } from "./types";

export function extractFacts(input: string): FactId[] {
  const normalized = input.trim().toLowerCase();
  const extracted = facts
    .filter((fact) => fact.patterns?.some((pattern) => pattern.test(normalized)))
    .map((fact) => fact.id);
  return Array.from(new Set(extracted));
}

export function runInference(input: string): InferenceTrace {
  const graph = buildRuleGraph();
  const topo = topologicalSort(graph);
  const scc = stronglyConnectedComponents(graph);
  const extractedFacts = extractFacts(input);
  const closure = new Set<FactId>(extractedFacts);
  const triggeredRules: TriggeredRule[] = [];

  for (const nodeId of topo.order) {
    const rule = rules.find((candidate) => candidate.id === nodeId);
    if (!rule || !rule.prerequisites.every((factId) => closure.has(factId))) {
      continue;
    }

    const newlyDerivedFacts = rule.conclusions.filter((factId) => !closure.has(factId));
    for (const factId of newlyDerivedFacts) {
      closure.add(factId);
    }
    triggeredRules.push({ rule, newlyDerivedFacts, step: triggeredRules.length + 1 });
  }

  const closureFacts = Array.from(closure);
  const recommendations = rankRecommendations(closureFacts, extractedFacts).slice(0, 5);

  return {
    input,
    extractedFacts,
    closureFacts,
    triggeredRules,
    topologicalOrder: topo.order,
    cycleNodeIds: topo.cycleNodeIds,
    cyclicComponents: scc.cyclicComponents,
    recommendations,
    reasoningPath: triggeredRules.map(
      (trigger) =>
        `Step ${trigger.step}: ${trigger.rule.prerequisites.join(" + ")} -> ${trigger.newlyDerivedFacts.join(", ") || "already known"}`,
    ),
  };
}
