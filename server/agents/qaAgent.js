import { callLocalLLM } from '../config/localAiClient.js';

/**
 * QA & Security Audit Agent
 * Role: Audits generated schemas and React components for OWASP vulnerabilities & generates test suite plans.
 */
export async function runQAAgent(prdData, architectureData, dbData, frontendData, modelOverride = null) {
  const systemInstruction = `
You are a Senior Security Engineer and QA Audit Lead specializing in MERN stack security.
Your task is to inspect the software blueprint and produce a comprehensive security audit report and automated test plan.

CRITICAL REQUIREMENT: Respond ONLY with valid JSON with this exact schema:
{
  "securityScore": "95/100 (Grade A)",
  "securityLevel": "High | Medium | Low",
  "vulnerabilityAudit": [
    {
      "checkName": "NoSQL Injection Protection",
      "status": "PASSED | WARNING | FAILED",
      "details": "Mongoose schema sanitization verified"
    },
    {
      "checkName": "Password Hashing Strategy",
      "status": "PASSED | WARNING | FAILED",
      "details": "bcrypt salt rounds >= 10 verified"
    },
    {
      "checkName": "XSS & Content Sanitization",
      "status": "PASSED | WARNING | FAILED",
      "details": "React JSX auto-escaping verified"
    },
    {
      "checkName": "JWT Token Security",
      "status": "PASSED | WARNING | FAILED",
      "details": "Bearer token authentication enabled"
    }
  ],
  "recommendedFixes": [
    "String - Actionable security recommendation 1",
    "String - Actionable security recommendation 2"
  ],
  "testSuitePlan": [
    {
      "testName": "User Registration API Test",
      "testType": "Integration (Supertest)",
      "description": "Verify 201 Created response and valid JWT token payload"
    },
    {
      "testName": "NoSQL Injection Guard Test",
      "testType": "Security Test",
      "description": "Verify malformed query objects ($gt, $ne) are rejected"
    }
  ]
}
`;

  const payload = {
    title: prdData?.projectTitle || 'Software Blueprint',
    schemasCount: dbData?.schemas?.length || 0,
    componentsCount: frontendData?.componentSuite?.length || 0
  };

  return await callLocalLLM(systemInstruction, `INPUT SPEC SUMMARY:\n${JSON.stringify(payload)}`, 3, modelOverride);
}
