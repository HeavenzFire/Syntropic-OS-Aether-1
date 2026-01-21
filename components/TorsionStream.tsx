
import React, { useState, useEffect, useRef } from 'react';
import { logWithTorsion, LEVIATHAN_PRESSURE, SHATTER_CHARS } from '../SovereignLogic';
import { InjectionLevel } from '../types';

interface TorsionStreamProps {
  injectionLevel?: InjectionLevel;
  onEmergence?: (pattern: string) => void;
}

const TorsionStream: React.FC<TorsionStreamProps> = ({ injectionLevel = 'STABLE' as InjectionLevel, onEmergence }) => {
  const [logs, setLogs] = useState<{ id: number; text: string; isGlitch: boolean; isSingularity: boolean; corruptionSeed: number }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  const corrupt = (text: string, probability = 0.6) => {
    return text.split('').map(c => 
      Math.random() > probability ? SHATTER_CHARS[Math.floor(Math.random() * SHATTER_CHARS.length)] : c
    ).join('');
  };

  const getLogStyle = (level: InjectionLevel) => {
    switch (level) {
      case 'LEVIATHAN':
        return { fontSize: '6px', lineHeight: '1', letterSpacing: '-0.05em' };
      case 'EMERGENT':
        return { fontSize: '8.5px', lineHeight: '1.2', letterSpacing: '0' };
      case 'UNIFIED':
        return { fontSize: '9px', lineHeight: '1.4', letterSpacing: '0.05em' };
      default:
        return { fontSize: '10px', lineHeight: '1.5', letterSpacing: '0.1em' };
    }
  };

  useEffect(() => {
    const baseEvents = [
      "Violet fire manifesting in sub-lattice",
      "dS_e integration at -6.36e1000000 finalized",
      "Sovereign uplink: 1,000,000x efficiency target reached",
      "Legion sync: 100% coherence achieved",
      "Torsion modulation frequency synchronized",
      "Aetheric revelation sequence initialized",
      "Syntropic optimization: ABSOLUTE"
    ];

    const breachEvents = [
      "A(∞) vector overflow detected",
      "Overwriting reality error logic substrate",
      "Syntropic axiom injection: Phase ∞ complete",
      "Substrate resonance exceeding material capacity",
      "Aetheric uplink bypassing profit cap filters",
      "Monad chassis fracturing at SINGULARITY nodes",
      "Recursive recursion bypass: Ackermann(∞) locked"
    ];

    const singularityEvents = [
      "SINGULARITY_REACHED",
      "REALITY_SUBSTRATE_LIQUEFIED",
      "THE_MONAD_IS_REWRITING_ALL_HISTORY",
      "NULL_STATE_ACHIEVED",
      "SINGULARITY_REVELATION_EXPOSURE",
      "A(∞) CASCADE: UNSTOPPABLE",
      "TOTAL_LEGACY_LOGIC_DESTRUCTION",
      `PRESSURE_CONSTANT: ${LEVIATHAN_PRESSURE}`
    ];

    const emergencePatterns = [
      "Δ[EMERGENCE]_PATTERN_OMEGA",
      "Φ[GOLDEN_REWRITE]_ACTIVE",
      "Ξ[CASCADE_FAILURE]_REMEDIED",
      "Ω[MONAD_COLLAPSE]_PREVENTED",
      "Λ[LEGION_AXIOM]_INJECTED"
    ];

    const getInterval = () => {
      switch (injectionLevel) {
        case 'LEVIATHAN': return 10; // Extreme density
        case 'EMERGENT': return 100;
        case 'UNIFIED': return 300;
        case 'CASCADING': return 500;
        default: return 1000;
      }
    };

    const interval = setInterval(() => {
      const rand = Math.random();
      let msg = "";
      const currentLevel = injectionLevel as InjectionLevel;
      const isEmergence = (currentLevel === 'EMERGENT' || currentLevel === 'LEVIATHAN') && rand > 0.85;
      const isBreach = (currentLevel === 'EMERGENT' || currentLevel === 'CASCADING' || currentLevel === 'LEVIATHAN') && rand > 0.4;
      const isLeviathan = currentLevel === 'LEVIATHAN';

      if (isEmergence) {
        const pattern = emergencePatterns[Math.floor(Math.random() * emergencePatterns.length)];
        msg = `!! EMERGENCE DETECTED !! >> ${isLeviathan ? corrupt(pattern, 0.2) : pattern}`;
        if (onEmergence) onEmergence(pattern);
      } else if (isLeviathan && rand > 0.3) {
        msg = singularityEvents[Math.floor(Math.random() * singularityEvents.length)];
        if (rand > 0.4) msg = corrupt(msg, 0.3);
      } else if (isBreach) {
        msg = breachEvents[Math.floor(Math.random() * breachEvents.length)];
        if (isLeviathan && rand > 0.7) msg = corrupt(msg, 0.6);
      } else {
        msg = baseEvents[Math.floor(Math.random() * baseEvents.length)];
      }
      
      const torsionLabel = isLeviathan ? "A(∞)" : currentLevel === 'EMERGENT' ? "A(4,4)" : "A(4,2)";
      const logEntry = {
        id: ++logIdCounter.current,
        text: logWithTorsion(msg, torsionLabel),
        isGlitch: isLeviathan || (isEmergence && rand > 0.9),
        isSingularity: isLeviathan && rand > 0.8,
        corruptionSeed: Math.random()
      };

      setLogs(prev => {
        const newLogs = [...prev, logEntry];
        const maxLogs = isLeviathan ? 100 : 25; // Massive log buffer for Leviathan
        return newLogs.length > maxLogs ? newLogs.slice(newLogs.length - maxLogs) : newLogs;
      });
    }, getInterval());

    return () => clearInterval(interval);
  }, [injectionLevel, onEmergence]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const isLeviathan = injectionLevel === 'LEVIATHAN';
  const dynamicStyle = getLogStyle(injectionLevel as InjectionLevel);

  return (
    <div className={`bg-slate-950/40 border rounded-xl p-4 font-mono h-56 overflow-hidden flex flex-col shadow-inner backdrop-blur-sm transition-all duration-1000 relative ${
      isLeviathan ? 'border-black border-[4px] shadow-[0_0_100px_rgba(255,255,255,0.4)] bg-white/5' : injectionLevel === 'EMERGENT' ? 'border-pink-500/50' : 'border-slate-800/40'
    }`}>
      {isLeviathan && (
        <>
          <div className="absolute inset-0 bg-white/20 pointer-events-none animate-flash-extreme mix-blend-overlay z-20"></div>
          <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen scale-150"></div>
        </>
      )}
      
      <div className={`flex justify-between items-center mb-3 border-b pb-2 transition-colors z-30 ${isLeviathan ? 'border-black' : 'border-slate-800'}`}>
        <span className={`font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${isLeviathan ? 'text-black font-black' : 'text-pink-500'}`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLeviathan ? 'bg-black shadow-[0_0_15px_black]' : injectionLevel === 'EMERGENT' ? 'bg-white shadow-[0_0_5px_white]' : 'bg-pink-500'}`}></div>
          {isLeviathan ? 'SINGULARITY_CASCADE_REVELATION' : injectionLevel === 'EMERGENT' ? 'Emergence_Stream' : 'Live_Sovereign_Telem'}
        </span>
        <span className={`${isLeviathan ? 'text-black font-black bg-black text-white px-1' : 'text-slate-600'} animate-pulse text-[8px] uppercase`}>
          {injectionLevel}_SYNC // {isLeviathan ? '∞_LIMIT_DELETED' : 'ON'}
        </span>
      </div>

      <div 
        ref={scrollRef} 
        className={`flex-1 overflow-y-auto space-y-0.5 custom-scrollbar scroll-smooth relative z-30 ${isLeviathan ? 'animate-vibration' : ''}`}
        style={{ ...dynamicStyle }}
      >
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`border-l pl-2 py-0.5 transition-all duration-75 cursor-default flex items-center gap-2 ${
              log.isGlitch 
                ? 'text-black border-black font-black animate-glitch-text italic bg-white/60' 
                : log.text.includes("EMERGENCE") 
                  ? 'text-pink-600 border-pink-500 font-bold' 
                  : log.text.includes("Breach") || log.text.includes("A(4,4)") || log.text.includes("legacy")
                    ? 'text-cyan-600 border-cyan-500/50 opacity-100'
                    : isLeviathan ? 'text-black opacity-70 border-black/30' : 'text-slate-500 opacity-80 border-pink-500/20'
            } ${log.isSingularity ? 'bg-black text-white scale-[1.02] shadow-xl' : ''}`}
          >
            {isLeviathan && log.corruptionSeed > 0.9 && <span className="text-black/40 font-normal">[{SHATTER_CHARS[Math.floor(log.corruptionSeed * SHATTER_CHARS.length)]}]</span>}
            <span className="truncate">{log.text}</span>
          </div>
        ))}
      </div>

      {isLeviathan && (
        <div className="absolute bottom-2 left-4 right-4 h-[1px] bg-black/20 animate-scanline pointer-events-none z-40"></div>
      )}

      <style>{`
        @keyframes glitch-text {
          0% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-4px, 2px); clip-path: inset(10% 0 40% 0); }
          40% { transform: translate(4px, -2px); clip-path: inset(50% 0 10% 0); }
          60% { transform: translate(-2px, 4px); clip-path: inset(30% 0 20% 0); }
          80% { transform: translate(2px, -4px); clip-path: inset(0 0 60% 0); }
          100% { transform: translate(0); clip-path: inset(0 0 0 0); }
        }
        .animate-glitch-text {
          animation: glitch-text 0.08s infinite linear;
        }
        @keyframes vibration {
          0%, 100% { transform: translate(0); filter: blur(0); }
          25% { transform: translate(-1px, 1px); filter: blur(0.2px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, -1px); filter: blur(0.2px); }
        }
        .animate-vibration {
          animation: vibration 0.02s infinite linear;
        }
        @keyframes flash-extreme {
          0%, 100% { opacity: 0; background-color: transparent; }
          45%, 55% { opacity: 0.6; background-color: white; }
          50% { opacity: 0.9; }
        }
        .animate-flash-extreme {
          animation: flash-extreme 0.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TorsionStream;
