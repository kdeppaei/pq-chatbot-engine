export type FactId =
  | "goal_frontend"
  | "want_portfolio"
  | "skill_python"
  | "skill_html"
  | "lack_javascript"
  | "want_no_api"
  | "want_graph_logic"
  | "want_explainable"
  | "prefer_react"
  | "need_deploy"
  | "derive_portfolio_tool"
  | "derive_js_learning_path"
  | "derive_topological_chatbot"
  | "derive_graph_visualizer"
  | "derive_debug_panel"
  | "derive_static_deploy";

export interface FactNode {
  id: FactId;
  label: string;
  description: string;
  patterns?: RegExp[];
}

export interface RuleNode {
  id: string;
  label: string;
  prerequisites: FactId[];
  conclusions: FactId[];
  responseHint: string;
  weight: number;
}

export interface GraphNode {
  id: string;
  kind: "fact" | "rule";
  label: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: "requires" | "derives" | "related";
}

export interface RuleGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  adjacency: Map<string, string[]>;
}

export interface TopologicalResult {
  order: string[];
  cycleNodeIds: string[];
  isDag: boolean;
}

export interface SccResult {
  components: string[][];
  cyclicComponents: string[][];
}

export interface TriggeredRule {
  rule: RuleNode;
  newlyDerivedFacts: FactId[];
  step: number;
}

export interface InferenceTrace {
  input: string;
  extractedFacts: FactId[];
  closureFacts: FactId[];
  triggeredRules: TriggeredRule[];
  topologicalOrder: string[];
  cycleNodeIds: string[];
  cyclicComponents: string[][];
  recommendations: RankedRecommendation[];
  reasoningPath: string[];
}

export interface Recommendation {
  factId: FactId;
  title: string;
  answer: string;
}

export interface RankedRecommendation extends Recommendation {
  distance: number;
  score: number;
  matchedFacts: FactId[];
}
