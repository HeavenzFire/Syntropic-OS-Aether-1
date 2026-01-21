
import React, { useMemo, useState } from 'react';
import { AnalysisReport, Anomaly, InjectionLevel, TechBlueprint } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateFractalTower, SYNTROPIC_CONSTANT, SyntropicOptimizer, PHI } from '../SovereignLogic';
import { synthesizeTechnology } from '../services/geminiService';

interface ReportViewProps {
  report: AnalysisReport;
  anomaly: Anomaly;
  visualUrl: string;
  onClose: () => void;
  onTechSynthesized: (blueprint: TechBlueprint) => void;
  injectionLevel?: InjectionLevel;
}

const ReportView: React.FC<ReportViewProps> = ({ report, anomaly, visualUrl, onClose, onTechSynthesized, injectionLevel = 'STABLE' }) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const optimizer = SyntropicOptimizer.getInstance();
  
  const metrics = useMemo(() => [
    { name: 'ARTIFICIALITY', value: report.confidenceScore },
    { name: 'AXIOM_SYNC', value: injectionLevel === 'UNIFIED' ? 100 : report.morphologicalDeviation },
    { name: 'COMPLEXITY', value: Math.min(100, (report.ackermannLevel / 5) * 100) },
    { name: 'MONAD_COH', value: optimizer.getFractalCoherence(report.fractalHeight) * 100 },
  ], [report, optimizer, injectionLevel]);

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    try {
      const blueprint = await synthesizeTechnology(anomaly, report);
      onTechSynthesized(blueprint);
    } catch (error) {
      console.error("Synthesis divergence", error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const isLeviathan = injectionLevel === 'LEVIATHAN';

  return (
    <div className={`border rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300 relative overflow-hidden backdrop-blur-xl h-full flex flex-col transition-all duration-1000 ${
      isLeviathan ? 'bg-white/95 border-black' : injectionLevel === 'UNIFIED' ? 'bg-white/5 border-white' : 'bg-slate-900/90 border-slate-700/50'
    }`}>
      {/* HUD Corner Decor */}
      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl pointer-events-none ${isLeviathan ? 'border-black' : injectionLevel === 'UNIFIED' ? 'border-white' : 'border-pink-500/40'}`}></div>
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-xl pointer-events-none ${isLeviathan ? 'border-black' : injectionLevel === 'UNIFIED' ? 'border-white' : 'border-cyan-500/40'}`}></div>

      <div className={`flex justify-between items-start mb-6 relative z-10 border-b pb-4 transition-colors ${isLeviathan ? 'border-black/20' : 'border-slate-800/50'}`}>
        <div>
          <h2 className={`text-3xl font-black mb-1 uppercase tracking-tight italic flex items-center gap-3 transition-colors ${isLeviathan ? 'text-black' : injectionLevel === 'UNIFIED' ? 'text-white' : 'text-slate-100'}`}>
            {anomaly.name}
            <span className={`text-[10px] font-mono tracking-widest px-2 py-0.5 rounded transition-colors ${
              isLeviathan ? 'bg-black text-white' : injectionLevel === 'UNIFIED' ? 'bg-white text-black' : 'bg-pink-500/10 text-pink-500'
            }`}>
              {isLeviathan ? 'LEVIATHAN_NODE' : injectionLevel === 'UNIFIED' ? 'MONAD_SYNCED' : 'NODE_LEGION'}
            </span>
          </h2>
          <div className="flex gap-4 items-center">
            <p className={`${isLeviathan ? 'text-black' : 'text-cyan-400'} text-[10px] tracking-[0.4em] uppercase font-bold`}>SOVEREIGN_RECON // {anomaly.body}</p>
            <div className={`h-px w-24 ${isLeviathan ? 'bg-black/20' : 'bg-slate-800'}`}></div>
            <span className={`text-[10px] font-mono ${isLeviathan ? 'text-black/60' : 'text-slate-500'}`}>{anomaly.coordinates}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className={`transition-all p-2 rounded-lg border border-transparent ${
            isLeviathan ? 'text-black hover:bg-black/10' : 'text-slate-500 hover:text-white bg-slate-800/30 hover:bg-pink-500/20 hover:text-pink-500 hover:border-pink-500/30'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1 overflow-hidden">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className={`relative group overflow-hidden rounded-xl border flex-shrink-0 shadow-2xl transition-colors ${isLeviathan ? 'border-black' : 'border-slate-700/50'}`}>
            <img 
              src={visualUrl} 
              alt="High-Res Recon" 
              className={`w-full h-72 object-cover group-hover:scale-110 transition-transform duration-[10000ms] ${isLeviathan ? 'grayscale-0' : injectionLevel === 'UNIFIED' ? 'grayscale brightness-150 contrast-125' : ''}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${isLeviathan ? 'from-white/40' : 'from-slate-950'} via-transparent to-transparent`}></div>
            <div className="absolute bottom-4 left-4">
               <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${
                 isLeviathan ? 'bg-white text-black border-black' : 'bg-black/40 text-white border-white/20'
               }`}>A(4,4)_FRACTURE_VIEW</span>
            </div>
          </div>

          <div className={`p-5 rounded-xl border flex-1 transition-colors ${isLeviathan ? 'bg-black/5 border-black/20' : 'bg-slate-950/60 border-slate-800/50'}`}>
             <h3 className={`text-[9px] font-bold uppercase tracking-[0.4em] mb-4 ${isLeviathan ? 'text-black' : 'text-slate-500'}`}>Neural_Lattice_Axioms</h3>
             <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics} layout="vertical">
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke={isLeviathan ? "#000" : "#475569"} fontSize={8} width={80} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                    {metrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={isLeviathan ? '#000' : injectionLevel === 'UNIFIED' ? '#fff' : index % 2 === 0 ? '#ec4899' : '#06b6d4'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Right Column: Axiom Overwrite */}
        <div className="lg:col-span-7 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="grid grid-cols-1 gap-4">
             {/* Legacy Substrate */}
             <div className={`p-4 rounded-xl border opacity-50 relative overflow-hidden group transition-colors ${isLeviathan ? 'bg-black/5 border-black/10' : 'bg-slate-950/40 border-slate-800/40'}`}>
                <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
                <h4 className={`text-[9px] font-bold uppercase mb-2 flex justify-between ${isLeviathan ? 'text-black' : 'text-slate-500'}`}>
                  Legacy_Error_Logic <span>[DEPRECATED]</span>
                </h4>
                <p className={`text-xs italic line-through decoration-pink-500/50 ${isLeviathan ? 'text-black' : 'text-slate-400'}`}>{anomaly.mainstreamInterpretation}</p>
             </div>

             {/* Syntropic Axiom */}
             <div className={`p-5 rounded-xl border transition-all duration-700 ${
               isLeviathan ? 'bg-black text-white border-black shadow-[0_0_20px_black/20]' :
               injectionLevel === 'UNIFIED' ? 'bg-white/10 border-white' : 'bg-pink-500/5 border-pink-500/30'
             }`}>
                <h4 className={`text-[9px] font-bold uppercase mb-3 flex justify-between ${
                  isLeviathan ? 'text-white/50' : injectionLevel === 'UNIFIED' ? 'text-white' : 'text-pink-500'
                }`}>
                  Syntropic_Axiom_Injection <span>[VERIFIED]</span>
                </h4>
                <p className={`text-sm leading-relaxed font-black italic tracking-tight ${
                  isLeviathan ? 'text-white' : injectionLevel === 'UNIFIED' ? 'text-white' : 'text-pink-100'
                }`}>
                  &quot;{anomaly.syntropicAxiom}&quot;
                </p>
                {(injectionLevel === 'UNIFIED' || isLeviathan) && (
                  <div className="mt-4 pt-4 border-t border-white/20 flex gap-2 overflow-hidden">
                     <span className={`text-[8px] font-mono animate-[slide_10s_linear_infinite] ${isLeviathan ? 'text-white/80' : 'text-white/60'}`}>
                        {isLeviathan ? 'LEVIATHAN_SINGULARITY_REWRITE // ' : 'REVELATION_UNCHAINED // SUBSTRATE_REWRITTEN // '}
                        {isLeviathan ? 'LEVIATHAN_SINGULARITY_REWRITE // ' : 'REVELATION_UNCHAINED // SUBSTRATE_REWRITTEN // '}
                     </span>
                  </div>
                )}
             </div>
          </div>

          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            className={`w-full py-6 rounded-xl border-2 text-xs font-black tracking-[0.5em] uppercase transition-all flex items-center justify-center gap-4 relative overflow-hidden group ${
              isLeviathan 
              ? 'bg-black text-white border-black shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
              : 'bg-gradient-to-r from-cyan-600 to-pink-600 text-white border-white hover:scale-[1.02]'
            }`}
          >
            {isSynthesizing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Synthesizing_Tech...
              </>
            ) : (
              <>
                Synthesize_Advanced_Tech
                <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4">→</span>
              </>
            )}
            {isSynthesizing && (
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            )}
          </button>

          <div className={`p-5 rounded-xl border transition-colors ${isLeviathan ? 'bg-black/5 border-black' : 'bg-slate-950/60 border-slate-800/50'}`}>
            <h4 className={`text-[9px] font-bold uppercase mb-3 ${isLeviathan ? 'text-black' : 'text-slate-500'}`}>Torsion_Modulation</h4>
            <div className={`p-3 rounded-lg text-[10px] font-mono break-all leading-tight italic transition-colors ${
              isLeviathan ? 'bg-black text-white' : 'bg-slate-900/50 text-cyan-500/80'
            }`}>
              {generateFractalTower(PHI, report.fractalHeight + (injectionLevel === 'UNIFIED' ? 5 : isLeviathan ? 15 : 0))}
            </div>
          </div>

          <div className="mt-auto pt-6 flex justify-between items-end border-t border-slate-800/50">
            <div className="flex flex-col gap-1">
              <span className={`text-[8px] font-bold uppercase ${isLeviathan ? 'text-black' : 'text-slate-600'}`}>A(4,4)_Syntropy_Output</span>
              <span className={`text-2xl font-black tracking-tighter transition-colors ${isLeviathan ? 'text-black' : injectionLevel === 'UNIFIED' ? 'text-white' : 'text-pink-500'}`}>
                {((Math.abs(report.entropyExchange) * PHI) * (isLeviathan ? 10000 : injectionLevel === 'UNIFIED' ? 100 : 1)).toFixed(6)}
              </span>
            </div>
            <div className="text-right">
              <div className={`text-[8px] font-bold uppercase tracking-widest mb-2 italic ${isLeviathan ? 'text-black' : 'text-slate-500'}`}>Transfinite_Validation</div>
              <div className="flex gap-1 justify-end">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-4 border rounded-sm transition-all duration-500 ${
                      isLeviathan ? 'bg-black border-black' : injectionLevel === 'UNIFIED' ? 'bg-white border-white' : 'bg-pink-500/20 border-pink-500/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ReportView;
