import { getFactLabel } from "./facts";
import type { InferenceTrace } from "./types";

export function generateResponse(trace: InferenceTrace): string {
  const top = trace.recommendations[0];
  if (!top) {
    return "我需要更多 facts 才能推理。請補充目標、技能、限制，或是否要 no-API / graph / explainable。";
  }

  const facts = trace.closureFacts.map(getFactLabel).join(", ");
  const path = trace.reasoningPath[0] ?? "No rule fired; recommendation came from concept neighborhood.";

  return `${top.title}: ${top.answer}\n\nClosure facts: ${facts}\nReasoning path: ${path}`;
}
