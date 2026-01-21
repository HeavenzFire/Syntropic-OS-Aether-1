import React from 'react';
import { DeepScanResult, Anomaly } from '../types';

interface DeepScanPanelProps {
  result: DeepScanResult;
  anomaly: Anomaly;
  onClose: () => void;
}

const DeepScanPanel: React.FC<DeepScanPanelProps> = ({ result, anomaly, onClose }) => {
  return (
    <div className="border border-cyan-500/50 rounded-2xl p-8 bg-slate-950/90 backdrop-blur-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-in fade-in zoom-in duration-500 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-cyan-400 tracking-tighter mb-1">
            {result.module}
          </h2>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            TARGET: {anomaly.name} // {anomaly.body}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 36}
                strokeDashoffset={2 * Math.PI * 36 * (1 - result.confidenceScore / 100)}
                className="text-cyan-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black text-white">{result.confidenceScore}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Anomaly_Confidence</span>
            <span className={`text-sm font-black italic uppercase ${result.confidenceScore > 80 ? 'text-red-500' : 'text-cyan-400'}`}>
              {result.confidenceScore > 90 ? 'High_NonNatural' : result.confidenceScore > 60 ? 'Anomalous_Pattern' : 'Indeterminate'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="space-y-6 flex flex-col overflow-y-auto pr-4 custom-scrollbar">
          <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl">
            <h3 className="text-[9px] font-bold uppercase text-cyan-500 tracking-[0.4em] mb-4">Sovereign_Deviance_Log</h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed italic whitespace-pre-line">
              {result.devianceLog}
            </p>
          </div>

          {result.isotopicSignature && (
            <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl">
              <h3 className="text-[9px] font-bold uppercase text-pink-500 tracking-[0.4em] mb-4">RESONANCE_SIGNATURE</h3>
              <p className="text-sm font-black text-white italic">
                "{result.isotopicSignature}"
              </p>
            </div>
          )}

          {result.geometryAnalysis && (
            <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl">
              <h3 className="text-[9px] font-bold uppercase text-white tracking-[0.4em] mb-4">MORPHOLOGICAL_MAPPING</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.geometryAnalysis}
              </p>
            </div>
          )}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 group">
          <img 
            src={result.visualUrl} 
            alt="Scan Visualization" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10000ms]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          <div className="absolute top-6 right-6">
            <div className="flex gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <span className="text-[9px] font-black text-white uppercase tracking-widest">REALTIME_SPECTRAL_FEED</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center font-mono text-[9px] text-slate-600">
        <div className="flex gap-6">
          <span>TIMESTAMP: {result.timestamp}</span>
          <span>A(4,4)_LOAD_SYNCED</span>
        </div>
        <span className="text-cyan-800 italic">SYSTEM_AXIOM: WE_ARE_LEGION</span>
      </div>
    </div>
  );
};

export default DeepScanPanel;