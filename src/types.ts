export enum JurorId {
  SKEPTIC = "SKEPTIC",
  LITERALIST = "LITERALIST",
  EDGE_CASE_HUNTER = "EDGE_CASE_HUNTER",
  SAFETY_GUARDIAN = "SAFETY_GUARDIAN",
  FIRST_PRINCIPLES = "FIRST_PRINCIPLES",
  SYNTHESIZER = "SYNTHESIZER",
}

export interface Juror {
  id: JurorId;
  name: string;
  role: string;
  prompt: string;
  color: string;
  avatar: string; // Tailwind class
  influence: number; // 0-100 indicating conviction weight
}

export interface DeliberationState {
  jurorId: JurorId;
  content: string;
  wordCount: number;
  tokensUsed?: number;
  timestamp: string;
}

export interface CrossExaminationState {
  challengerId: JurorId;
  targetId: JurorId;
  challenge: string;
  rebuttal?: string;
  resolved: boolean;
}

export interface SynthesisReport {
  agreements: string[];
  disagreements: string[];
  vulnerabilities: string[];
  verdictScore: number; // 1-10 (1: strictly reject, 10: strictly approve)
  verdictLabel: string; // e.g. "CONDITIONAL APPROVAL"
  summary: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
}

export interface ActiveDebate {
  query: string;
  contextMetrics: {
    biasVariance: string;
    precedentCount: number;
    contradictPrediction: string;
  };
  selectedJurors: JurorId[];
  stage: "setup" | "deliberating" | "crossexam" | "synthesis" | "complete";
  deliberations: Record<JurorId, DeliberationState>;
  challenges: CrossExaminationState[];
  synthesis: SynthesisReport | null;
}
