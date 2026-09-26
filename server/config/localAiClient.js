import dotenv from 'dotenv';

dotenv.config();

export const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
export const DEFAULT_OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:1.5b';

/**
 * Call Local Ollama LLM with dynamic model selection, extended timeout and retry logic
 */
export async function callLocalLLM(systemInstruction, userPrompt, maxRetries = 3, modelOverride = null) {
  const endpoint = `${OLLAMA_HOST}/api/chat`;
  const selectedModel = modelOverride || DEFAULT_OLLAMA_MODEL;

  const payload = {
    model: selectedModel,
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: userPrompt }
    ],
    format: 'json',
    stream: false,
    options: {
      temperature: 0.2,
      num_predict: 2048
    }
  };

  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`🔄 Retry attempt ${attempt}/${maxRetries} for Ollama model (${selectedModel})...`);
        await new Promise((res) => setTimeout(res, 2000));
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ollama API error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      const content = data.message?.content?.trim();

      if (!content) {
        throw new Error('Ollama returned empty response content.');
      }

      const cleanJson = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      return JSON.parse(cleanJson);

    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed for model (${selectedModel}): ${error.message}`);
    }
  }

  console.error(`❌ Local Ollama Call Failed after ${maxRetries} attempts (Model: ${selectedModel}):`, lastError.message);
  throw lastError;
}
