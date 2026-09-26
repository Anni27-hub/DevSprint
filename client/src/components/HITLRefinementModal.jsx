import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';

export default function HITLRefinementModal({ isOpen, prdData, onClose, onApprove }) {
  if (!isOpen || !prdData) return null;

  const [title, setTitle] = useState(prdData.projectTitle || '');
  const [summary, setSummary] = useState(prdData.summary || '');
  const [features, setFeatures] = useState(prdData.coreFeatures || []);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDesc, setNewFeatureDesc] = useState('');

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeatureName.trim()) return;
    setFeatures([
      ...features,
      { featureName: newFeatureName, description: newFeatureDesc || 'Custom user requirement', priority: 'High' }
    ]);
    setNewFeatureName('');
    setNewFeatureDesc('');
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleApprove = () => {
    const refinedPrd = {
      ...prdData,
      projectTitle: title,
      summary: summary,
      coreFeatures: features
    };
    onApprove(refinedPrd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0e1b] border border-indigo-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Human-in-the-Loop (HITL) PRD Review</h2>
              <p className="text-xs text-slate-400">Inspect & refine Product Specs before System Architect & DB Agents run</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Summary Editing */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">Summary Overview</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Features Management */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Generated Features ({features.length})
            </label>
            <span className="text-[10px] text-slate-500 font-mono">Click trash icon to remove</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>{feat.featureName}</span>
                    <span className="text-[9px] px-2 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {feat.priority || 'High'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{feat.description}</div>
                </div>
                <button
                  onClick={() => handleRemoveFeature(idx)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Custom Requirement */}
          <form onSubmit={handleAddFeature} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5 text-indigo-400" /> Add Custom Requirement / Feature
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Feature Title (e.g. Stripe Payment Support)"
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-1.5 rounded-lg transition"
              >
                Add Feature
              </button>
            </div>
          </form>
        </div>

        {/* Actions Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Human approval required
          </span>
          <button
            onClick={handleApprove}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <span>Approve PRD & Run Remaining Agents</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
