import { callLocalLLM } from '../config/localAiClient.js';

/**
 * Product Manager Agent (PM Agent) - Local LLM Edition
 */
export async function runPMAgent(userPrompt, modelOverride = null) {
  const systemInstruction = `
You are a Senior Product Manager.
Your goal is to transform a user's project idea into a structured Product Requirements Document (PRD).

CRITICAL REQUIREMENT: Respond ONLY with valid JSON with this exact structure:
{
  "projectTitle": "Catchy Project Name",
  "summary": "2-3 sentence overview",
  "targetAudience": ["User persona 1", "User persona 2"],
  "coreFeatures": [
    {
      "featureName": "Feature Title",
      "description": "Short explanation",
      "priority": "High | Medium | Low"
    }
  ],
  "userStories": [
    "As a <user>, I want to <action> so that <benefit>"
  ],
  "techConstraints": ["Constraint 1", "Constraint 2"]
}
`;

  return await callLocalLLM(systemInstruction, `USER PROJECT IDEA:\n"${userPrompt}"`, 3, modelOverride);
}
