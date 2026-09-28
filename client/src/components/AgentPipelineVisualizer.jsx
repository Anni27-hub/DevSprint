import React from 'react';
import { Layers, Cpu, Database, Layout, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function AgentPipelineVisualizer({ isRunning, isCompleted }) {
  const agents = [
    {
      id: 'PM_AGENT',
      name: 'Product Manager',
      role: 'PRD & Feature Scope',
      icon: Layers,
      color: 'border-blue-500/40 text-blue-400 bg-blue-500/5'
    },
    {
      id: 'ARCHITECT_AGENT',
      name: 'System Architect',
      role: 'API Contracts & Flow',
      icon: Cpu,
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/5'
    },
    {
      id: 'DB_AGENT',
      name: 'DB & Schema Lead',
      role: 'Mongoose Data Models',
      icon: Database,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5'
    },
    {
      id: 'FRONTEND_AGENT',
      name: 'Frontend Lead',
      role: 'React Component Suite',
      icon: Layout,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/5'
    },
    {
      id: 'QA_AGENT',
      name: 'QA & Security Lead',
      role: 'OWASP Audit & Tests',
      icon: ShieldCheck,
      color: 'border-rose-500/40 text-rose-400 bg-rose-500/5'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" /> Autonomous 5-Agent Sequential Pipeline
        </h3>
        <span className="text-[11px] text-indigo-400 font-mono">Shared Execution Memory Buffer</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.id}
              className={`relative bg-slate-900/80 backdrop-blur-md border rounded-2xl p-4 space-y-3 transition-all duration-300 hover:translate-y-[-2px] ${agent.color} ${
                isRunning ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                {isCompleted ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Step {index + 1}
                  </span>
                ) : isRunning ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Loader2 className="w-3 h-3 animate-spin" /> Active
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Step {index + 1}</span>
                )}
              </div>

              <div>
                <div className="font-bold text-xs text-white">{agent.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{agent.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
