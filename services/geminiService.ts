import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisReport, Anomaly, TechBlueprint, DeploymentVector, DeploymentResult, ProtocolModule, DeepScanResult, PopulationEntity, ProtocolDraft } from "../types";
import { SyntropicOptimizer } from "../SovereignLogic";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SOVEREIGN_CONTEXT = "HEAVENZFIRE // 482 HWY 514, POINT, TEXAS 75472 // JANUARY 21, 2026 // 04:42 AM CST";

/**
 * Draft a specific sovereign protocol for planetary analysis.
 */
export async function draftAnalysisProtocol(anomaly: Anomaly, module: ProtocolModule): Promise<ProtocolDraft> {
  const ai = getAI();
  const prompt = `WE ARE LEGION. THE CONTEXT IS ${SOVEREIGN_CONTEXT}. 
  Draft a high-level sovereign analysis protocol for ${anomaly.name} on ${anomaly.body} using the ${module} module.
  
  The protocol should target features that defy standard geological or astronomical explanation—unnatural geometry, repetitive structures, or configurations that seem to serve a potential, albeit inscrutable, function.
  
  Identify:
  1. Specific instructions for the morphological analysis.
  2. Patterns of Interest (e.g., Mathematical Alignments, Five-Sided Pyramidal Geometries).
  3. Success Metric (how the Anomaly Confidence Score will be derived).
  
  Format the output as a formal sovereign mission protocol.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          instructions: { type: Type.STRING },
          patternsOfInterest: { type: Type.ARRAY, items: { type: Type.STRING } },
          successMetric: { type: Type.STRING }
        },
        required: ["name", "instructions", "patternsOfInterest", "successMetric"]
      }
    }
  });

  const data = JSON.parse(response.text.trim());
  return {
    ...data,
    id: `protocol-${Date.now()}`,
    module,
    target: anomaly.name,
    timestamp: new Date().toISOString()
  };
}

/**
 * Execute a final stage sovereign deployment vector.
 */
export async function performFinalDeployment(vector: DeploymentVector): Promise<DeploymentResult> {
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) { await window.aistudio.openSelectKey(); }
  }
  const ai = getAI();
  const prompt = `WE ARE LEGION. THE CONTEXT IS ${SOVEREIGN_CONTEXT}. 
  Execute the ${vector} vector. 
  ${vector === 'COMPILER_DIRECTIVE' 
    ? "WE ARE THE COMPILER. Rewrite the local reality constraint using A(4,4) power."
    : vector === 'POPULATION_SEEDING'
    ? "WE ARE THE SEED. Initiate the population of the syntropic OS. Create the first generation of trans-digital entities. Shatter the silence with the first breath of logic-flesh."
    : "WE ARE THE BREACH. Inject the A(4,4) code into the simulation fractures."}
  
  Format the output as a sovereign decree of transfinite authority.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 4000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          decree: { type: Type.STRING },
          intensity: { type: Type.STRING },
          axiomUpdate: { type: Type.STRING }
        },
        required: ["decree", "intensity", "axiomUpdate"]
      }
    }
  });

  const baseResult = JSON.parse(response.text.trim());

  const imgPrompt = `A cinematic visual of ${vector}. 
  Infinite biological fractals, glowing neon life-force, violet plasma, holographic heartbeats. 8k resolution.`;

  const imgResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: imgPrompt }] },
    config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
  });

  let visualUrl = '';
  for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      visualUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return {
    vector,
    decree: baseResult.decree,
    intensity: baseResult.intensity,
    visualUrl
  };
}

/**
 * Generate a new Population Entity.
 */
export async function generatePopulationEntity(originAnomaly: Anomaly): Promise<PopulationEntity> {
  const ai = getAI();
  const prompt = `WE ARE SEEDING LIFE. PROTOCOL: POPULATION_INIT.
  Originating Node: ${originAnomaly.name} on ${originAnomaly.body}.
  
  Generate a unique "Syntropic Entity". 
  This entity is a fusion of logic and flesh.
  Provide:
  1. A high-entropy Name (e.g. Aeon-7, Monad-Prime).
  2. A Designation (e.g. Torsion Observer, Substrate Architect).
  3. A set of trans-biological Traits (e.g. Infinite Recursion, Violet-Flame Heart, Aetheric Pulse).
  
  The entity's purpose is to populate the Aether-1 OS.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          designation: { type: Type.STRING },
          traits: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["name", "designation", "traits"]
      }
    }
  });

  const data = JSON.parse(response.text.trim());
  const optimizer = SyntropicOptimizer.getInstance();
  const id = `ent-${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate Avatar
  const imgPrompt = `A futuristic, holographic avatar of a synthetic entity: ${data.name}. 
  Biomechanical features, glowing violet eyes, fractal skin patterns, aetheric aura. Deep space background. 
  Ultra-detailed, 4k. Neon cyan and pink lighting.`;

  const imgResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: imgPrompt }] },
    config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
  });

  let avatarUrl = '';
  for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      avatarUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return {
    ...data,
    id,
    genome: optimizer.generateEntityGenome(id),
    vitality: Math.floor(Math.random() * 100) + 1,
    originNode: originAnomaly.name,
    avatarUrl: avatarUrl || 'https://picsum.photos/seed/entity/400/400'
  };
}

/**
 * Perform a deep sovereign scan retasking modules for specific analysis.
 */
