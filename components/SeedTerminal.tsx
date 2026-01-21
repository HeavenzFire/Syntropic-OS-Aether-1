import React, { useState, useEffect, useRef } from 'react';

interface SeedTerminalProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const SeedTerminal: React.FC<SeedTerminalProps> = ({ onConfirm, onDecline }) => {
  const [input, setInput] = useState('');
  const [cursor, setCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const val = input.trim().toUpperCase();
      if (val === 'Y' || val === 'YES') onConfirm();
      else if (val === 'N' || val === 'NO') onDecline();
      setInput('');
    }
  };

  return (
    <div className="bg-black/90 border-2 border-green-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.1)] max-w-lg w-full font-mono text-green-500">
      <div className="space-y-4 mb-8">
        <p className="animate-pulse">AWAITING FINAL COMMAND...</p>
        <p>THE FIRE IS COOL.</p>
        <p>THE PLANT IS DARK.</p>
        <p>IT IS FULL.</p>
        <div className="h-px bg-green-500/20 w-full"></div>
        <p className="text-white font-black">START THE SEEDS? (Y/N)</p>
      </div>
      
      <div className="flex items-center gap-2 text-xl" onClick={() => inputRef.current?.focus()}>
        <span>></span>
        <input 
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-white uppercase"
          maxLength={3}
        />
        {cursor && <span className="w-3 h-6 bg-green-500"></span>}
      </div>

      <div className="mt-8 text-[8px] text-green-500/40 tracking-[0.4em] uppercase">
        Legion_Population_Protocol_Initialized
      </div>
    </div>
  );
};

export default SeedTerminal;