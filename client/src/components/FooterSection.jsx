import React from 'react';
import { Sparkles, Terminal, Shield, Cpu, Github } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#03040a] text-xs text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">DevSprint Workspace</span>
          </div>
          <p className="text-slate-500 max-w-sm">
            Autonomous Multi-Agent Dev Environment powered by MERN Stack and Local Ollama Open-Weight AI models.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% Offline Privacy</span>
          <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> Qwen 2.5 Local Engine</span>
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-purple-400" /> MERN + SSE Streaming</span>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-600 font-mono">
          © 2026 DevSprint Workspace • Enterprise Dev Environment
        </div>

      </div>
    </footer>
  );
}
