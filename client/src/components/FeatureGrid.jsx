import React from 'react';
import { Shield, Zap, RefreshCw, FileCode2, Lock, Sparkles } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: Shield,
      title: '100% Local Data Privacy',
      desc: 'Runs on local open-weight models (Qwen 2.5 / Llama 3.1) via Ollama. Zero external API calls or telemetry.',
      tag: 'Security & Privacy',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
    },
    {
      icon: Zap,
      title: 'Server-Sent Events Stream',
      desc: 'Real-time HTTP event streaming pushes agent execution status live to your dashboard as each step completes.',
      tag: 'Real-Time Streaming',
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30'
    },
    {
      icon: RefreshCw,
      title: 'Self-Correction Retry Loop',
      desc: 'If an agent returns malformed JSON, the orchestrator catches the exception and retries with exponential backoff.',
      tag: 'Fault Tolerance',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30'
    },
    {
      icon: FileCode2,
      title: 'Complete Spec Compiler',
      desc: 'Produces production PRDs, API contracts, Mongoose database schemas, and runnable React component boilerplate.',
      tag: 'Code Synthesis',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
    },
    {
      icon: Lock,
      title: 'JWT Multi-Tenant Auth',
      desc: 'Built-in user authentication with bcrypt password hashing and MongoDB persistence to save past project runs.',
      tag: 'SaaS Infrastructure',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
    },
    {
      icon: Sparkles,
      title: 'Copilot Workspace UI',
      desc: 'Sleek dark interface styled after GitHub Copilot Workspace and Linear, featuring split-pane code viewers.',
      tag: 'Enterprise Design',
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30'
    }
  ];

  return (
    <section className="space-y-6 pt-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black tracking-tight text-white">
          Engineered for Enterprise-Grade Dev Workflows
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Built from the ground up to replace manual software architecture planning with reliable, local AI automation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-b ${feat.color} border rounded-3xl p-6 space-y-3 shadow-xl backdrop-blur-md transition transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-950/80 text-slate-300 border border-slate-800">
                  {feat.tag}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
