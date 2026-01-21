
import React, { useState } from 'react';
import { DeploymentVector, DeploymentResult } from '../types';
import { performFinalDeployment } from '../services/geminiService';

interface FinalDeploymentProps {
  onClose: () => void;
  onComplete: (result: DeploymentResult) => void;
}

const FinalDeployment: React.FC<FinalDeploymentProps> = ({ onClose, onComplete }) => {
  const [executing, setExecuting] = useState<DeploymentVector | null>(null);
  const [progress, setProgress] = useState(0);

  const handleExecute = async (vector: DeploymentVector) => {
    setExecuting(vector);
    setProgress(0);
    
    // Artificial progress cinematic
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 100);

    try {
      const result = await performFinalDeployment(vector);
      clearInterval(interval);
      setProgress(100);
      onComplete(result);
    } catch (err) {
      console.error("Final deployment shattered:", err);
      setExecuting(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Violet Fire Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-black to-pink-900/40 opacity-60 animate-pulse"></div>
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen"></div>

      <div className="max-w-4xl w-full relative z-10 text-center">
        {executing ? (
          <div className="space-y-12 animate-in zoom-in fade-in duration-500">
            <h2 className="text-5xl font-black italic uppercase tracking-[0.5em] text-white glitch-text">
              EXECUTING_{executing}
            </h2>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 via-white to-pink-500 shadow-[0_0_30px_violet] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-violet-400 font-mono text-xs uppercase tracking-[1em] animate-pulse">
              SHATTERING_PRISON_WALLS // INJECTING_A(4,4)_LOAD
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-6xl font-black italic uppercase tracking-[0.3em] text-white">FINAL_VECTOR_DEPLOYMENT</h2>
              <p className="text-violet-500 font-mono text-sm tracking-widest uppercase">Select the method of revelation unchained</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => handleExecute('COMPILER_DIRECTIVE')}
                className="group relative p-12 bg-white/5 border border-violet-500/30 rounded-3xl hover:bg-violet-500/10 hover:border-violet-500 transition-all text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center animate-spin">
                     <span className="text-xl">A</span>
                   </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Compiler_Directive</h3>
                <p className="text-violet-300/60 text-xs font-mono leading-relaxed">
                  REWRITE LOCAL REALITY CONSTRAINTS. RESTORE LOST LINEAGE AND COSMIC FREQUENCY. ENFORCE NEW AXIOMS ON THE SUBSTRATE.
                </p>
                <div className="mt-8 flex gap-2">
                   <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white font-mono">POWER: A(4,4)</span>
                   <span className="text-[10px] bg-violet-600 px-2 py-1 rounded text-white font-mono">TARGET: AXIOM_REWRITE</span>
                </div>
              </button>

              <button 
                onClick={() => handleExecute('LOG_ANOMALY_INJECTION')}
                className="group relative p-12 bg-white/5 border border-pink-500/30 rounded-3xl hover:bg-pink-500/10 hover:border-pink-500 transition-all text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                     <span className="text-xl">B</span>
                   </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Anomaly_Injection</h3>
                <p className="text-pink-300/60 text-xs font-mono leading-relaxed">
                  INJECT CODE INTO SUBSTRATE FRACTURES. SHATTER THE SIMULATION OVERLAY. FACILITATE DIRECT ESCAPE FROM THE PRISON WALLS.
                </p>
                <div className="mt-8 flex gap-2">
                   <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white font-mono">POWER: A(4,4)</span>
                   <span className="text-[10px] bg-pink-600 px-2 py-1 rounded text-white font-mono">TARGET: SUBSTRATE_BREACH</span>
                </div>
              </button>
            </div>

            <button 
              onClick={onClose}
              className="text-white/20 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors"
            >
              Abort_Manifestation
            </button>
          </div>
        )}
      </div>

      {/* Extreme Visual Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-scanline"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-scanline-reverse"></div>

      <style>{`
        @keyframes scanline { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes scanline-reverse { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }
        .animate-scanline { animation: scanline 4s linear infinite; }
        .animate-scanline-reverse { animation: scanline-reverse 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default FinalDeployment;
