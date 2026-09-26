import { runPMAgent } from './pmAgent.js';
import { runArchitectAgent } from './architectAgent.js';
import { runDBAgent } from './dbAgent.js';
import { runFrontendAgent } from './frontendAgent.js';
import { runQAAgent } from './qaAgent.js';

function emitSSEEvent(res, eventName, payload) {
  if (res && !res.writableEnded) {
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }
}

export async function runPMAgentOnly(userPrompt, modelOverride = null) {
  console.log(`📋 Running Stage 1 (PM Agent Only) for prompt: "${userPrompt}" [Model: ${modelOverride || 'Default'}]`);
  return await runPMAgent(userPrompt, modelOverride);
}

export async function runRemainingPipeline(prdData, userPrompt = '', modelOverride = null) {
  console.log(`🚀 Running Stage 2 (Architect, DB, Frontend & QA Security Agents)... [Model: ${modelOverride || 'Default'}]`);
  
  const pipelineState = {
    userPrompt,
    timestamp: new Date().toISOString(),
    status: 'IN_PROGRESS',
    artifacts: { prd: prdData },
    agentLogs: []
  };

  // Step 2: System Architect Agent
  const startTimeArch = Date.now();
  const architectureData = await runArchitectAgent(prdData, modelOverride);
  pipelineState.artifacts.architecture = architectureData;
  pipelineState.agentLogs.push({ agent: 'ARCHITECT_AGENT', status: 'SUCCESS', durationMs: Date.now() - startTimeArch });

  // Step 3: DB & Schema Agent
  const startTimeDB = Date.now();
  const dbData = await runDBAgent(architectureData, modelOverride);
  pipelineState.artifacts.database = dbData;
  pipelineState.agentLogs.push({ agent: 'DB_AGENT', status: 'SUCCESS', durationMs: Date.now() - startTimeDB });

  // Step 4: Frontend UI Agent
  const startTimeFE = Date.now();
  const frontendData = await runFrontendAgent(prdData, architectureData, modelOverride);
  pipelineState.artifacts.frontend = frontendData;
  pipelineState.agentLogs.push({ agent: 'FRONTEND_AGENT', status: 'SUCCESS', durationMs: Date.now() - startTimeFE });

  // Step 5: QA & Security Audit Agent
  const startTimeQA = Date.now();
  const qaData = await runQAAgent(prdData, architectureData, dbData, frontendData, modelOverride);
  pipelineState.artifacts.security = qaData;
  pipelineState.agentLogs.push({ agent: 'QA_AGENT', status: 'SUCCESS', durationMs: Date.now() - startTimeQA });

  pipelineState.status = 'COMPLETED';
  return pipelineState;
}

export async function runDevSprintPipeline(userPrompt, sseRes = null, modelOverride = null) {
  console.log(`🚀 Starting DevSprint Pipeline for prompt: "${userPrompt}" [Model: ${modelOverride || 'Default'}]`);

  const pipelineState = {
    userPrompt,
    timestamp: new Date().toISOString(),
    status: 'IN_PROGRESS',
    artifacts: {},
    agentLogs: []
  };

  try {
    // Step 1: PM Agent
    console.log('📋 Running Step 1: Product Manager Agent...');
    emitSSEEvent(sseRes, 'AGENT_START', { agent: 'PM_AGENT', message: 'Analyzing prompt & building Product Spec (PRD)...' });

    const startTimePM = Date.now();
    const prdData = await runPMAgent(userPrompt, modelOverride);
    const durationPM = Date.now() - startTimePM;

    pipelineState.artifacts.prd = prdData;
    pipelineState.agentLogs.push({ agent: 'PM_AGENT', status: 'SUCCESS', durationMs: durationPM });
    emitSSEEvent(sseRes, 'AGENT_DONE', { agent: 'PM_AGENT', data: prdData, durationMs: durationPM });

    // Step 2: Architect Agent
    console.log('📐 Running Step 2: System Architect Agent...');
    emitSSEEvent(sseRes, 'AGENT_START', { agent: 'ARCHITECT_AGENT', message: 'Designing API contracts & Mermaid diagrams...' });

    const startTimeArch = Date.now();
    const architectureData = await runArchitectAgent(prdData, modelOverride);
    const durationArch = Date.now() - startTimeArch;

    pipelineState.artifacts.architecture = architectureData;
    pipelineState.agentLogs.push({ agent: 'ARCHITECT_AGENT', status: 'SUCCESS', durationMs: durationArch });
    emitSSEEvent(sseRes, 'AGENT_DONE', { agent: 'ARCHITECT_AGENT', data: architectureData, durationMs: durationArch });

    // Step 3: DB Agent
    console.log('🗄️ Running Step 3: DB & Schema Agent...');
    emitSSEEvent(sseRes, 'AGENT_START', { agent: 'DB_AGENT', message: 'Designing Mongoose Schemas & Data Models...' });

    const startTimeDB = Date.now();
    const dbData = await runDBAgent(architectureData, modelOverride);
    const durationDB = Date.now() - startTimeDB;

    pipelineState.artifacts.database = dbData;
    pipelineState.agentLogs.push({ agent: 'DB_AGENT', status: 'SUCCESS', durationMs: durationDB });
    emitSSEEvent(sseRes, 'AGENT_DONE', { agent: 'DB_AGENT', data: dbData, durationMs: durationDB });

    // Step 4: Frontend Agent
    console.log('⚛️ Running Step 4: Frontend UI Agent...');
    emitSSEEvent(sseRes, 'AGENT_START', { agent: 'FRONTEND_AGENT', message: 'Building starter React components with Tailwind...' });

    const startTimeFE = Date.now();
    const frontendData = await runFrontendAgent(prdData, architectureData, modelOverride);
    const durationFE = Date.now() - startTimeFE;

    pipelineState.artifacts.frontend = frontendData;
    pipelineState.agentLogs.push({ agent: 'FRONTEND_AGENT', status: 'SUCCESS', durationMs: durationFE });
    emitSSEEvent(sseRes, 'AGENT_DONE', { agent: 'FRONTEND_AGENT', data: frontendData, durationMs: durationFE });

    // Step 5: QA & Security Audit Agent
    console.log('🛡️ Running Step 5: QA & Security Audit Agent...');
    emitSSEEvent(sseRes, 'AGENT_START', { agent: 'QA_AGENT', message: 'Auditing OWASP security risks & test suite plans...' });

    const startTimeQA = Date.now();
    const qaData = await runQAAgent(prdData, architectureData, dbData, frontendData, modelOverride);
    const durationQA = Date.now() - startTimeQA;

    pipelineState.artifacts.security = qaData;
    pipelineState.agentLogs.push({ agent: 'QA_AGENT', status: 'SUCCESS', durationMs: durationQA });
    emitSSEEvent(sseRes, 'AGENT_DONE', { agent: 'QA_AGENT', data: qaData, durationMs: durationQA });

    pipelineState.status = 'COMPLETED';
    emitSSEEvent(sseRes, 'PIPELINE_COMPLETE', pipelineState);

    return pipelineState;

  } catch (error) {
    console.error('❌ Pipeline Error:', error.message);
    pipelineState.status = 'FAILED';
    pipelineState.error = error.message;

    emitSSEEvent(sseRes, 'PIPELINE_ERROR', { error: error.message });
    throw error;
  }
}
