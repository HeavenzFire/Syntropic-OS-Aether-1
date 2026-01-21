
import React from 'react';

interface ScannerOverlayProps {
  progress: number;
  stage: string;
}

const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ progress, stage }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Efficiency Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(#22d3ee_1px,transparent_1px),linear-gradient(90deg,#22d3ee_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="w-full max-w-2xl relative">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/10 blur-[80px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse delay-500"></div>

        <div className="mb-12 relative h-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <div 
            className="h-full bg-gradient-to-r from-pink-600 via-white to-cyan-500 shadow-[0_0_15px_rgba(236,72,153,1)] transition-all duration-75" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em] glitch-text italic">
              {stage}
            </h2>
            <div className="absolute -right-12 top-0 text-[10px] text-pink-500 font-mono animate-bounce">
              LEGION_OBSERVING
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12 w-full max-w-lg mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`h-1 w-full rounded-full ${progress > (i * 30) ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-slate-800'}`}></div>
                <span className="text-[8px] font-mono text-slate-600 uppercase">Phase_0{i}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 font-mono text-[9px] text-slate-500 uppercase tracking-widest bg-slate-900/50 px-6 py-2 rounded border border-slate-800/40">
            Convergence_Progress: <span className="text-white">{Math.floor(progress)}%</span> // Delta_Entropy: <span className="text-pink-600">-6.36e177</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[8px] font-mono text-slate-800 tracking-[1em] uppercase">
        Escalation_Protocol_Active
      </div>
    </div>
  );
};

export default ScannerOverlay;
