import type { InferenceTrace } from "./types";
import { getFactLabel } from "./facts";

export interface BrainConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
}

export interface BrainResult {
  used: boolean;
  status: "local-only" | "missing-key" | "llm-brain" | "fallback-local";
  answer: string;
  error: string;
}

export async function callOpenRouterBrain(input: string, trace: InferenceTrace, config: BrainConfig): Promise<BrainResult> {
  if (!config.enabled) {
    return { used: false, status: "local-only", answer: "", error: "" };
  }
  if (!config.apiKey) {
    return { used: false, status: "missing-key", answer: "", error: "OpenRouter API key is missing." };
  }

  const traceContext = {
    extractedFacts: trace.extractedFacts.map(getFactLabel),
    closureFacts: trace.closureFacts.map(getFactLabel),
    triggeredRules: trace.triggeredRules.map((trigger) => ({
      id: trigger.rule.id,
      prerequisites: trigger.rule.prerequisites.map(getFactLabel),
      conclusions: trigger.rule.conclusions.map(getFactLabel),
      derived: trigger.newlyDerivedFacts.map(getFactLabel),
    })),
    topRecommendation: trace.recommendations[0],
    localReasoningPath: trace.reasoningPath,
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": location.origin,
        "X-Title": "Topological Rule-based Chatbot Engine",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 900,
        temperature: 0.35,
        messages: [
          {
            role: "system",
            content:
              "你是 Topological Rule-based Chatbot Engine 的免費開源模型主腦。請用繁體中文，根據拓樸推理 trace 補強回答，不要捏造 trace 沒有的 facts。",
          },
          {
            role: "user",
            content: `使用者輸入：${input}\n\n拓樸推理 trace JSON：\n${JSON.stringify(traceContext, null, 2)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}: ${(await response.text()).slice(0, 220)}`);
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      throw new Error("Model returned an empty message.");
    }

    return { used: true, status: "llm-brain", answer, error: "" };
  } catch (error) {
    return {
      used: false,
      status: "fallback-local",
      answer: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
