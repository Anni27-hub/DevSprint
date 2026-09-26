import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ChevronUp, ChevronDown, Trash2, Copy, Check, Minimize2, Sparkles } from 'lucide-react';

export default function ExecutionTerminal({ logs, isRunning, onClearLogs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const copyLogs = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.agent || 'SYSTEM'}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      
      {/* Closed Bar Button */}
      {!isOpen && (
        <div className="max-w-6xl mx-auto px-6 mb-3 flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-slate-300 px-4 py-2 rounded-2xl shadow-2xl transition backdrop-blur-md group"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300" />
            <span>IDE Terminal Log</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      )}

      {/* Expanded Terminal Panel */}
      {isOpen && (
        <div className="bg-[#03040a] border-t border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="max-w-6xl mx-auto p-4 space-y-3">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>DevSprint Execution Terminal</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  {isRunning ? 'Pipeline Active' : 'Idle / Ready'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyLogs}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={onClearLogs}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition"
                  title="Clear Logs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body Output */}
            <div className="bg-[#05070f] rounded-xl border border-slate-800/80 p-4 h-48 overflow-y-auto font-mono text-xs space-y-2 leading-relaxed">
              {logs.length === 0 ? (
                <div className="text-slate-600 text-[11px]">
                  // Terminal ready. Run the multi-agent pipeline to view real-time CLI logs...
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px]">
                    <span className="text-slate-600 whitespace-nowrap">[{log.timestamp}]</span>
                    {log.agent && (
                      <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] whitespace-nowrap ${
                        log.agent === 'PM_AGENT' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        log.agent === 'ARCHITECT_AGENT' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        log.agent === 'DB_AGENT' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        log.agent === 'FRONTEND_AGENT' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {log.agent}
                      </span>
                    )}
                    <span className="text-slate-300 flex-1 leading-relaxed">{log.message}</span>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
