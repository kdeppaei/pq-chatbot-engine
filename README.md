# Topological Rule-based Chatbot Engine

A no-API pseudo chatbot engine built with propositional facts, rule graph nodes, topological sorting, strongly connected component detection, inference closure, and concept-distance recommendation ranking.

## Live Demo

GitHub Pages URL:

https://kdeppaei.github.io/pq-chatbot-engine/

## What Runs In The Browser

- Fact extraction from user input
- Facts modeled as graph nodes
- Rules modeled as rule nodes with prerequisite facts and conclusion facts
- Topological sorting for rule execution order
- Strongly connected component detection for rule-cycle debugging
- Inference closure over all derivable facts
- Concept graph distance ranking for recommendations
- Explainable reasoning path for every answer
- Optional OpenRouter brain mode using your own browser-local API key
- Enter-to-submit chat input with Shift+Enter newline support
- Panels for chat, fact extraction, rule graph debug, triggered rules, closure facts, and recommendation ranking

No external AI API is required by default.

Brain mode is optional. The app does not ship with an API key. If enabled, the key is stored only in the user's browser `localStorage`, and the local topological engine remains the fallback.

## Source Modules

The React/TypeScript source architecture is in `src/engine`:

- `types.ts`
- `facts.ts`
- `rules.ts`
- `graph.ts`
- `topologicalSort.ts`
- `scc.ts`
- `inferenceEngine.ts`
- `conceptGraph.ts`
- `recommendationRanker.ts`
- `responseGenerator.ts`
- `brainClient.ts`

The deployed `index.html` is a static MVP version of the same topological engine so it can run directly on GitHub Pages.
