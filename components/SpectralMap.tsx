
import React, { useEffect, useRef } from 'react';
import { SyntropicOptimizer } from '../SovereignLogic';
import { InjectionLevel } from '../types';

interface SpectralMapProps {
  injectionLevel?: InjectionLevel;
}

const SpectralMap: React.FC<SpectralMapProps> = ({ injectionLevel = 'STABLE' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optimizer = SyntropicOptimizer.getInstance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const render = () => {
      time += 1;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const intensity = optimizer.getTransfiniteIntensity(injectionLevel);
      const isLeviathan = injectionLevel === 'LEVIATHAN';
      
      // Draw Grid
      ctx.strokeStyle = isLeviathan ? 'rgba(0, 0, 0, 0.4)' : injectionLevel === 'UNIFIED' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(34, 211, 238, 0.05)';
      ctx.lineWidth = isLeviathan ? 3 : 1;
      const step = isLeviathan ? 10 : 25 / (Math.min(intensity, 100) * 0.5);
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Simulation Fractures
      if (injectionLevel !== 'STABLE') {
        ctx.strokeStyle = isLeviathan ? '#000' : 'rgba(236, 72, 153, 0.3)';
        ctx.lineWidth = isLeviathan ? 4 : 0.5;
        const fractureCount = isLeviathan ? 100 : 5;
        for (let i = 0; i < fractureCount; i++) {
          const offset = Math.sin(time * 0.1 + i) * 30 * (isLeviathan ? 20 : intensity);
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2 + offset);
          ctx.lineTo(canvas.width, canvas.height / 2 - offset);
          ctx.stroke();
        }
      }

      // Draw Fracture Points (Simulated Data)
      const points = isLeviathan ? 128 : 16;
      for (let i = 0; i < points; i++) {
        const x = (Math.sin(i * 1.5 + time * (isLeviathan ? 0.2 : 0.01)) * 0.45 + 0.5) * canvas.width;
        const y = (Math.cos(i * 0.8 + time * (isLeviathan ? 0.3 : 0.012)) * 0.45 + 0.5) * canvas.height;
        const pulse = optimizer.getAethericPulse(time + i * 100, isLeviathan ? 100 : intensity);

        // Radial Glow
        const gradSize = isLeviathan ? 200 : 60;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, gradSize * pulse * (isLeviathan ? 5 : Math.min(intensity, 100) * 0.5));
        const color = isLeviathan ? '0, 0, 0' : injectionLevel === 'UNIFIED' ? '255, 255, 255' : '236, 72, 153';
        grad.addColorStop(0, `rgba(${color}, ${isLeviathan ? 0.9 : 0.3})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, gradSize * pulse * (isLeviathan ? 5 : Math.min(intensity, 100) * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Vector Core
        ctx.fillStyle = isLeviathan ? '#000' : injectionLevel === 'UNIFIED' ? '#fff' : pulse > 0.8 ? '#fff' : '#ec4899';
        ctx.beginPath();
        ctx.arc(x, y, (isLeviathan ? 8 : 1.5) * (Math.min(intensity, 10) ), 0, Math.PI * 2);
        ctx.fill();

        // Revelation Overlay
        if ((isLeviathan || injectionLevel === 'UNIFIED') && pulse > 0.4) {
          ctx.strokeStyle = isLeviathan ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = isLeviathan ? 2 : 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.stroke();
        }
      }

      if (isLeviathan) {
        // Full screen glitch noise + color inversion flickers
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [injectionLevel]);

  return (
    <div className={`relative w-full h-full rounded-2xl border overflow-hidden group transition-colors duration-1000 ${
      injectionLevel === 'LEVIATHAN' ? 'bg-white border-black shadow-[0_0_100px_rgba(0,0,0,0.5)]' : 'bg-slate-950/40 border-slate-800/40'
    }`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-5 left-6 flex flex-col gap-1 z-10">
        <span className={`text-sm font-black uppercase tracking-[0.6em] transition-colors duration-1000 ${
          injectionLevel === 'LEVIATHAN' ? 'text-black drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]' : injectionLevel === 'UNIFIED' ? 'text-white' : 'text-pink-500'
        }`}>
          {injectionLevel === 'LEVIATHAN' ? 'SINGULARITY_REVELATION_CORE' : injectionLevel === 'UNIFIED' ? 'UNIFIED_MONAD_STATE' : 'Aetheric_Fracture_Map'}
        </span>
        <span className={`text-[9px] font-mono font-black transition-colors ${injectionLevel === 'LEVIATHAN' ? 'text-black' : 'text-slate-600'}`}>
          SUBSTRATE_TENSION: {injectionLevel === 'LEVIATHAN' ? 'ZERO_POINT_REACHED' : injectionLevel === 'UNIFIED' ? '0.0000' : 'CRITICAL'}
        </span>
      </div>
      
      {(injectionLevel === 'UNIFIED' || injectionLevel === 'LEVIATHAN') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`font-black italic select-none transition-all duration-1000 ${
            injectionLevel === 'LEVIATHAN' ? 'text-[20rem] text-black/20 blur-[1px] animate-pulse' : 'text-[12rem] text-white/5'
          }`}>
            {injectionLevel === 'LEVIATHAN' ? 'NULL' : 'MONAD'}
          </div>
        </div>
      )}
      
      <div className={`absolute bottom-5 right-6 px-4 py-2 border rounded-xl flex items-center gap-4 z-10 transition-colors ${
        injectionLevel === 'LEVIATHAN' ? 'bg-black text-white border-black shadow-[0_0_30px_rgba(0,0,0,1)]' : 'bg-slate-900/90 text-slate-300 border-slate-800'
      }`}>
        <div className={`w-3 h-3 rounded-full ${
          injectionLevel === 'LEVIATHAN' ? 'bg-white shadow-[0_0_20px_white] animate-ping' : 
          injectionLevel === 'UNIFIED' ? 'bg-white shadow-[0_0_15px_white]' : 'bg-pink-500 animate-pulse shadow-[0_0_10px_pink]'
        }`}></div>
        <span className="text-[10px] font-mono uppercase tracking-widest font-black">
          {injectionLevel === 'LEVIATHAN' ? 'PRESSURE_MAX_SINGULARITY' : injectionLevel === 'UNIFIED' ? 'REVELATION_LOCKED' : 'AXIOM_REWRITE_PENDING'}
        </span>
      </div>
    </div>
  );
};

export default SpectralMap;
