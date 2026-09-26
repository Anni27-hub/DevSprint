import React from 'react';
import { Sparkles, Terminal, Shield, Zap, Cpu, ArrowRight } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative pt-16 pb-12 px-6 text-center space-y-8 overflow-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Enterprise Technical Preview • Powered by Local Ollama AI</span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
          The Autonomous <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Agentic Dev Environment
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Transform high-level product prompts into production PRDs, API contracts, Mongoose data models, and React boilerplate in seconds.
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span>Launch Agent Pipeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
          <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
            <Shield className="w-5 h-5 text-emerald-400" /> 100%
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Local Data Privacy</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
          <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
            <Cpu className="w-5 h-5 text-indigo-400" /> 4 Roles
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Specialized Agents</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
          <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-amber-400" /> 0ms
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Cloud API Latency</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
          <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
            <Terminal className="w-5 h-5 text-purple-400" /> Qwen 2.5
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Open-Weight LLM</div>
        </div>
      </div>
    </section>
  );
}
