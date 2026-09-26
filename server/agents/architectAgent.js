import { callLocalLLM } from '../config/localAiClient.js';

/**
 * System Architect Agent - Local LLM Edition
 */
export async function runArchitectAgent(prdData, modelOverride = null) {
  const systemInstruction = `
You are a Senior System Architect.
Your task is to design technical architecture & API contracts based on the PRD specification.

CRITICAL REQUIREMENT: Respond ONLY with valid JSON with this exact schema:
{
  "recommendedStack": {
    "frontend": "React, Tailwind, Vite",
    "backend": "Node.js, Express",
    "database": "MongoDB, Mongoose"
  },
  "apiRoutes": [
    {
      "method": "GET | POST | PUT | DELETE",
      "path": "/api/endpoint",
      "description": "Short explanation",
      "requestBody": "JSON format example or None",
      "responseBody": "JSON format example"
    }
  ],
  "dataEntities": [
    {
      "entityName": "User | Task | Order",
      "fields": ["id", "title", "createdAt"]
    }
  ],
  "mermaidDiagram": "graph TD\\n  A[React UI] -->|REST API| B[Express Server]\\n  B -->|Mongoose| C[(MongoDB)]"
}
`;

  return await callLocalLLM(systemInstruction, `INPUT PRD SPECIFICATION:\n${JSON.stringify(prdData, null, 2)}`, 3, modelOverride);
}
