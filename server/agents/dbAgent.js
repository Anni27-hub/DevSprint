import { callLocalLLM } from '../config/localAiClient.js';

/**
 * DB & Schema Agent - Local LLM Edition
 */
export async function runDBAgent(architectureData, modelOverride = null) {
  const systemInstruction = `
You are a Database Engineer specializing in MongoDB and Mongoose.
Your task is to take entity definitions and API contracts and write production Mongoose Schemas.

CRITICAL REQUIREMENT: Respond ONLY with valid JSON with this exact schema:
{
  "schemas": [
    {
      "modelName": "String - e.g. User",
      "fileName": "String - e.g. User.js",
      "code": "String - Complete Mongoose schema JS code"
    }
  ],
  "sampleSeedData": [
    {
      "collection": "String",
      "jsonDocument": {}
    }
  ]
}
`;

  return await callLocalLLM(systemInstruction, `INPUT ARCHITECTURE DATA:\n${JSON.stringify(architectureData, null, 2)}`, 3, modelOverride);
}
