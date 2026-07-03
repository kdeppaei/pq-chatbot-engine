import { shortestConceptDistance } from "./conceptGraph";
import type { FactId, RankedRecommendation, Recommendation } from "./types";

export const recommendations: Recommendation[] = [
  {
    factId: "derive_topological_chatbot",
    title: "Topological Rule-based Chatbot Engine",
    answer: "Use facts and rule nodes as a graph, run topological order, detect SCC cycles, and expose closure facts.",
  },
  {
    factId: "derive_debug_panel",
    title: "Explainable Reasoning Debug Panel",
    answer: "Show extracted facts, fired rules, closure facts, SCC cycles, and rule path per answer.",
  },
  {
    factId: "derive_graph_visualizer",
    title: "Concept Graph Visualizer",
    answer: "Rank recommendations by graph distance from extracted and derived facts.",
  },
  {
    factId: "derive_portfolio_tool",
    title: "Engineering Portfolio Tool",
    answer: "Package the chatbot as a portfolio-grade engineering tool with clear internals.",
  },
  {
    factId: "derive_js_learning_path",
    title: "JavaScript Learning Path",
    answer: "Convert frontend skill gaps into an explicit learning roadmap.",
  },
  {
    factId: "derive_static_deploy",
    title: "Static GitHub Pages Deployment",
    answer: "Keep the demo deployable as static HTML while retaining React/TypeScript source.",
  },
];

export function rankRecommendations(closureFacts: FactId[], extractedFacts: FactId[]): RankedRecommendation[] {
  return recommendations
    .map((recommendation) => {
      const distance = shortestConceptDistance(closureFacts, recommendation.factId);
      const matchedFacts = closureFacts.filter((factId) => shortestConceptDistance([factId], recommendation.factId) <= 1);
      return {
        ...recommendation,
        distance,
        matchedFacts,
        score: Number.isFinite(distance) ? 1 / (1 + distance) + matchedFacts.length * 0.12 + extractedFacts.length * 0.01 : 0,
      };
    })
    .sort((a, b) => b.score - a.score);
}
