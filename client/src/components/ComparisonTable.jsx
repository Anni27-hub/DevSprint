import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function ComparisonTable() {
  const comparisonData = [
    {
      feature: 'Execution Architecture',
      devSprint: '4-Agent Stateful Sequential Pipeline',
      chatGPT: 'Single One-Shot Text Response',
      manual: 'Days of Manual Writing'
    },
    {
      feature: 'Output Completeness',
      devSprint: 'PRD + APIs + Schemas + React Code',
      chatGPT: 'Partial Code Snippets',
      manual: 'Fragmented Google Docs'
    },
    {
      feature: 'Data Privacy & Hosting',
      devSprint: '100% Local (Ollama / Qwen 2.5)',
      chatGPT: 'Cloud Data Logging',
      manual: 'N/A'
    },
    {
      feature: 'Self-Correction & Schema Check',
      devSprint: 'Automated Retry Loop',
      chatGPT: 'Fails on Malformed JSON',
      manual: 'Human Peer Review'
    },
    {
      feature: 'Real-Time Streaming UX',
      devSprint: 'Server-Sent Events (SSE) Stream',
      chatGPT: 'Standard Token Stream',
      manual: 'N/A'
    }
  ];

  return (
    <section className="space-y-6 pt-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Why DevSprint Outperforms Standard AI</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">
          DevSprint vs. Generic AI Chatbots
        </h2>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 font-bold text-slate-400">Capability</th>
                <th className="p-4 font-bold text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20">
                  ⚡ DevSprint Agentic Platform
                </th>
                <th className="p-4 font-bold text-slate-400">Standard ChatGPT / LLM Prompt</th>
                <th className="p-4 font-bold text-slate-400">Manual Planning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="p-4 font-semibold text-white">{row.feature}</td>
                  <td className="p-4 font-bold text-indigo-300 bg-indigo-500/5 border-x border-indigo-500/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{row.devSprint}</span>
                  </td>
                  <td className="p-4 text-slate-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{row.chatGPT}</span>
                  </td>
                  <td className="p-4 text-slate-400">{row.manual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
