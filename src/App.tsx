import { useState } from "react";
import { getFactLabel } from "./engine/facts";
import { runInference } from "./engine/inferenceEngine";
import { generateResponse } from "./engine/responseGenerator";
import type { InferenceTrace } from "./engine/types";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [trace, setTrace] = useState<InferenceTrace | null>(null);

  function submit() {
    const nextTrace = runInference(input);
    setTrace(nextTrace);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="grid min-h-screen grid-cols-[360px_1fr_420px]">
        <aside className="border-r border-slate-300 bg-white p-4">
          <p className="font-mono text-xs uppercase text-slate-500">Chat Panel</p>
          <h1 className="text-xl font-bold">Topological Rule-based Chatbot Engine</h1>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} className="mt-4 h-36 w-full border p-3" />
          <button onClick={submit} className="mt-3 w-full bg-slate-950 px-4 py-3 text-white">
            Run Topological Inference
          </button>
        </aside>
        <section className="space-y-4 p-4">
          <Panel title="Fact Extraction Panel">{trace?.extractedFacts.map(getFactLabel).join(", ") || "Waiting for input"}</Panel>
          <Panel title="Inference Closure Panel">{trace?.closureFacts.map(getFactLabel).join(", ") || "No closure yet"}</Panel>
          <Panel title="Recommendation Ranking Panel">
            {trace?.recommendations.map((item) => `${item.title} / score ${item.score.toFixed(2)}`).join("\n") || "No ranking yet"}
          </Panel>
          <Panel title="Answer">{trace ? generateResponse(trace) : "Ask a question to derive closure facts."}</Panel>
        </section>
        <aside className="space-y-4 overflow-auto bg-slate-950 p-4 text-slate-100">
          <Panel dark title="Rule Graph Debug Panel">
            {trace ? `Topo order: ${trace.topologicalOrder.join(" -> ")}\nCycles: ${trace.cycleNodeIds.join(", ") || "none"}` : "Waiting"}
          </Panel>
          <Panel dark title="Triggered Rules Panel">
            {trace?.triggeredRules.map((rule) => `${rule.step}. ${rule.rule.label}`).join("\n") || "No rules fired"}
          </Panel>
        </aside>
      </section>
    </main>
  );
}

function Panel({ title, children, dark = false }: { title: string; children: string; dark?: boolean }) {
  return (
    <article className={`border p-4 ${dark ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"}`}>
      <p className="font-mono text-xs uppercase text-slate-500">{title}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{children}</p>
    </article>
  );
}
