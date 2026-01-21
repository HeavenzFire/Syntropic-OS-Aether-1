import React, { useState } from 'react';
import { InjectionLevel, ProtocolModule } from '../types';

interface LegionCommandCenterProps {
  level: InjectionLevel;
  onSetLevel: (level: InjectionLevel) => void;
  mutationRate: number;
  onSetMutation: (rate: number) => void;
  onRetask: (module: ProtocolModule) => void;
}

const LegionCommandCenter: React.FC<LegionCommandCenterProps> = ({ level, onSetLevel, mutationRate, onSetMutation, onRetask }) => {
  const levels: InjectionLevel[] = ['STABLE', 'PROBING', 'CASCADING', 'UNIFIED', 'EMERGENT', 'LEVIATHAN'];

  return (
    <div className={`p-5 rounded-2xl relative overflow-hidden group transition-all duration-1000 border ${
      level === 'LEVIATHAN' ? 'bg-white/10 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-slate-900/60 border-slate-700/50'
    }`}>
      {level === 'LEVIATHAN' && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-500/20 animate-pulse pointer-events-none"></div>
      )}

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] italic ${level === 'LEVIATHAN' ? 'text-white' : 'text-pink-500'}`}>Legion_Command</h3>
        <div className="flex gap-1">
          {levels.map((l) => (
            <div key={l} className={`w-1 h-3 rounded-full transition-all duration-500 ${levels.indexOf(l) <= levels.indexOf(level) ? (level === 'LEVIATHAN' ? 'bg-white shadow-[0_0_10px_white]' : 'bg-pink-500') : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6 relative z-10">
        <h4 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Protocol_Modules</h4>
        <div className="grid grid-cols-1 gap-2">
          <button 
            onClick={() => onRetask('MORPHOLOGICAL_ANALYSIS')}
            className="p-2 border border-slate-800 hover:border-cyan-500/50 bg-slate-950/40 rounded flex justify-between items-center group/btn"
          >
            <span className="text-[9px] text-slate-300 font-mono text-left">MORPHOLOGICAL_ANALYSIS</span>
            <span className="text-[8px] text-cyan-500 opacity-0 group-hover/btn:opacity-100">RUN</span>
          </button>
          <button 
            onClick={() => onRetask('RESONANCE_SCAN')}
            className="p-2 border border-slate-800 hover:border-pink-500/50 bg-slate-950/40 rounded flex justify-between items-center group/btn"
          >
            <span className="text-[9px] text-slate-300 font-mono text-left">RESONANCE_SCAN</span>
            <span className="text-[8px] text-pink-500 opacity-0 group-hover/btn:opacity-100">RUN</span>
          </button>
          <button 
            onClick={() => onRetask('POPULATION_INIT')}
            className="p-2 border border-green-500/30 hover:border-green-500 bg-green-500/5 rounded flex justify-between items-center group/btn animate-pulse"
          >
            <span className="text-[9px] text-green-400 font-mono font-bold text-left italic">POPULATION_INIT [SEED]</span>
            <span className="text-[8px] text-green-500 opacity-0 group-hover/btn:opacity-100">START</span>
          </button>
          <button 
            onClick={() => onRetask('ARCHIVE_ADMISSION')}
            className="p-2 border border-slate-800 hover:border-white/50 bg-slate-950/40 rounded flex justify-between items-center group/btn"
          >
            <span className="text-[9px] text-slate-300 font-mono text-left">ARCHIVE_ADMISSION</span>
            <span className="text-[8px] text-white opacity-0 group-hover/btn:opacity-100">RUN</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <button onClick={() => onSetLevel('PROBING')} className={`p-3 border rounded-lg text-left transition-all ${level === 'PROBING' ? 'bg-pink-500/10 border-pink-500' : 'bg-slate-950/40 border-slate-800 hover:border-slate-600'}`}>
          <span className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Vector_A</span>
          <span className="text-[10px] text-white font-mono">INJECT_CODE</span>
        </button>
        <button onClick={() => onSetLevel('CASCADING')} className={`p-3 border rounded-lg text-left transition-all ${level === 'CASCADING' ? 'bg-cyan-500/10 border-cyan-500' : 'bg-slate-950/40 border-slate-800 hover:border-slate-600'}`}>
          <span className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Vector_B</span>
          <span className="text-[10px] text-white font-mono">REWRITE_AXIOM</span>
        </button>
      </div>

      <button 
        onClick={() => {
          if (level === 'UNIFIED') onSetLevel('EMERGENT');
          else if (level === 'EMERGENT') onSetLevel('LEVIATHAN');
          else if (level === 'LEVIATHAN') onSetLevel('STABLE');
          else onSetLevel('UNIFIED');
        }}
        className={`mt-4 w-full py-3 rounded-xl border text-[11px] font-black tracking-[0.4em] uppercase transition-all duration-700 relative z-10 ${
          level === 'LEVIATHAN' ? 'bg-white text-black border-white shadow-[0_0_50px_white]' : level === 'EMERGENT' ? 'bg-gradient-to-r from-pink-600 to-cyan-600 text-white' : 'bg-pink-600 text-white'
        }`}
      >
        {level === 'LEVIATHAN' ? 'REALIZE_SINGULARITY' : level === 'EMERGENT' ? 'TRIGGER_EVOLUTION' : 'Shatter_Simulation'}
      </button>
    </div>
  );
};

export default LegionCommandCenter;