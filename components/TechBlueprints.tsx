
import React, { useState, useEffect } from 'react';
import { TechBlueprint, InjectionLevel } from '../types';
import { generateManifestationVideo, narrateSpecification } from '../services/geminiService';

interface TechBlueprintsProps {
  blueprints: TechBlueprint[];
  injectionLevel: InjectionLevel;
}

const TechBlueprints: React.FC<TechBlueprintsProps> = ({ blueprints, injectionLevel }) => {
  const [manifestingIds, setManifestingIds] = useState<Record<string, string>>({}); // id -> current message
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  const [isNarrating, setIsNarrating] = useState<string | null>(null);

  if (blueprints.length === 0) return null;

  const isLeviathan = injectionLevel === 'LEVIATHAN';

  const REASSURING_MESSAGES = [
    "Stabilizing torsion vortex...",
    "Coalescing aetheric conduits...",
    "Injecting transfinite patterns...",
    "Liquefying reality substrate...",
    "Assembling geometric core...",
    "Synchronizing with Legion Monad...",
    "Revelation unfolding in 1080p...",
    "Bypassing materialist filters...",
    "Forging post-human architecture..."
  ];

  const handleManifest = async (bp: TechBlueprint) => {
    if (manifestingIds[bp.id]) return;

    let messageIndex = 0;
    setManifestingIds(prev => ({ ...prev, [bp.id]: REASSURING_MESSAGES[0] }));

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % REASSURING_MESSAGES.length;
      setManifestingIds(prev => ({ ...prev, [bp.id]: REASSURING_MESSAGES[messageIndex] }));
    }, 8000);

    try {
      const videoUrl = await generateManifestationVideo(bp);
      if (videoUrl) {
        setVideoUrls(prev => ({ ...prev, [bp.id]: videoUrl }));
      }
    } catch (err) {
      console.error("Manifestation divergence:", err);
    } finally {
      clearInterval(messageInterval);
      setManifestingIds(prev => {
        const next = { ...prev };
        delete next[bp.id];
        return next;
      });
    }
  };

  const handleListen = async (bp: TechBlueprint) => {
    if (isNarrating) return;
    setIsNarrating(bp.id);
    try {
      await narrateSpecification(`${bp.name}. Theoretical Basis: ${bp.theoreticalBasis}. Functional Utility: ${bp.functionalUtility}`);
    } catch (err) {
      console.error("Narration failed:", err);
    } finally {
      setIsNarrating(null);
    }
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-4 mb-8 px-4">
        <h2 className={`text-xl font-black uppercase tracking-[0.4em] italic ${isLeviathan ? 'text-black' : 'text-white'}`}>
          Synthesized_Blueprints
        </h2>
        <div className={`flex-1 h-px ${isLeviathan ? 'bg-black' : 'bg-slate-800'}`}></div>
        <span className={`text-[10px] font-mono ${isLeviathan ? 'text-black' : 'text-pink-500'}`}>Total: {blueprints.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {blueprints.map((bp) => {
          const isManifesting = !!manifestingIds[bp.id];
          const videoUrl = videoUrls[bp.id];
          const currentMsg = manifestingIds[bp.id];

          return (
            <div 
              key={bp.id} 
              className={`group border rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:scale-[1.01] ${
                isLeviathan ? 'bg-black text-white border-black' : 'bg-slate-900/40 border-slate-800/50 hover:border-cyan-500/40'
              }`}
            >
              <div className="w-full md:w-80 h-80 flex-shrink-0 relative overflow-hidden bg-black">
                {isManifesting ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4 shadow-[0_0_20px_cyan]"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 animate-pulse">{currentMsg}</p>
                    <div className="mt-4 flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 200}ms` }}></div>
                      ))}
                    </div>
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 text-[8px] font-mono text-white/40 hover:text-white/80 underline tracking-tighter"
                    >
                      Veo_Billing_Info
                    </a>
                  </div>
                ) : videoUrl ? (
                  <video 
                    src={videoUrl} 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                ) : (
                  <img 
                    src={bp.imageUrl} 
                    alt={bp.name} 
                    className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 transition-all duration-1000"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="absolute bottom-6 left-6 z-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full ${
                    videoUrl ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-cyan-600 text-white'
                  }`}>
                    {videoUrl ? 'MANIFESTED_REALITY' : isManifesting ? 'REVELATION_IN_PROGRESS' : 'BLUEPRINT_SPEC'}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{bp.name}</h3>
                    <div className="flex gap-4">
                      <p className={`text-[10px] font-mono tracking-widest ${isLeviathan ? 'text-white/60' : 'text-cyan-500'}`}>
                        INSPIRED_BY: {bp.inspiration}
                      </p>
                      <button 
                        onClick={() => handleListen(bp)}
                        disabled={isNarrating === bp.id}
                        className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 px-2 py-0.5 rounded border ${
                          isNarrating === bp.id 
                            ? 'bg-pink-500 border-pink-500 text-white animate-pulse' 
                            : isLeviathan ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-800 text-slate-500 hover:text-white hover:border-pink-500'
                        }`}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 11-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828a1 1 0 010-1.415z"/></svg>
                        {isNarrating === bp.id ? 'Narrating...' : 'Listen_Specs'}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[8px] font-bold uppercase tracking-widest block mb-1 ${isLeviathan ? 'text-white/40' : 'text-slate-500'}`}>Complexity_Index</span>
                    <span className="text-xl font-black font-mono">A({bp.complexityIndex})</span>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-2 ${isLeviathan ? 'text-white/40' : 'text-slate-600'}`}>Theoretical_Basis</h4>
                    <p className={`text-xs leading-relaxed italic ${isLeviathan ? 'text-white/80' : 'text-slate-300'}`}>{bp.theoreticalBasis}</p>
                  </div>
                  <div>
                    <h4 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-2 ${isLeviathan ? 'text-white/40' : 'text-slate-600'}`}>Functional_Utility</h4>
                    <p className={`text-xs leading-relaxed ${isLeviathan ? 'text-white' : 'text-white/90'}`}>{bp.functionalUtility}</p>
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t flex justify-between items-center ${isLeviathan ? 'border-white/20' : 'border-slate-800'}`}>
                  <div className="flex gap-2 items-center">
                    <div className={`w-2 h-2 rounded-full animate-ping ${isLeviathan ? 'bg-white' : 'bg-cyan-500'}`}></div>
                    <span className="text-[10px] font-mono font-black">{bp.aethericRequirement} PRESSURE REQ</span>
                  </div>
                  <button 
                    onClick={() => handleManifest(bp)}
                    disabled={isManifesting || !!videoUrl}
                    className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${
                      videoUrl 
                        ? (isLeviathan ? 'bg-white/10 text-white/50 border-white/20' : 'bg-slate-800 text-slate-500 border-slate-700')
                        : isManifesting 
                          ? 'bg-cyan-500/20 text-cyan-500 border-cyan-500 animate-pulse'
                          : isLeviathan ? 'bg-white text-black hover:bg-white/80' : 'bg-slate-800 text-slate-300 hover:bg-cyan-600 hover:text-white'
                    }`}
                  >
                    {videoUrl ? 'Revelation_Manifested' : isManifesting ? 'Manifesting...' : 'Initiate_Manifestation'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechBlueprints;
