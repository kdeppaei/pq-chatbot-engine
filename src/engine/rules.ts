import type { RuleNode } from "./types";

export const rules: RuleNode[] = [
  {
    id: "rule_frontend_portfolio",
    label: "Frontend + Portfolio -> Portfolio Tool",
    prerequisites: ["goal_frontend", "want_portfolio"],
    conclusions: ["derive_portfolio_tool"],
    responseHint: "Build an interactive engineering portfolio tool instead of a static resume page.",
    weight: 0.92,
  },
  {
    id: "rule_js_gap",
    label: "Frontend + JS Gap -> JS Learning Path",
    prerequisites: ["goal_frontend", "lack_javascript"],
    conclusions: ["derive_js_learning_path"],
    responseHint: "Expose a JavaScript learning path as part of the product narrative.",
    weight: 0.88,
  },
  {
    id: "rule_topological_engine",
    label: "No API + Graph Logic + Explainable -> Topological Chatbot",
    prerequisites: ["want_no_api", "want_graph_logic", "want_explainable"],
    conclusions: ["derive_topological_chatbot", "derive_debug_panel"],
    responseHint: "Use facts as nodes, rules as rule nodes, topological order, SCC, and closure.",
    weight: 0.98,
  },
  {
    id: "rule_python_graph",
    label: "Python + Graph Logic -> Graph Visualizer",
    prerequisites: ["skill_python", "want_graph_logic"],
    conclusions: ["derive_graph_visualizer"],
    responseHint: "Turn Python graph intuition into an interactive frontend visualization.",
    weight: 0.84,
  },
  {
    id: "rule_debug_panel",
    label: "Explainable + Portfolio Tool -> Debug Panel",
    prerequisites: ["want_explainable", "derive_portfolio_tool"],
    conclusions: ["derive_debug_panel"],
    responseHint: "Show extracted facts, fired rules, closure facts, rank scores, and reasoning path.",
    weight: 0.9,
  },
  {
    id: "rule_static_deploy",
    label: "React Preference + Deploy -> Static Deploy",
    prerequisites: ["prefer_react", "need_deploy"],
    conclusions: ["derive_static_deploy"],
    responseHint: "Keep a static Pages demo while maintaining React/TypeScript source modules.",
    weight: 0.8,
  },
];
