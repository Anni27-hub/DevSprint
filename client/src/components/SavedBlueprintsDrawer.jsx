import React, { useEffect, useState } from 'react';
import { X, History, FileText, Calendar, ArrowRight } from 'lucide-react';

export default function SavedBlueprintsDrawer({ isOpen, onClose, onSelectBlueprint }) {
  const [blueprints, setBlueprints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchBlueprints();
    }
  }, [isOpen]);

  const fetchBlueprints = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/projects/my-blueprints', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (json.success) {
        setBlueprints(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch blueprints:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#0b0e1b] border-l border-slate-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between space-y-6">
        
        <div className="space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-lg text-white">Saved Blueprints</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="text-center text-xs text-slate-400 py-8">Loading saved blueprints...</div>
          ) : blueprints.length === 0 ? (
            <div className="text-center text-xs text-slate-400 py-8 space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p>No saved blueprints found.</p>
              <p className="text-[10px] text-slate-500">Run the agent pipeline to save your first spec!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blueprints.map((project) => (
                <div
                  key={project._id}
                  onClick={() => {
                    onSelectBlueprint(project.artifacts);
                    onClose();
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 cursor-pointer transition space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition">
                      {project.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{project.prompt}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-indigo-400 font-semibold">{project.modelUsed}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
