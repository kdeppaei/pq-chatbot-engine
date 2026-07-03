import type { FactNode } from "./types";

export const facts: FactNode[] = [
  { id: "goal_frontend", label: "Goal: Frontend", description: "User wants frontend career or frontend work.", patterns: [/前端/i, /frontend/i, /網頁工程師/i] },
  { id: "want_portfolio", label: "Want Portfolio", description: "User asks about portfolio or project showcase.", patterns: [/作品集/i, /portfolio/i, /專案展示/i] },
  { id: "skill_python", label: "Skill: Python", description: "User knows Python.", patterns: [/python/i] },
  { id: "skill_html", label: "Skill: HTML", description: "User knows HTML.", patterns: [/html/i] },
  { id: "lack_javascript", label: "Gap: JavaScript", description: "User lacks JavaScript skill.", patterns: [/不會\s*javascript/i, /不熟\s*javascript/i, /不會\s*js/i] },
  { id: "want_no_api", label: "No API", description: "User wants no external AI API.", patterns: [/不用\s*api/i, /不靠\s*api/i, /no-api/i, /不靠\s*ai\s*api/i] },
  { id: "want_graph_logic", label: "Graph Logic", description: "User wants graph, topology, or algorithmic logic.", patterns: [/拓樸/i, /topological/i, /圖論/i, /graph/i, /演算法/i] },
  { id: "want_explainable", label: "Explainable", description: "User asks for explainable reasoning path.", patterns: [/可解釋/i, /explain/i, /reasoning/i, /推理路徑/i] },
  { id: "prefer_react", label: "Prefer React", description: "User asks for React implementation.", patterns: [/react/i] },
  { id: "need_deploy", label: "Need Deploy", description: "User asks for deployable demo.", patterns: [/部署/i, /github pages/i, /試用/i] },
  { id: "derive_portfolio_tool", label: "Portfolio Tool", description: "Derived recommendation: build a portfolio tool." },
  { id: "derive_js_learning_path", label: "JS Learning Path", description: "Derived recommendation: learn JavaScript path." },
  { id: "derive_topological_chatbot", label: "Topological Chatbot", description: "Derived recommendation: build topological chatbot." },
  { id: "derive_graph_visualizer", label: "Graph Visualizer", description: "Derived recommendation: graph visualizer." },
  { id: "derive_debug_panel", label: "Debug Panel", description: "Derived recommendation: explainable debug panel." },
  { id: "derive_static_deploy", label: "Static Deploy", description: "Derived recommendation: deploy static HTML." },
];

export function getFactLabel(factId: string): string {
  return facts.find((fact) => fact.id === factId)?.label ?? factId;
}