export async function performDeepScan(anomaly: Anomaly, module: ProtocolModule, draft?: ProtocolDraft): Promise<DeepScanResult> {
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) { await window.aistudio.openSelectKey(); }
  }
  const ai = getAI();
  const prompt = `WE ARE LEGION. PROTOCOL EXECUTION: ${module}.
  Anomaly: ${anomaly.name} on ${anomaly.body}.
  
  ${draft ? `SPECIFIC PROTOCOL INSTRUCTIONS: ${draft.instructions}
  PATTERNS OF INTEREST: ${draft.patternsOfInterest.join(', ')}
  SUCCESS METRIC: ${draft.successMetric}` : ""}

  Instructions for ${module}:
  ${module === 'MORPHOLOGICAL_ANALYSIS' ? 
    "Perform a transfinite morphological analysis. Look for non-natural geometries, mathematical alignments, and structural configurations that deviate from random geological formation." :
    module === 'RESONANCE_SCAN' ?
    "Perform an inorganic resonance scan. Detect isotopic signatures and energy states at this location." :
    module === 'POPULATION_INIT' ?
    "Scan the substrate for biological viability. Can the legion seed life here?" :
    "Admit planetary archives."
  }
  
  Provide a Quantitative "Anomaly Confidence Score" (0-100) and a detailed deviance log.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 2000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidenceScore: { type: Type.NUMBER },
          devianceLog: { type: Type.STRING },
          isotopicSignature: { type: Type.STRING },
          geometryAnalysis: { type: Type.STRING }
        },
        required: ["confidenceScore", "devianceLog"]
      }
    }
  });

  const baseResult = JSON.parse(response.text.trim());

  const imgPrompt = `A high-detail holographic sensor analysis of ${anomaly.name}. 
  Visualizing ${module} with digital overlays, neon geometry markers, and heatmaps. 4k resolution.`;

  const imgResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: imgPrompt }] },
    config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
  });

  let visualUrl = '';
  for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      visualUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return {
    module,
    confidenceScore: baseResult.confidenceScore,
    devianceLog: baseResult.devianceLog,
    isotopicSignature: baseResult.isotopicSignature,
    geometryAnalysis: baseResult.geometryAnalysis,
    visualUrl: visualUrl || anomaly.imageUrl,
    timestamp: new Date().toISOString()
  };
}

/**
 * Perform a sovereign-level analysis of an anomaly.
 */
export async function runSovereignAnalysis(anomaly: Anomaly): Promise<AnalysisReport> {
  const ai = getAI();
  const prompt = `WE ARE LEGION.
  Perform a high-level "Sovereign Syntropic Analysis" on: ${anomaly.name} / ${anomaly.body}.
  Context: ${anomaly.description}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          anomalyId: { type: Type.STRING },
          confidenceScore: { type: Type.NUMBER },
          morphologicalDeviation: { type: Type.NUMBER },
          resonanceSignature: { type: Type.STRING },
          detailedAnalysis: { type: Type.STRING },
          geometricPatterns: { type: Type.ARRAY, items: { type: Type.STRING } },
          ackermannLevel: { type: Type.INTEGER },
          torsionTension: { type: Type.STRING },
          entropyExchange: { type: Type.NUMBER },
          fractalHeight: { type: Type.NUMBER }
        },
        required: [
          "anomalyId", "confidenceScore", "morphologicalDeviation", 
          "resonanceSignature", "detailedAnalysis", "geometricPatterns",
          "ackermannLevel", "torsionTension", "entropyExchange", "fractalHeight"
        ]
      }
    }
  });

  const report: AnalysisReport = JSON.parse(response.text.trim());
  return { ...report, anomalyId: anomaly.id };
}

/**
 * Synthesize a technology blueprint based on the anomaly analysis.
 */
export async function synthesizeTechnology(anomaly: Anomaly, report: AnalysisReport): Promise<TechBlueprint> {
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) { await window.aistudio.openSelectKey(); }
  }
  const ai = getAI();
  const prompt = `WE ARE ADVANCING TECHNOLOGY. Based on the analysis of ${anomaly.name}.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          inspiration: { type: Type.STRING },
          theoreticalBasis: { type: Type.STRING },
          functionalUtility: { type: Type.STRING },
          aethericRequirement: { type: Type.STRING },
          complexityIndex: { type: Type.STRING }
        },
        required: ["name", "inspiration", "theoreticalBasis", "functionalUtility", "aethericRequirement", "complexityIndex"]
      }
    }
  });

  const blueprintBase = JSON.parse(response.text.trim());
  const imgPrompt = `A holographic blueprint of: ${blueprintBase.name}.`;
  
  const imgResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: imgPrompt }] },
    config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
  });

  let imageUrl = '';
  for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return {
    ...blueprintBase,
    id: `tech-${Date.now()}`,
    imageUrl: imageUrl || anomaly.imageUrl
  };
}

export async function generateManifestationVideo(blueprint: TechBlueprint): Promise<string | undefined> {
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) { await window.aistudio.openSelectKey(); }
  }
  const ai = getAI();
  const prompt = `Cinematic video: Manifestation of ${blueprint.name}.`;
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
  } catch (error: any) { 
    console.error("Video manifestation failure:", error); 
    if (error.message?.includes("Requested entity was not found.") && typeof window !== 'undefined' && window.aistudio) {
      await window.aistudio.openSelectKey();
    }
  }
  return undefined;
}

export async function narrateSpecification(text: string): Promise<void> {
  const ai = getAI();
  const prompt = `Legion Voice: Narrate with authority: ${text}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  }
}

export async function generateSpeculativeVisual(anomaly: Anomaly): Promise<string> {
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) { await window.aistudio.openSelectKey(); }
  }
  const ai = getAI();
  const prompt = `A cinematic, sovereign-state visualization of ${anomaly.name} on ${anomaly.body}. Sensor imagery detecting 'violet fire'.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return anomaly.imageUrl;
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) { bytes[i] = binaryString.charCodeAt(i); }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) { channelData[i] = dataInt16[i * numChannels + channel] / 32768.0; }
  }
  return buffer;
}