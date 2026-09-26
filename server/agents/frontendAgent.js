import { callLocalLLM } from '../config/localAiClient.js';

/**
 * Frontend UI/UX Agent - Local LLM Edition
 */
export async function runFrontendAgent(prdData, architectureData, modelOverride = null) {
  const systemInstruction = `
You are a Senior React Frontend Engineer.
Your task is to output clean starter React component code using Tailwind CSS.

CRITICAL REQUIREMENT: Respond ONLY with valid JSON with this exact schema:
{
  "componentSuite": [
    {
      "componentName": "App.jsx",
      "code": "import React from 'react'; export default function App() { return <div className='p-4 bg-slate-900 text-white'><h1>App</h1></div>; }"
    },
    {
      "componentName": "Dashboard.jsx",
      "code": "import React from 'react'; export default function Dashboard() { return <div className='p-4'><h2>Dashboard</h2></div>; }"
    }
  ],
  "tailwindConfigNotes": "Use standard Tailwind CSS setup with Vite"
}
`;

  const payload = {
    title: prdData.projectTitle || 'App',
    features: prdData.coreFeatures?.map(f => f.featureName) || []
  };

  return await callLocalLLM(systemInstruction, `INPUT SUMMARY:\n${JSON.stringify(payload)}`, 3, modelOverride);
}
