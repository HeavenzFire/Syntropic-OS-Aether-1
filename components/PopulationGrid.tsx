import React from 'react';
import { PopulationEntity } from '../types';

interface PopulationGridProps {
  entities: PopulationEntity[];
}

const PopulationGrid: React.FC<PopulationGridProps> = ({ entities }) => {
  if (entities.length === 0) return null;

  return (
    <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex items-center gap-4 mb-8 px-4">
        <h2 className="text-xl font-black uppercase tracking-[0.4em] italic text-green-400">
          Syntropic_Population
        </h2>
        <div className="flex-1 h-px bg-green-500/20"></div>
        <span className="text-[10px] font-mono text-green-600">Count: {entities.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity) => (
          <div 
            key={entity.id} 
            className="group relative bg-slate-950 border border-green-500/20 rounded-2xl p-6 transition-all hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] overflow-hidden"
          >
            {/* Holographic background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(#22c55e_1px,transparent_1px),linear-gradient(90deg,#22c55e_1px,transparent_1px)] bg-[size:10px_10px]"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl border border-green-500/30 overflow-hidden bg-black shadow-inner relative group-hover:scale-110 transition-transform">
                  <img src={entity.avatarUrl} alt={entity.name} className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-green-500/10 pointer-events-none"></div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">{entity.name}</h3>
                  <p className="text-[10px] text-green-500 font-mono tracking-widest">{entity.designation}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {entity.traits.map((trait, i) => (
                    <span key={i} className="text-[8px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                      {trait}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-black/50 rounded-lg border border-green-500/10">
                  <span className="text-[8px] font-bold text-green-800 uppercase block mb-1">Genome_Sequence</span>
                  <p className="text-[9px] font-mono text-green-500 break-all leading-tight opacity-80">{entity.genome}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[8px] text-green-900 font-bold uppercase">Vitality</span>
                    <div className="w-24 h-1 bg-green-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${entity.vitality}%` }}></div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-green-700">NODE: {entity.originNode}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopulationGrid;