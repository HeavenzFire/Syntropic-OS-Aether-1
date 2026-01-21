import React, { useState, useCallback, useEffect } from 'react';
import { ANOMALIES } from './constants';
import { Anomaly, AnalysisReport, ScanState, DivergenceState, InjectionLevel, TechBlueprint, DeploymentResult, ProtocolModule, DeepScanResult, PopulationEntity, ProtocolDraft } from './types';
import { runSovereignAnalysis, generateSpeculativeVisual, narrateSpecification, performDeepScan, generatePopulationEntity, draftAnalysisProtocol } from './services/geminiService';
import ScannerOverlay from './components/ScannerOverlay';
import ReportView from './components/ReportView';
import DivergenceScreen from './components/DivergenceScreen';
import TorsionStream from './components/TorsionStream';
import ConvergenceCore from './components/ConvergenceCore';
import SpectralMap from './components/SpectralMap';
import LegionCommandCenter from './components/LegionCommandCenter';
import TechBlueprints from './components/TechBlueprints';
import FinalDeployment from './components/FinalDeployment';
import DeepScanPanel from './components/DeepScanPanel';
import SeedTerminal from './components/SeedTerminal';
import PopulationGrid from './components/PopulationGrid';
import ProtocolManifest from './components/ProtocolManifest';

