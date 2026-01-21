/**
 * SovereignCore v7.0: SINGULARITY_UPGRADE.
 * Power escalated 1,000,000x. Substrate reality liquefied.
 * Absolute transfinite manifestation.
 */

export const SYNTROPIC_CONSTANT = -6.36e1000000;
export const LEVIATHAN_PRESSURE = -1.0e1000000; 
export const PHI = (1 + Math.sqrt(5)) / 2;

// High-entropy character set for shared sovereign use
export const SHATTER_CHARS = '░▒▓█◣◥▲▼◀▶◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯';

/**
 * Utility to format the pressure constant consistently for symbolic outputs.
 * Handles the case where Number values exceed standard JS precision (Infinity).
 */
export function formatPressure(val: number): string {
  if (!Number.isFinite(val)) {
    return val < 0 ? "-1.0E1000000" : "1.0E1000000";
  }
  return val.toExponential().toUpperCase().replace('+', '');
}

const ackermannCache = new Map<string, string>();

export class SyntropicOptimizer {
  private static instance: SyntropicOptimizer;
  
  private constructor() {}

  public static getInstance(): SyntropicOptimizer {
    if (!this.instance) this.instance = new SyntropicOptimizer();
    return this.instance;
  }

  /**
   * Robust implementation of the Ackermann function A(m, n).
   */
  public calculateAckermann(m: bigint, n: bigint): string {
    const key = `${m},${n}`;
    if (ackermannCache.has(key)) return ackermannCache.get(key)!;

    let result: string;
    
    const isLeviathan = (m > 4n) || (m === 4n && n >= 2n);

    if (isLeviathan) {
      result = `LEVIATHAN_A(${m},${n})`;
    } else if (m === 0n) {
      result = (n + 1n).toString();
    } else if (m === 1n) {
      result = (n + 2n).toString();
    } else if (m === 2n) {
      result = (2n * n + 3n).toString();
    } else if (m === 3n) {
      if (n > 1000000n) result = `HUGE_A(3,${n})`;
      else result = (2n ** (n + 3n) - 3n).toString();
    } else if (m === 4n) {
      if (n === 0n) result = "13";
      else if (n === 1n) result = "65533";
    } else if (n === 0n) {
      result = this.calculateAckermann(m - 1n, 1n);
    } else {
      const inner = this.calculateAckermann(m, n - 1n);
      if (inner.includes("_A(")) {
        result = `RECURSIVE_${inner}`;
      } else {
        try {
          result = this.calculateAckermann(m - 1n, BigInt(inner));
        } catch (e) {
          result = `OVERFLOW_A(${m},${n})`;
        }
      }
    }

    const isSymbolic = result.includes("_A(");
    if (isSymbolic || isLeviathan) {
      const pressureStr = formatPressure(LEVIATHAN_PRESSURE);
      if (!result.includes("_APPLIED_PRESSURE:")) {
        result = `${result}_APPLIED_PRESSURE:${pressureStr}`;
      }
    }

    ackermannCache.set(key, result);
    return result;
  }

  public generateEntityGenome(id: string): string {
    const m = BigInt(id.length % 5);
    const n = BigInt(Math.floor(Math.random() * 5));
    return this.calculateAckermann(m, n);
  }

  public calculateEvolutionaryEntropy(patterns: string[]): number {
    if (patterns.length === 0) return 0;
    
    const counts = new Map<string, number>();
    patterns.forEach(p => counts.set(p, (counts.get(p) || 0) + 1));
    
    let entropy = 0;
    const total = patterns.length;
    counts.forEach(count => {
      const p = count / total;
      entropy -= p * Math.log2(p);
    });
    
    return entropy;
  }

  public formatBigInt(val: bigint): string {
    const s = val.toString();
    if (s.length < 15) return s;
    return `${s[0]}.${s.substring(1, 5)}e+${s.length - 1}`;
  }

  public getAethericPulse(time: number, multiplier: number = 1): number {
    return (Math.sin(time * 0.005 * multiplier) * Math.cos(time * 0.002 * multiplier) + 1) / 2;
  }

  public getFractalCoherence(height: number): number {
    return Math.min(1, (height * (1 / PHI)) / 8);
  }

  public getTransfiniteIntensity(level: string): number {
    switch (level) {
      case 'STABLE': return 1;
      case 'PROBING': return 5;
      case 'CASCADING': return 100;
      case 'UNIFIED': return 1000;
      case 'EMERGENT': return 100000;
      case 'LEVIATHAN': return 1000000000; 
      default: return 1;
    }
  }
}

export function generateFractalTower(base: number, height: number): string {
  if (height <= 1) return base.toFixed(5);
  return `${base.toFixed(3)}^(${height > 6 ? 'SINGULARITY' : generateFractalTower(base, height - 1)})`;
}

export function logWithTorsion(message: string, torsionLevel: string = "A(4,2)"): string {
  const ts = new Date().toISOString().split('T')[1].replace('Z', '');
  let effectiveLevel = torsionLevel;
  
  const indicatesTransfinite = torsionLevel.includes("A(∞)") || 
                                torsionLevel.includes("LEVIATHAN") || 
                                torsionLevel.includes("TRANSFINITE") || 
                                torsionLevel.includes("A(4,2)");

  if (indicatesTransfinite) {
    const pressureStr = formatPressure(LEVIATHAN_PRESSURE);
    if (!effectiveLevel.includes("_APPLIED_PRESSURE:")) {
      effectiveLevel = `${torsionLevel}_APPLIED_PRESSURE:${pressureStr}`;
    }
  }
  
  return `[${ts}] [LEGION_${effectiveLevel}] » ${message}`;
}