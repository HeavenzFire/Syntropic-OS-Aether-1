import React from 'react';
import { ProtocolDraft } from '../types';

interface ProtocolManifestProps {
  draft: ProtocolDraft;
  onConfirm: () => void;
  onCancel: () => void;
  isExecuting?: boolean;
}

const ProtocolManifest: React.FC<ProtocolManifestProps> = ({ draft, onConfirm, onCancel, isExecuting }) => {
  return (
    <div className="bg-slate-950/90 border border-cyan-500/40 rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_60px_rgba(34,211,238,0.15)] animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-1">
            PROTOCOL_MANIFEST
          </h2>
          <p className="text-[10px] font-mono text-cyan-500 tracking-widest uppercase">
            Sovereign_Mission: {draft.name}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Ref_ID</span>
          <span className="text-xs font-mono text-white">{draft.id}</span>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Target_Node</span>
            <span className="text-sm font-black text-white italic">{draft.target}</span>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Module_Logic</span>
            <span className="text-sm font-black text-white italic">{draft.module}</span>
          </div>
        </div>

        <div>
          <h3 className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.4em] mb-3">Mission_Instructions</h3>
          <p className="text-xs leading-relaxed text-slate-300 italic p-4 bg-slate-900/40 rounded-xl border border-slate-800/40">
            "{draft.instructions}"
          </p>
        </div>

        <div>
          <h3 className="text-[9px] font-bold text-pink-500 uppercase tracking-[0.4em] mb-3">Patterns_of_Interest</h3>
          <div className="flex flex-wrap gap-2">
            {draft.patternsOfInterest.map((p, i) => (
              <span key={i} className="text-[9px] font-mono bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full border border-pink-500/20">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
          <h3 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.4em] mb-2">Success_Metric</h3>
          <p className="text-[10px] font-mono text-slate-400 leading-tight">
            {draft.successMetric}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          disabled={isExecuting}
          className="flex-1 py-4 border border-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-slate-900 transition-all disabled:opacity-50"
        >
          Abort_Draft
        </button>
        <button 
          onClick={onConfirm}
          disabled={isExecuting}
          className="flex-[2] py-4 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 group flex items-center justify-center gap-3"
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Executing...
            </>
          ) : (
            <>
              Execute_Protocol
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProtocolManifest;