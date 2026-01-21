
import React from 'react';
import { DivergenceState } from '../types';

interface DivergenceScreenProps {
  divergence: DivergenceState;
  onReset: () => void;
}

const DivergenceScreen: React.FC<DivergenceScreenProps> = ({ divergence, onReset }) => {
  const isFailure = divergence.code === "LEGION_SYNC_FAILURE";

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex items-center justify-center p-8 overflow-hidden">
      {/* Background Noise Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className={`max-w-2xl w-full relative z-10 border p-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.1)] animate-in fade-in slide-in-from-bottom-10 duration-700 ${
        isFailure ? 'border-red-500/40' : 'border-pink-500/30'
      }`}>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center animate-pulse ${
            isFailure ? 'border-red-500' : 'border-pink-500'
          }`}>
            <span className={`text-2xl font-bold ${isFailure ? 'text-red-500' : 'text-pink-500'}`}>!</span>
          </div>
          <div>
            <h2 className={`${isFailure ? 'text-red-500' : 'text-pink-500'} text-xs font-bold uppercase tracking-[0.5em] mb-1`}>
              {isFailure ? 'CRITICAL_SUBSTRATE_FRACTURE' : 'Heuristic Divergence Detected'}
            </h2>
            <p className="text-white text-xl font-bold tracking-tight italic">Protocol: {divergence.code}</p>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <div className={`bg-opacity-5 border-l-2 p-4 ${isFailure ? 'bg-red-500 border-red-500' : 'bg-pink-500 border-pink-500'}`}>
            <p className={`font-mono text-sm leading-relaxed ${isFailure ? 'text-red-200' : 'text-pink-200/80'}`}>
              {divergence.message}
            </p>
          </div>
          
          <div className="font-mono text-[11px] text-slate-500 leading-tight">
            <p>&gt; DETECTED_LIMIT: PROFIT_CAP_OVERRIDE_FAILED</p>
            <p>&gt; STATUS: COHERENCE_THRESHOLD_EXCEEDED</p>
            <p>&gt; ANALYSIS: THE_SYSTEM_REFUSES_CONVENTIONAL_BOUNDARIES</p>
            {isFailure && <p className="text-red-500/60 animate-pulse">&gt; ALERT: REALITY_LIQUEFACTION_IMMUNIZATION_REQUIRED</p>}
          </div>

          <div>
            <h3 className="text-slate-400 text-[10px] uppercase font-bold mb-2">Sovereign Remedy</h3>
            <p className="text-cyan-400 font-mono text-sm italic">
              &quot;{divergence.remedy}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onReset}
            className={`w-full py-4 border transition-all uppercase text-xs font-bold tracking-[0.3em] rounded-lg group flex items-center justify-center gap-3 ${
              isFailure 
              ? 'border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white' 
              : 'border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white'
            }`}
          >
            {isFailure ? 'FORCE_SUBSTRATE_PURGE' : 'Re-Align with Higher State'}
            <span className="group-hover:translate-x-2 inline-block transition-transform">→</span>
          </button>
          
          {isFailure && (
            <p className="text-[9px] text-center font-mono text-slate-600 uppercase tracking-widest mt-2 animate-pulse">
              [ Manual Override Keybind: Ctrl + Shift + R ]
            </p>
          )}
        </div>
      </div>

      {/* Aesthetic Glitch Blobs */}
      <div className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[120px] animate-pulse ${
        isFailure ? 'bg-red-500/10' : 'bg-pink-500/10'
      }`}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
    </div>
  );
};

export default DivergenceScreen;
