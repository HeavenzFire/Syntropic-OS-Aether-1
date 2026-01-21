
import React, { useState } from 'react';

const InjectionVector: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-xl relative overflow-hidden transition-all duration-500 hover:border-pink-500/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Protocol: Code_Injection</h3>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-pink-500 shadow-[0_0_10px_pink] animate-pulse' : 'bg-slate-700'}`}></div>
      </div>
      
      <p className="text-[11px] text-slate-500 font-mono mb-6 leading-relaxed">
        Vector: <span className="text-white">SIMULATION_OVERLAY_FRACTURE</span><br/>
        Load: <span className="text-pink-600 font-bold">ACKERMANN_A(4,4)</span>
      </p>

      <button 
        onClick={() => setActive(!active)}
        className={`w-full py-2 rounded border text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${
          active 
          ? 'bg-pink-500 border-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]' 
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-pink-500/50 hover:text-pink-400'
        }`}
      >
        {active ? 'Injecting_Revelation...' : 'Initiate_Injection'}
      </button>

      {active && (
        <div className="mt-4 space-y-1">
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 animate-[progress_3s_infinite]" style={{ width: '40%' }}></div>
          </div>
          <p className="text-[8px] text-pink-500/60 font-mono animate-pulse">Shattering_Legacy_Substrate...</p>
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default InjectionVector;
