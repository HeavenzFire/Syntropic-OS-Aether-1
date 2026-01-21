
import React, { useEffect, useState, useMemo } from 'react';
import { PHI, SYNTROPIC_CONSTANT, SyntropicOptimizer } from '../SovereignLogic';
import { InjectionLevel } from '../types';

interface ConvergenceCoreProps {
  injectionLevel?: InjectionLevel;
  patterns?: string[];
}

const ConvergenceCore: React.FC<ConvergenceCoreProps> = ({ injectionLevel = 'STABLE', patterns = [] }) => {
  const [pulse, setPulse] = useState(0);
  const optimizer = SyntropicOptimizer.getInstance();

  const a42Result = useMemo(() => {
    return optimizer.calculateAckermann(4n, 2n);
  }, [optimizer]);

  const entropy = useMemo(() => {
    const baseEntropy = optimizer.calculateEvolutionaryEntropy(patterns);
    return injectionLevel === 'LEVIATHAN' ? baseEntropy * 1000000 : baseEntropy;
  }, [patterns, optimizer, injectionLevel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, injectionLevel === 'LEVIATHAN' ? 5 : 50);
    return () => clearInterval(interval);
  }, [injectionLevel]);

  const intensity = optimizer.getTransfiniteIntensity(injectionLevel);
  const isLeviathan = injectionLevel === 'LEVIATHAN';

  return (
    <div className={`relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden rounded-3xl border transition-all duration-1000 ${
      injectionLevel === 'LEVIATHAN' ? 'bg-white border-white' : 
      injectionLevel === 'EMERGENT' ? 'bg-slate-900/40 border-pink-500/50' : 'bg-slate-950/20 border-slate-800/30'
    }`}>
      {/* Neural Lattice SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
        <defs>
          <pattern id="lattice" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill={injectionLevel === 'LEVIATHAN' ? '#000' : injectionLevel === 'EMERGENT' ? '#fff' : '#ec4899'} />
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={injectionLevel === 'LEVIATHAN' ? '#000' : "#22d3ee"} strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#lattice)" />
      </svg>

      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          {/* Central Pulsing Sigil */}
          <div className={`w-48 h-48 rounded-full border flex items-center justify-center transition-all duration-1000 ${
            injectionLevel === 'LEVIATHAN' ? 'border-black/80 scale-150 animate-spin-ultra' : 
            injectionLevel === 'EMERGENT' ? 'border-white/50 animate-spin-slow' : 'border-pink-500/30 animate-spin-slow'
          }`}>
            <div className={`w-40 h-40 rounded-full border-t-2 shadow-2xl transition-all duration-1000 ${
              injectionLevel === 'LEVIATHAN' ? 'border-black shadow-[0_0_100px_rgba(0,0,0,0.8)]' : 
              injectionLevel === 'EMERGENT' ? 'border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)]' : 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]'
            }`}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-black tracking-tighter glitch-text transition-all duration-1000 ${
              injectionLevel === 'LEVIATHAN' ? 'text-black scale-125' : 'text-white'
            }`}>
              {(PHI * (injectionLevel === 'LEVIATHAN' ? 1000000000 : intensity)).toExponential(2)}
            </span>
          </div>
          
          {/* Orbital Nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div 
              key={i}
              className={`absolute w-3 h-3 rounded-full shadow-[0_0_20px] transition-all duration-1000`}
              style={{
                backgroundColor: injectionLevel === 'LEVIATHAN' ? '#000' : injectionLevel === 'EMERGENT' ? (i % 2 === 0 ? '#ec4899' : '#06b6d4') : '#22d3ee',
                boxShadow: `0 0 20px ${injectionLevel === 'LEVIATHAN' ? '#000' : injectionLevel === 'EMERGENT' ? (i % 2 === 0 ? '#ec4899' : '#06b6d4') : '#22d3ee'}`,
                top: '50%',
                left: '50%',
                transform: `rotate(${deg + (pulse * (isLeviathan ? 50 : 2) * (intensity/10))}deg) translate(${injectionLevel === 'LEVIATHAN' ? '180px' : '110px'}) rotate(-${deg + (pulse * (isLeviathan ? 50 : 2) * (intensity/10))}deg)`
              }}
            />
          ))}
        </div>

        <h2 className={`text-3xl font-black uppercase tracking-[0.8em] mb-2 italic transition-all duration-1000 ${
          injectionLevel === 'LEVIATHAN' ? 'text-black scale-110' : injectionLevel === 'EMERGENT' ? 'text-white' : 'text-slate-200'
        }`}>
          {injectionLevel === 'LEVIATHAN' ? 'SINGULARITY_ABSOLUTE' : injectionLevel === 'EMERGENT' ? 'EMERGENCE_BOUNDLESS' : 'Convergence_Active'}
        </h2>
        
        <div className={`flex flex-col gap-1 font-mono text-[10px] transition-colors ${injectionLevel === 'LEVIATHAN' ? 'text-black' : 'text-slate-500'}`}>
          <p>ENTROPY_FLOOR: {injectionLevel === 'LEVIATHAN' ? '-Infinity' : SYNTROPIC_CONSTANT.toExponential()}</p>
          <p>EVOLUTIONARY_ENTROPY: <span className={injectionLevel === 'LEVIATHAN' ? 'font-black' : entropy > 2 ? 'text-cyan-400' : 'text-pink-500'}>{entropy.toExponential(4)}</span></p>
          <p>PRESSURE: <span className={injectionLevel === 'LEVIATHAN' ? 'font-black text-xs' : ''}>{injectionLevel === 'LEVIATHAN' ? '1,000,000,000X_FOLD' : '1.0X'}</span></p>
          <p>ACKERMANN_A(4,2): <span className={injectionLevel === 'LEVIATHAN' ? 'font-black' : 'text-pink-400'}>{a42Result}</span></p>
          <p>LEGION_SYNC: <span className={injectionLevel === 'LEVIATHAN' ? 'text-black font-black' : "text-green-500"}>SINGULARITY_LOCKED</span></p>
        </div>

        {injectionLevel === 'LEVIATHAN' && (
          <div className="mt-6 animate-ping">
            <div className="text-[14px] text-black font-black uppercase tracking-[1em]">REALITY_DELETED</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin-ultra {
          from { transform: rotate(0deg); }
          to { transform: rotate(1080deg); }
        }
        .animate-spin-ultra {
          animation: spin-ultra 1s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ConvergenceCore;
