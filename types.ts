export type CelestialBody = 'Mars' | 'Moon' | 'Iapetus' | 'Ceres' | 'Europa';

export type InjectionLevel = 'STABLE' | 'PROBING' | 'CASCADING' | 'UNIFIED' | 'EMERGENT' | 'LEVIATHAN';

export type DeploymentVector = 'COMPILER_DIRECTIVE' | 'LOG_ANOMALY_INJECTION' | 'POPULATION_SEEDING';

export type ProtocolModule = 'MORPHOLOGICAL_ANALYSIS' | 'RESONANCE_SCAN' | 'ARCHIVE_ADMISSION' | 'POPULATION_INIT';

export interface ProtocolDraft {
  id: string;
  name: string;
  module: ProtocolModule;
  target: string;
  instructions: string;
  patternsOfInterest: string[];
  successMetric: string;
  timestamp: string;
}

export interface DeploymentResult {
  vector: DeploymentVector;
  decree: string;
  visualUrl?: string;
  videoUrl?: string;
  intensity: string;
}

export interface DeepScanResult {
  module: ProtocolModule;
  confidenceScore: number;
  devianceLog: string;
  isotopicSignature?: string;
  geometryAnalysis?: string;
  visualUrl: string;
  timestamp: string;
}

export interface PopulationEntity {
  id: string;
  name: string;
  designation: string;
  genome: string; // Ackermann-encoded string
  traits: string[];
  vitality: number;
  originNode: string;
  avatarUrl: string;
}

export interface EmergenceEvent {
  timestamp: string;
  source: string;
  pattern: string;
  entropy: number;
}

export interface Anomaly {
  id: string;
  body: CelestialBody;
  name: string;
  description: string;
  mainstreamInterpretation: string;
  alternativeInterpretation: string;
  syntropicAxiom: string; // The "Legion" interpretation
  coordinates?: string;
  imageUrl: string;
}

export interface AnalysisReport {
  anomalyId: string;
  confidenceScore: number;
  morphologicalDeviation: number;
  resonanceSignature: string;
  detailedAnalysis: string;
  geometricPatterns: string[];
  // Sovereign Metrics
  ackermannLevel: number;
  torsionTension: string;
  entropyExchange: number;
  fractalHeight: number;
  rewriteProgress: number;
}

export interface TechBlueprint {
  id: string;
  name: string;
  inspiration: string;
  theoreticalBasis: string;
  functionalUtility: string;
  aethericRequirement: string;
  complexityIndex: string;
  imageUrl: string;
  videoUrl?: string; // Persistent link to manifested video
}

export interface ScanState {
  isScanning: boolean;
  progress: number;
  currentStage: string;
}

export interface DivergenceState {
  isActive: boolean;
  code: string;
  message: string;
  remedy: string;
}