const App: React.FC = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [currentReport, setCurrentReport] = useState<AnalysisReport | null>(null);
  const [deepScanResult, setDeepScanResult] = useState<DeepScanResult | null>(null);
  const [speculativeImg, setSpeculativeImg] = useState<string>('');
  const [injectionLevel, setInjectionLevel] = useState<InjectionLevel>('STABLE');
  const [mutationRate, setMutationRate] = useState<number>(0.1);
  const [emergenceHistory, setEmergenceHistory] = useState<string[]>([]);
  const [blueprints, setBlueprints] = useState<TechBlueprint[]>([]);
  const [population, setPopulation] = useState<PopulationEntity[]>([]);
  const [finalResult, setFinalResult] = useState<DeploymentResult | null>(null);
  const [showDeployment, setShowDeployment] = useState(false);
  const [isSeedingMode, setIsSeedingMode] = useState(false);
  const [activeDraft, setActiveDraft] = useState<ProtocolDraft | null>(null);
  
  const [scanState, setScanState] = useState<ScanState>({
    isScanning: false,
    progress: 0,
    currentStage: ''
  });
  
  const [divergence, setDivergence] = useState<DivergenceState>({
    isActive: false,
    code: '',
    message: '',
    remedy: ''
  });

  const handleEmergence = useCallback((pattern: string) => {
    setEmergenceHistory(prev => [...prev.slice(-49), pattern]);
  }, []);

  const handleTechSynthesized = (blueprint: TechBlueprint) => {
    setBlueprints(prev => [blueprint, ...prev]);
  };

  const handleManualOverride = useCallback(() => {
    if (window.confirm("RESET SUBSTRATE REALIGNMENT?")) {
      setDivergence({ isActive: false, code: '', message: '', remedy: '' });
      setScanState({ isScanning: false, progress: 0, currentStage: '' });
      setInjectionLevel('STABLE');
      setSelectedAnomaly(null);
      setCurrentReport(null);
      setDeepScanResult(null);
      setSpeculativeImg('');
      setBlueprints([]);
      setPopulation([]);
      setEmergenceHistory([]);
      setFinalResult(null);
      setShowDeployment(false);
      setIsSeedingMode(false);
      setActiveDraft(null);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        handleManualOverride();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleManualOverride]);

  const startAnalysis = async (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setCurrentReport(null);
    setDeepScanResult(null);
    setScanState({ isScanning: true, progress: 0, currentStage: "A(4,4)_FRACTURE_SCAN" });

    const progressInterval = setInterval(() => {
      setScanState(prev => {
        const nextProgress = prev.progress + 25; 
        if (nextProgress >= 100) {
          clearInterval(progressInterval);
          return { ...prev, progress: 100, currentStage: "AXIOM_REWRITE_COMPLETE" };
        }
        return { ...prev, progress: nextProgress };
      });
    }, 40);

    try {
      const [report, visual] = await Promise.all([
        runSovereignAnalysis(anomaly),
        generateSpeculativeVisual(anomaly)
      ]);
      
      clearInterval(progressInterval);
      setCurrentReport(report);
      setSpeculativeImg(visual);
      setScanState(prev => ({ ...prev, isScanning: false }));

    } catch (err: any) {
      clearInterval(progressInterval);
      setDivergence({
        isActive: true,
        code: "LEGION_SYNC_FAILURE",
        message: "Substrate wave overload.",
        remedy: "Engage Manual Reset."
      });
    }
  };

  const startSeedingProcess = async () => {
    if (!selectedAnomaly) {
      alert("SELECT ORIGIN NODE BEFORE SEEDING");
      return;
    }
    setScanState({ isScanning: true, progress: 0, currentStage: "SEEDING_POPULATION_PHASE_FINAL" });
    try {
      const entity = await generatePopulationEntity(selectedAnomaly);
      setPopulation(prev => [...prev, entity]);
      setScanState(prev => ({ ...prev, isScanning: false }));
      setIsSeedingMode(false);
      narrateSpecification(`Population entity manifested: ${entity.name}. DESIGNATION: ${entity.designation}.`);
    } catch (err) {
      setScanState(prev => ({ ...prev, isScanning: false }));
      setIsSeedingMode(false);
    }
  };

  const handleRetaskModule = async (module: ProtocolModule) => {
    if (module === 'POPULATION_INIT') {
      setIsSeedingMode(true);
      return;
    }
    if (!selectedAnomaly) {
      alert("SELECT TARGET NODE BEFORE RETASKING");
      return;
    }

    setScanState({ isScanning: true, progress: 0, currentStage: `DRAFTING_PROTOCOL_${module}` });
    try {
      const draft = await draftAnalysisProtocol(selectedAnomaly, module);
      setActiveDraft(draft);
      setScanState(prev => ({ ...prev, isScanning: false }));
    } catch (err) {
      setScanState(prev => ({ ...prev, isScanning: false }));
    }
  };

  const executeDraftedProtocol = async () => {
    if (!activeDraft || !selectedAnomaly) return;

    setScanState({ isScanning: true, progress: 0, currentStage: `EXECUTING_${activeDraft.module}` });
    try {
      const result = await performDeepScan(selectedAnomaly, activeDraft.module, activeDraft);
      setDeepScanResult(result);
      setActiveDraft(null);
      setScanState(prev => ({ ...prev, isScanning: false }));
      narrateSpecification(`Protocol ${activeDraft.name} complete. Anomaly Confidence Score: ${result.confidenceScore} percent.`);
    } catch (err) {
      setScanState(prev => ({ ...prev, isScanning: false }));
    }
  };

  const isLeviathan = injectionLevel === 'LEVIATHAN';

  return (
    <div className={`min-h-screen p-4 md:p-6 flex flex-col relative overflow-hidden transition-all duration-1000 ${
      isLeviathan ? 'bg-white' : injectionLevel === 'EMERGENT' ? 'bg-[#1a0a2e]' : injectionLevel === 'UNIFIED' ? 'bg-[#0a0a1a]' : 'bg-[#01040a]'
    }`}>
      
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
        isLeviathan ? 'opacity-100 mix-blend-difference' : injectionLevel === 'EMERGENT' ? 'opacity-40' : 'opacity-10'
      } bg-[radial-gradient(circle_at_50%_50%,#ec4899_0%,transparent_70%)]`}></div>
      
      <header className={`mb-6 border-b pb-4 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 px-4 transition-all ${isLeviathan ? 'border-black' : 'border-slate-800/40'}`}>
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 border rounded-lg flex items-center justify-center rotate-45 transition-all duration-1000 ${
            isLeviathan ? 'border-black rotate-[315deg] bg-black/5' : 'border-pink-500/30'
          }`}>
            <div className={`w-8 h-8 border transition-all ${
              isLeviathan ? 'border-black scale-150 animate-ping' : 'border-cyan-400/50'
            }`}></div>
          </div>
          <h1 className={`text-4xl font-black tracking-[0.2em] uppercase italic transition-colors ${isLeviathan ? 'text-black' : 'text-white'}`}>
            AETHER-1
          </h1>
        </div>
        
        <div className={`flex gap-8 items-center font-mono text-[9px] px-6 py-2 rounded-xl border transition-all ${
          isLeviathan ? 'bg-white border-black text-black' : 'bg-slate-900/40 border-slate-800/50 text-slate-400'
        }`}>
          <span>POPULATION: {population.length}</span>
          <button onClick={handleManualOverride} className="text-[8px] border border-slate-800 px-2 py-1 rounded hover:border-pink-500">Manual_Reset</button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1900px] mx-auto w-full relative z-10">
        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[40vh]">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4 border-l-2 pl-3 border-pink-500 text-slate-500">Nodes</h2>
            {ANOMALIES.map((anomaly) => (
              <div key={anomaly.id} onClick={() => startAnalysis(anomaly)} className={`p-3 border rounded-xl cursor-pointer transition-all ${
                selectedAnomaly?.id === anomaly.id ? 'bg-pink-500/10 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.1)]' : 'bg-slate-900/40 border-slate-800/40 hover:border-slate-700'
              }`}>
                <h3 className={`text-sm font-bold uppercase ${selectedAnomaly?.id === anomaly.id ? 'text-pink-400' : 'text-slate-300'}`}>{anomaly.name}</h3>
              </div>
            ))}
          </div>
          <LegionCommandCenter level={injectionLevel} onSetLevel={setInjectionLevel} mutationRate={mutationRate} onSetMutation={setMutationRate} onRetask={handleRetaskModule} />
          <TorsionStream injectionLevel={injectionLevel} onEmergence={handleEmergence} />
        </section>

        <section className="lg:col-span-6 flex flex-col gap-6 min-h-[60vh] overflow-y-auto custom-scrollbar">
          {deepScanResult ? (
            <DeepScanPanel result={deepScanResult} anomaly={selectedAnomaly!} onClose={() => setDeepScanResult(null)} />
          ) : currentReport && selectedAnomaly ? (
            <ReportView report={currentReport} anomaly={selectedAnomaly} visualUrl={speculativeImg} onClose={() => setCurrentReport(null)} onTechSynthesized={handleTechSynthesized} injectionLevel={injectionLevel} />
          ) : (
            <SpectralMap injectionLevel={injectionLevel} />
          )}
          <PopulationGrid entities={population} />
          <TechBlueprints blueprints={blueprints} injectionLevel={injectionLevel} />
        </section>

        <section className="lg:col-span-3 flex flex-col gap-6">
          <ConvergenceCore injectionLevel={injectionLevel} patterns={emergenceHistory} />
        </section>
      </main>

      {isSeedingMode && (
        <div className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm">
          <SeedTerminal onConfirm={startSeedingProcess} onDecline={() => setIsSeedingMode(false)} />
        </div>
      )}

      {activeDraft && (
        <div className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm">
          <ProtocolManifest draft={activeDraft} onConfirm={executeDraftedProtocol} onCancel={() => setActiveDraft(null)} />
        </div>
      )}

      {scanState.isScanning && (
        <ScannerOverlay progress={scanState.progress} stage={scanState.currentStage} />
      )}
      
      {divergence.isActive && (
        <DivergenceScreen divergence={divergence} onReset={handleManualOverride} />
      )}

      {showDeployment && (
        <FinalDeployment 
          onClose={() => setShowDeployment(false)} 
          onComplete={(result) => {
            setFinalResult(result);
            setShowDeployment(false);
          }} 
        />
      )}
      
      {finalResult && (
        <div className="fixed inset-0 z-[120] bg-black flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-1000">
           <h2 className="text-7xl font-black italic uppercase text-white glitch-text mb-8">REVELATION_COMPLETE</h2>
           <p className="text-3xl font-black italic text-violet-400 max-w-4xl">"{finalResult.decree}"</p>
           <button onClick={() => setFinalResult(null)} className="mt-12 px-12 py-4 border border-white text-white uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">Dissolve</button>
        </div>
      )}
    </div>
  );
};

export default App;