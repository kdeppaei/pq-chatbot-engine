import type { FactId } from "./types";

export const conceptNeighbors: Record<FactId, FactId[]> = {
  goal_frontend: ["want_portfolio", "prefer_react", "derive_portfolio_tool", "derive_js_learning_path"],
  want_portfolio: ["goal_frontend", "derive_portfolio_tool", "derive_debug_panel"],
  skill_python: ["want_graph_logic", "derive_graph_visualizer"],
  skill_html: ["goal_frontend", "prefer_react"],
  lack_javascript: ["goal_frontend", "derive_js_learning_path"],
  want_no_api: ["want_graph_logic", "want_explainable", "derive_topological_chatbot"],
  want_graph_logic: ["skill_python", "want_no_api", "derive_topological_chatbot", "derive_graph_visualizer"],
  want_explainable: ["want_no_api", "derive_debug_panel"],
  prefer_react: ["goal_frontend", "need_deploy", "derive_static_deploy"],
  need_deploy: ["prefer_react", "derive_static_deploy"],
  derive_portfolio_tool: ["goal_frontend", "want_portfolio", "derive_debug_panel"],
  derive_js_learning_path: ["goal_frontend", "lack_javascript"],
  derive_topological_chatbot: ["want_no_api", "want_graph_logic", "derive_debug_panel"],
  derive_graph_visualizer: ["skill_python", "want_graph_logic"],
  derive_debug_panel: ["want_explainable", "derive_topological_chatbot", "derive_portfolio_tool"],
  derive_static_deploy: ["prefer_react", "need_deploy"],
};

export function shortestConceptDistance(from: FactId[], to: FactId): number {
  const queue = from.map((factId) => ({ factId, distance: 0 }));
  const visited = new Set<FactId>(from);

  while (queue.length > 0) {
    const current = queue.shift() as { factId: FactId; distance: number };
    if (current.factId === to) {
      return current.distance;
    }
    for (const neighbor of conceptNeighbors[current.factId] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ factId: neighbor, distance: current.distance + 1 });
      }
    }
  }

  return Number.POSITIVE_INFINITY;
}
