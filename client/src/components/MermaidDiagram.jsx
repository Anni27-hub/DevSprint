import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'system-ui, sans-serif'
});

export default function MermaidDiagram({ chartCode }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  const defaultChart = `graph TD
  Client["💻 React Frontend (Vite + Tailwind)"] -->|HTTP / REST API| Server["⚙️ Express Server Engine"]
  Server -->|Mongoose ORM| DB[("🗄️ MongoDB Atlas Database")]
  Server -->|Ollama API| LocalAI["🧠 Local Qwen 2.5 LLM"]`;

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      setError(false);

      const codeToRender = (chartCode && typeof chartCode === 'string' && chartCode.includes('graph'))
        ? chartCode
        : defaultChart;

      try {
        const id = `mermaid-svg-${Math.floor(Math.random() * 10000)}`;
        const { svg } = await mermaid.render(id, codeToRender);
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.warn('Mermaid rendering warning, using fallback chart:', err);
        if (isMounted) {
          try {
            const fallbackId = `mermaid-fallback-${Math.floor(Math.random() * 10000)}`;
            const { svg } = await mermaid.render(fallbackId, defaultChart);
            if (containerRef.current) {
              containerRef.current.innerHTML = svg;
            }
          } catch (e) {
            setError(true);
          }
        }
      }
    };

    renderDiagram();
    return () => { isMounted = false; };
  }, [chartCode]);

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
          <span>📊</span> Visual System Architecture Graph
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Dynamic SVG Vector</span>
      </div>

      {error ? (
        <div className="text-center text-xs text-slate-500 py-4">
          Unable to render visual graph.
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex justify-center items-center overflow-x-auto p-4 bg-[#03040a] rounded-xl border border-slate-800/60 min-h-[160px]"
        />
      )}
    </div>
  );
}
