import { runDevSprintPipeline } from './agents/orchestrator.js';

async function test() {
  const testPrompt = "Build an AI-powered fitness tracking web app with daily workout logging and progress charts";
  
  console.log('--- TESTING DEVSPRINT MULTI-AGENT PIPELINE ---');
  try {
    const result = await runDevSprintPipeline(testPrompt);
    console.log('\n--- PIPELINE EXECUTION COMPLETED! ---');
    console.log('Project Title:', result.artifacts.prd.projectTitle);
    console.log('PRD Summary:', result.artifacts.prd.summary);
    console.log('Recommended Stack:', result.artifacts.architecture.recommendedStack);
    console.log('API Routes Generated:', result.artifacts.architecture.apiRoutes.length);
    console.log('Mongoose Models Generated:', result.artifacts.database.schemas.length);
    console.log('React Components Generated:', result.artifacts.frontend.componentSuite.length);
  } catch (error) {
    console.error('Test Failed:', error.message);
  }
}

test();
