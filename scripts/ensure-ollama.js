import { exec } from 'child_process';
import http from 'http';

/**
 * Checks if Ollama service is running on http://localhost:11434.
 * If not running, launches 'ollama serve' automatically in background.
 */
function checkOllama() {
  const req = http.get('http://localhost:11434/api/version', (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Ollama is running locally on http://localhost:11434');
      process.exit(0);
    }
  });

  req.on('error', () => {
    console.log('⚡ Ollama is not running yet. Starting Ollama automatically...');
    const ollamaProcess = exec('ollama serve', { detached: true, stdio: 'ignore' });
    ollamaProcess.unref();

    setTimeout(() => {
      console.log('🚀 Ollama started successfully!');
      process.exit(0);
    }, 3000);
  });
}

checkOllama();
