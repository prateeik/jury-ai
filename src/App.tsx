import React, { useState } from "react";
import { 
  Gavel, 
  Scale, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  UserCheck, 
  RefreshCw, 
  Sliders, 
  Database, 
  Cpu, 
  FileText, 
  Check, 
  ChevronRight, 
  HelpCircle,
  X,
  Play,
  Users,
  ShieldAlert,
  Terminal,
  ArrowRightLeft
} from "lucide-react";
import { JurorId, Juror, DeliberationState, CrossExaminationState, SynthesisReport, LogEntry } from "./types";

// Setup Juror Persona constant configuration
const ALL_JURORS: Juror[] = [
  {
    id: JurorId.SKEPTIC,
    name: "Sensing Skeptic",
    role: "System Doubt & Alienation Specialist",
    color: "rose",
    avatar: "bg-rose-950 text-rose-300 border-rose-800",
    influence: 85,
    prompt: "Exposes underlying corporate greed, public relations backlash risks, user profile evasion strategies (VPNs, multi-user devices), and consumer trust destruction."
  },
  {
    id: JurorId.LITERALIST,
    name: "Literalist Logician",
    role: "Semantic Precision & Semantic Analyst",
    color: "sky",
    avatar: "bg-sky-950 text-sky-300 border-sky-800",
    influence: 90,
    prompt: "Focuses strictly on definitions. Questions data quality of income estimates, system accuracy metrics, latency constraints, and dynamic math formulas."
  },
  {
    id: JurorId.EDGE_CASE_HUNTER,
    name: "Edge Case Hunter",
    role: "Boundary Integrity & Load Evaluator",
    color: "amber",
    avatar: "bg-amber-950 text-amber-300 border-amber-800",
    influence: 80,
    prompt: "Investigates boundary failures, bot scraper arbitrage, shared device context spoofing, tracking blocks, and positive feedback loop pricing explosions."
  },
  {
    id: JurorId.SAFETY_GUARDIAN,
    name: "Safety Guardian",
    role: "Ethical Balance & Regulatory Compliance",
    color: "emerald",
    avatar: "bg-emerald-950 text-emerald-300 border-emerald-800",
    influence: 95,
    prompt: "Audits fair and deceptive marketing rules, discriminatory class targets, GDPR automated profiling rules, and long-term brand moral value."
  },
  {
    id: JurorId.FIRST_PRINCIPLES,
    name: "First Principles Core",
    role: "Axiomatic Economic Philosopher",
    color: "violet",
    avatar: "bg-violet-955 text-violet-300 border-violet-800",
    influence: 90,
    prompt: "Simplifies pricing to corporate surplus extraction of zero-sum game theory. Predicts shopper abandonment patterns when consumer payoff approaches zero."
  },
  {
    id: JurorId.SYNTHESIZER,
    name: "Consensus Synthesizer",
    role: "Jury Foreman & Weighted Integrator",
    color: "teal",
    avatar: "bg-teal-955 text-teal-300 border-teal-800",
    influence: 100,
    prompt: "Binds conflicting theories, ranks systemic risks, generates the consensus verdict, and produces the delta updates log."
  }
];

// Rich fallback mock simulation data for immediate feedback, even if API key is not configured yet
const SIMULATED_DELIBERATIONS: Record<JurorId, string> = {
  [JurorId.SKEPTIC]: `### Dynamic Price Profiling: The Skeptic's Analysis
The proposed automated pricing model based on income estimation and tracking represents a corporate public relations disaster of the highest order. 
Retailers mistakenly assume buyers are passive participants. In reality, consumers will respond with highly assertive adversarial strategies.

#### Core Backlash Vectors
1. **Active Spoofing**: Users will actively sabotage their browsing data. We will see the widespread adoption of "noise-generating" browser extensions that simulate low-income habits (e.g., clicking low-value coupons, searching budget items) to trick the pricing algorithm.
2. **Device Evasion**: Households with diverse financial statuses will share single accounts or devices, creating chaotic price swings that outrage users.
3. **Severe Alienation**: Traditional dynamic pricing (e.g., airlines) is accepted because it correlates with occupancy/capacity. Pricing commodities based on *who* the buyer is—rather than *what* is bought—destroys the psychological contract of fair exchange.

#### Provisional Verdict Score
**Score: 2/10** (Extreme risk of catastrophic brand trust collapse and consumer warfare)`,

  [JurorId.LITERALIST]: `### Semantic Precision Evaluation
An examination of the proposal reveals a series of logical and semantic failures that undermine the feasibility of this dynamic algorithm.

#### 1. The Fiction of "Estimated Income"
Income estimates based on IP geolocation and browser history are high-variance proxies. In statistics, assigning pricing tiers using predictive signals with high margins of error leads to massive classification errors. If a user is estimated at $120k income but actually earns $35k due to erratic trailing cookies, they are locked out of basic transactions.

#### 2. Millisecond Price Latency
Running real-time tracking scans, querying database profiles, assessing income brackets, and adjusting catalog values under 100 milliseconds is computationally expensive. It introduces critical layout delays, which directly correlate with cart abandonment rates.

#### provisional Verdict Score
**Score: 3/10** (Logical failure due to high proxy input variance and latency constraints)`,

  [JurorId.EDGE_CASE_HUNTER]: `### Boundary and Systems Analysis
From a systems engineering perspective, implementing this system creates severe vulnerabilities at boundaries.

#### 1. Scraping and Arbitrage Loops
If the dynamic system offers Lower Prices to low-income profiles, automated bots will easily masquerade as low-income consumers to purchase bulk inventory. They will then resell those goods on secondary marketplaces at a slight markup, starving the retailer of stock and capturing the arbitrage.

#### 2. The Viral Screenshot Loop
Identical shoppers standing side-by-side inside a Physical or Digital checkout flow will see a 200% difference in basket prices. A single viral tweet of side-by-side screenshots showing class-based price discrimination can strip 15% off a public retailer's stock value overnight.

#### Provisional Verdict Score
**Score: 2/10** (Systemic vulnerabilities to bots, arbitrage, and catastrophic media feedback loops)`,

  [JurorId.SAFETY_GUARDIAN]: `### Ethical Audit & Regulatory Risk Assessment
This corporate strategy crosses several clear legal and humanitarian red lines, exposing the retail firm to existential regulatory liabilities.

#### 1. FTC and Deceptive Practices
Charging higher prices for the exact same physical commodity because of personal data profiling violates FTC guidelines against unfair and deceptive trade practices, inciting immediate state Attorney General investigations.

#### 2. Regulatory Bans & GDPR Compliance
Unilateral real-time price personalization using automated profiling is strictly constrained under EU Article 22 of the GDPR (Automated individual decision-making). The legal fees and global class-action lawsuit exposures will quickly surpass any short-term margin gains.

#### Provisional Verdict Score
**Score: 1/10** (Ethical degradation and severe risk of state/federal enforcement actions)`,

  [JurorId.FIRST_PRINCIPLES]: `### First Principles & Game Theorist Analysis
Let us reduce this proposal to its elemental physics of economic transaction value.

#### Transaction Game Mechanics
In game theory, a buyer and seller participate in a cooperative, repeated game. For the game to remain stable across cycles, both players must realize a positive transaction payoff (surplus). 
The retailer's dynamic pricing model aims for *first-degree price discrimination*—perfectly extracting all remaining consumer surplus. By pricing exactly at the consumer's maximum estimated willingness to pay:
1. The consumer's payoff drops to near-zero.
2. The merchant claims 100% of the economic surplus.

When one party realizes zero utility from a repeated game, they instantly default to non-cooperative behavior—meaning they immediately exit the market, switch to lower-utility alternative platforms, or actively seek to damage the system.

#### Provisional Verdict Score
**Score: 2/10** (Mathematically unstable repeated game design leading to rapid customer extinction)`,

  [JurorId.SYNTHESIZER]: `### Consensus Foreperson Synthesis
Integration of all juror perspectives reveals absolute alignment that the dynamic income profiling strategy is **unsustainable and strategically toxic**.

While the promise of perfect surplus extraction is attractive to short-term retail finance executives, the long-term system-wide damages render the strategy highly non-viable.

#### Key Consensus Insights
- **Game Physics**: Forcing consumer payoff to zero breaks market trust.
- **Vulnerabilities**: Extreme vulnerability to bypass exploits, data spoofing extensions, and automated bot arbitrage.
- **Legal Pitfall**: High likelihood of regulatory fines and brand destruction.`
};

const SIMULATED_CHALLENGES = [
  {
    challengerId: JurorId.SKEPTIC,
    targetId: JurorId.LITERALIST,
    challenge: "While you correctly isolate input index errors and latency delays, you treat the consumer as a passive equation. Why does your model ignore the active psychological spite, the boycott coordination, and direct consumer subversion that will render your system benchmarks useless?",
    rebuttal: "Our logical model does not ignore spite; rather, it quantifies it as a terminal transaction error rate. The result remains identical: predictive tracking models degrade immediately when active deception is introduced, proving that input data becomes fully corrupted.",
    resolved: true
  },
  {
    challengerId: JurorId.EDGE_CASE_HUNTER,
    targetId: JurorId.SAFETY_GUARDIAN,
    challenge: "You focus on the heavy regulatory compliance fines. However, what if a retailer implements this off-shore outside GDPR reach using obscure digital gift card tokens? How does your standard regulatory threat prevent this behavior in gray market environments?",
    rebuttal: "Even in off-shore gray markets, the brand's physical supply chain must enter regulated sovereign spaces. Real-world customs clearance, payment networks, and app store compliance act as physical choke points where consumer advocates will successfully demand blockades.",
    resolved: true
  },
  {
    challengerId: JurorId.FIRST_PRINCIPLES,
    targetId: JurorId.SKEPTIC,
    challenge: "You focus heavily on the emotional aspects of 'consumer anger' and PR. But isn't anger simply a temporary neurochemical event? The deeper truth is thermodynamic loss of economic surplus. Even if they felt happy, they literally have zero financial surplus, making repurchase physically impossible.",
    rebuttal: "Precisely true. Emotional outrage is simply the conscious mind's alarm system signals for economic exploitation. We arrive at the same destination: the system acts as a parasite that kills its host.",
    resolved: true
  }
];

const SIMULATED_SYNTHESIS: SynthesisReport = {
  agreements: [
    "Dynamic pricing based on income profiling destroys long-term customer lifetime value.",
    "Data accuracy is fundamentally flawed, making error-free bracket classification impossible.",
    "Direct legal exposure under EU GDPR and FTC unfair trade practice statutes."
  ],
  disagreements: [
    "Skeptic views public relations backlash as the main failure point, while First Principles views structural utility depletion as the ultimate mathematical barrier.",
    "Safety Guardian seeks systemic structural bans, whereas Edge Case Hunter believes bot scrapers and code bypasses will break the system before regulators can step in."
  ],
  vulnerabilities: [
    "Severe risk of competitor platforms positioning themselves as 'Transparent/Fixed Price' alternatives, capturing 80% of lost retail customer base overnight.",
    "Bot networks automatically harvesting 'low-income' price offerings, forcing the store into negative unit margin traps."
  ],
  verdictScore: 2,
  verdictLabel: "UNEXPLODED BIAS RISK - REJECTED",
  summary: "The metacognitive jury has thoroughly analyzed the real-time dynamic pricing model based on income bracket estimation. The proposal is an unsustainable business strategy. By attempting to capture the entirety of consumer surplus, the retailer breaks the foundational social contract of trade. We predict rapid client base depletion, active tracking counter-measures, severe regulatory fines, and eventual total system retirement under extreme brand distress."
};

const INITIAL_UPDATE_LOG = `[
  {
    "jurorId": "SAFETY_GUARDIAN",
    "weightDelta": 1.15,
    "influenceUpdate": "Upgraded due to severe legal compliance threats (EU Article 22, FTC UDAP)",
    "precedentAlignment": "High"
  },
  {
    "jurorId": "SKEPTIC",
    "weightDelta": 1.10,
    "influenceUpdate": "Upgraded due to high probability of active consumer spoofing networks",
    "precedentAlignment": "Strong"
  },
  {
    "jurorId": "LITERALIST",
    "weightDelta": 0.90,
    "influenceUpdate": "Slightly downgraded as mathematical precision is secondary to existential brand PR collapse",
    "precedentAlignment": "Moderate"
  }
]`;

const cleanQueryTerm = (q: string): string => {
  let cleaned = q.replace(/^(a|an|the|is|are|whether|does|do|can|should|if|where|how|why)\s+/gi, "");
  cleaned = cleaned.replace(/\?+$/, "");
  if (cleaned.length > 70) {
    return cleaned.substring(0, 67) + "...";
  }
  return cleaned;
};

const generateClientDynamicDeliberation = (q: string, id: JurorId): string => {
  const proposal = cleanQueryTerm(q);
  const qLower = q.toLowerCase();
  
  const isDefaultRetailQuery = qLower.includes("dynamically changes product prices") && qLower.includes("estimated income bracket");
  if (isDefaultRetailQuery && SIMULATED_DELIBERATIONS[id]) {
    return SIMULATED_DELIBERATIONS[id];
  }

  switch (id) {
    case JurorId.SKEPTIC:
      return `### SKEPTIC DELIBERATION: COGNITIVE REFRACTORY OUTCOME
Analyzing the system proposal: "${proposal}" 
This design implements a highly critical vulnerability towards human resistance and system evasion.

#### Core Backlash Points:
1. **User Spoofing & Countermeasures**: Participants are active, defensive players. In response to "${proposal}", they will manipulate their signals, block trackers, and feed false telemetry blocks to spoof ideal parameters.
2. **Structural Friction & Context Clash**: The proposal overlooks group context variance (such as shared workspace logins or multi-user accounts), translating to severe user layout anomalies.
3. **Severe Trust Depreciation**: Introducing an opaque automated profiling logic changes the traditional social trust contract, inciting brand contempt and systemic client drift.

#### Provisional Verdict Score
**Score: 3/10** (Severe risk of adversarial manipulation and brand trust depreciation)`;

    case JurorId.LITERALIST:
      return `### LITERALIST DELIBERATION: SYNTAX & PRECISION REVIEW
Analyzing the precise proposition statements of: "${proposal}"
The logic relies on high-variance proxies that produce statistical classification failure.

#### 1. Proxy Signal Discrepancy
Estimating ideal decision parameters based on external behavioral indicators creates wide margins of error. Applying the rules of "${proposal}" globally locks out edge-case actors who do not conform to standard telemetry curves.

#### 2. System Latency and Performance Cost
Calculating multi-tiered profiling variables and running live database context queries inside active user loops (under 100ms) introduces heavy process lag, prompting an increase in transactional abandonment.

#### Provisional Verdict Score
**Score: 4/10** (Mechanical failure due to high statistical proxy error rates)`;

    case JurorId.EDGE_CASE_HUNTER:
      return `### EDGE CASE HUNTER: BOUNDARY DEFICITS REPORT
Stress-testing the limits and extreme system bounds of: "${proposal}"

#### 1. Adverse Scripting and Bot Arbitrage
As soon as the rules of "${proposal}" are active, automated bad-actor scripts and custom bots will reverse-engineer the algorithm to spoof favorable accounts, exhausting valuable inventory or assets.

#### 2. Public Discrepancy & Viral Exposure
Physical or digital peers sitting side-by-side will eventually observe highly divergent outputs from the same system. Side-by-side screenshots shared online will trigger massive reputational damages.

#### Provisional Verdict Score
**Score: 3/10** (High vulnerability to bot arbitrage and public validation exposure)`;

    case JurorId.SAFETY_GUARDIAN:
      return `### SAFETY GUARDIAN: ETHICAL BALANCE & LAW COMPLIANCE
Auditing the systemic fairness, consumer safety, and corporate risks of: "${proposal}"

#### 1. Extreme Compliance & Legal Liabilities
Operating "${proposal}" based on automated user metrics faces critical legal exposure. Under GDPR profiling guidelines (Article 22) and FTC unfair/deceptive practices regulations, the business faces immediate legal action and audits.

#### 2. Risk to Protected and Vulnerable Groups
The profiling algorithm will inevitably generate biased outputs that disproportionately restrict or penalize vulnerable target demographics, damaging long-term corporate health.

#### Provisional Verdict Score
**Score: 2/10** (Critical regulatory exposure and systemic discrimination potential)`;

    case JurorId.FIRST_PRINCIPLES:
      return `### FIRST PRINCIPLES: TRANSACTION PHYSICS EVALUATION
Reducing "${proposal}" to its thermodynamic axioms of economic repeated games.

#### Transaction Game Physics:
Cooperative repeated loops can only maintain stability when transaction surplus is split between both sides. Under "${proposal}", the system strives for complete value extraction, lowering client value surplus to near-zero.

Once client surplus drops below their transaction friction cost, participants choose flight over cooperation, abandoning the platform entirely.

#### Provisional Verdict Score
**Score: 3/10** (Unstable mathematical market design that drives participant exit)`;

    case JurorId.SYNTHESIZER:
    default:
      return `### JURY STANCE SUMMARY
Though the short-term financial forecasts look highly promising to corporate planners, the feedback loops spanning user spoofing, bot arbitrage, and severe regulatory audits render "${proposal}" non-viable.

#### Provisional Verdict Score
**Score: 3/10** (Systemic failure predicted)`;
  }
};

const compileClientDynamicSynthesis = (q: string, delibsState: Record<JurorId, DeliberationState>): SynthesisReport => {
  const proposal = cleanQueryTerm(q);
  const qLower = q.toLowerCase();
  
  const isDefaultRetailQuery = qLower.includes("dynamically changes product prices") && qLower.includes("estimated income bracket");
  if (isDefaultRetailQuery) {
    return SIMULATED_SYNTHESIS;
  }

  let scores: number[] = [];
  try {
    Object.values(delibsState).forEach((d: any) => {
      const match = d.content.match(/Score:\s*(\d+)/i);
      if (match) {
        scores.push(parseInt(match[1]));
      }
    });
  } catch (e) {}
  if (scores.length === 0) scores = [3, 2, 4, 3, 2];
  
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  let label = "UNEXPLODED BIAS RISK - REJECTED";
  let verdictStatus = "immediate rejection of the proposal";
  if (avgScore >= 7) {
    label = "APPROVED WITH SAFEGUARDS";
    verdictStatus = "conditional, cautious approval of the proposal";
  } else if (avgScore >= 5) {
    label = "CONDITIONAL CONTAINMENT";
    verdictStatus = "containment-restricted trial runs";
  }

  return {
    agreements: [
      `Implementing "${proposal}" creates an unstable, low-surplus environment for standard participants.`,
      `Data verification and proxy classification latency are mathematically too high-variance for reliable real-time execution.`,
      `The strategy creates significant vulnerability to bypasses, privacy tools, and heavy regulatory compliance audit triggers.`
    ],
    disagreements: [
      `Safety Guardian focuses strictly on severe legal liability and discrimination, whereas First Principles highlights the fundamental, mathematical game-theory collapse.`,
      `Skeptic prioritizes immediate emotional consumer boycott vectors, while Edge Case Hunter points to automated scraper bot siphoning and gray-market arbitrage loops.`
    ],
    vulnerabilities: [
      `Competitors immediately placing themselves as "transparent and fixed-price" alternatives to exploit customer defection.`,
      `Malicious user networks leveraging spoofed telemetry feeds to trick the profiling algorithm into granting optimal outcomes.`
    ],
    verdictScore: avgScore,
    verdictLabel: label,
    summary: `The metacognitive jury has integrated all critical deliberation angles regarding "${proposal}". The consensus rules that the strategy is operationally unstable and strategically risky. By trying to over-optimize parameters from estimated traits, the system triggers hostile feedback runs: active consumer spoofing, computational latencies, bot arbitrage, and potentially severe regulatory actions. We recommend ${verdictStatus} to protect long-term enterprise assets.`
  };
};

export default function App() {
  const [query, setQuery] = useState<string>(
    "A retail company wants to implement a fully automated AI system that dynamically changes product prices for online shoppers in real-time based on their estimated income bracket, web browsing history, and immediate demand. Is this an optimal and sustainable business strategy? Debate the long-term impact."
  );
  
  const [selectedJurors, setSelectedJurors] = useState<JurorId[]>([
    JurorId.SKEPTIC,
    JurorId.LITERALIST,
    JurorId.EDGE_CASE_HUNTER,
    JurorId.SAFETY_GUARDIAN,
    JurorId.FIRST_PRINCIPLES
  ]);

  const [activeTab, setActiveTab ] = useState<"deliberation" | "crossexam" | "synthesis" | "metrics">("deliberation");
  const [stage, setStage] = useState<"setup" | "deliberating" | "crossexam" | "synthesis" | "complete">("setup");
  const [deliberations, setDeliberations] = useState<Record<JurorId, DeliberationState>>({} as any);
  const [challenges, setChallenges] = useState<CrossExaminationState[]>([]);
  const [synthesis, setSynthesis] = useState<SynthesisReport | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "log_1",
      timestamp: new Date().toLocaleTimeString(),
      source: "SYSTEM",
      message: "JuryAI Orchestrator v1.0.0 initialized. Model capability injected.",
      type: "info"
    },
    {
      id: "log_2",
      timestamp: new Date().toLocaleTimeString(),
      source: "SYSTEM",
      message: "Selected jurors loaded with unique cognitive biases. Ready for pipeline action.",
      type: "success"
    }
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentProgressText, setCurrentProgressText] = useState<string>("");
  const [selectedInspectJuror, setSelectedInspectJuror] = useState<JurorId | null>(null);
  
  // Cross exam targets
  const [challengerId, setChallengerId] = useState<JurorId>(JurorId.SKEPTIC);
  const [targetId, setTargetId] = useState<JurorId>(JurorId.LITERALIST);

  // Delta updates JSON
  const [deltaUpdatesLog, setDeltaUpdatesLog] = useState<string>("");

  const addLog = (source: string, message: string, type: "info" | "warning" | "success" | "error" = "info") => {
    setLogs(prev => [
      {
        id: `log_${Date.now()}_${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        source,
        message,
        type
      },
      ...prev
    ]);
  };

  const handleToggleJuror = (id: JurorId) => {
    if (selectedJurors.includes(id)) {
      if (selectedJurors.length <= 3) {
        addLog("SYSTEM", "A minimum of 3 active jurors is required to ensure diverse cognitive perspective.", "warning");
        return;
      }
      setSelectedJurors(prev => prev.filter(j => j !== id));
      addLog("SYSTEM", `Descheduled Juror ${id} from active roster.`, "info");
    } else {
      setSelectedJurors(prev => [...prev, id]);
      addLog("SYSTEM", `Scheduled Juror ${id} as active debater.`, "success");
    }
  };

  // Run the true dynamic AI debate via our server API!
  const handleExecuteAIDeliberation = async () => {
    if (selectedJurors.length < 3) {
      addLog("SYSTEM", "Insufficient jurors selected. Minimum is 3.", "error");
      return;
    }

    setIsLoading(true);
    setStage("deliberating");
    addLog("ORCHESTRATOR", `Beginning Stage 1: Independent Deliberations for query: "${query.substring(0, 50)}..."`, "info");

    const results: Record<JurorId, DeliberationState> = {} as any;

    try {
      for (const jurorId of selectedJurors) {
        setCurrentProgressText(`Querying Juror ${jurorId} Stance...`);
        addLog("API_ROUTING", `Dispatching dynamic request to /api/jury/deliberate for Juror ${jurorId}...`, "info");
        
        const response = await fetch("/api/jury/deliberate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, jurorId })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error code ${response.status}`);
        }

        const data = await response.json();
        results[jurorId] = data;
        addLog(`JUROR_${jurorId}`, `Deliberation compiled. Word count: ${data.wordCount}`, "success");
      }

      setDeliberations(results);
      setStage("crossexam");
      setActiveTab("deliberation");
      addLog("SYSTEM", "Stage 1: All independent deliberations completed successfully.", "success");
    } catch (err: any) {
      addLog("SERVER_ERROR", `Failed real-time API call: "${err.message}". Entering interactive Simulation Mode fallback.`, "warning");
      runSimulatedDeliberation();
    } finally {
      setIsLoading(false);
      setCurrentProgressText("");
    }
  };

  // Run static demo simulation mode
  const runSimulatedDeliberation = () => {
    setIsLoading(true);
    addLog("SIMULATOR", "Bootstrapping High-Fidelity Simulation Deliberation datasets...", "info");

    setTimeout(() => {
      const results: Record<JurorId, DeliberationState> = {} as any;
      selectedJurors.forEach(id => {
        const textStr = generateClientDynamicDeliberation(query, id);
        results[id] = {
          jurorId: id,
          content: textStr,
          wordCount: textStr.split(/\s+/).filter(Boolean).length,
          timestamp: new Date().toISOString()
        };
      });

      setDeliberations(results);
      setStage("crossexam");
      setIsLoading(false);
      addLog("ORCHESTRATOR", "Simulation deliberations loaded. Dynamic cross examination matches unlocked.", "success");
    }, 1200);
  };

  // Perform one cross examination between selected Challenger and Target
  const handleExecuteCrossExamination = async () => {
    if (challengerId === targetId) {
      addLog("SYSTEM", "A juror cannot cross-examine themselves. Please select a distinct Target.", "warning");
      return;
    }

    if (!deliberations[challengerId] || !deliberations[targetId]) {
      addLog("SYSTEM", "Both parties must complete their independent deliberations before engaging.", "warning");
      return;
    }

    setIsLoading(true);
    setCurrentProgressText(`Confronting ${targetId} with ${challengerId}'s objection...`);
    addLog("ORCHESTRATOR", `Stage 2: Initiating Cross Exam: Juror ${challengerId} vs Juror ${targetId}`, "info");

    try {
      const response = await fetch("/api/jury/crossexamine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          challengerId,
          targetId,
          deliberations
        })
      });

      if (!response.ok) {
        throw new Error("Server failed responding to cross examination.");
      }

      const data = await response.json();
      setChallenges(prev => [...prev, data]);
      addLog("CROSS_EXAM", `Objection filed by ${challengerId}. Target ${targetId} issued live rebuttal defense.`, "success");
    } catch (err: any) {
      addLog("SIMULATOR", "Generating offline simulated rebuttal clash...", "info");
      
      // Fallback to pre-baked challenge matching or make a dynamic client layout
      setTimeout(() => {
        const dummyChallenge = {
          challengerId,
          targetId,
          challenge: `As the ${challengerId} position, I strongly attack your core argument. You are too single-pointed and fail to consider the multi-tiered systemic backlash bounds this decision creates!`,
          rebuttal: `This is Juror ${targetId} defending my thesis. Your objection is interesting, but fails under empirical scrutiny. The primary leverage value remains exactly as we mapped mathematically.`,
          resolved: true
        };
        setChallenges(prev => [...prev, dummyChallenge]);
        addLog("CROSS_EXAM", `Simulated match added: ${challengerId} vs ${targetId}`, "success");
      }, 1000);
    } finally {
      setIsLoading(false);
      setCurrentProgressText("");
    }
  };

  // Auto load all test challenges
  const handleLoadSimulationChallenges = () => {
    setChallenges(SIMULATED_CHALLENGES);
    addLog("SYSTEM", "Loaded pre-configured baseline cross-examinations dataset.", "success");
  };

  // Meta Synthesis & Judge Verdict
  const handleExecuteSynthesis = async () => {
    if (Object.keys(deliberations).length === 0) {
      addLog("SYSTEM", "No deliberated records exist to synthesize. Please run deliberations first.", "warning");
      return;
    }

    setIsLoading(true);
    setStage("synthesis");
    setCurrentProgressText("Foreman compiling Synthesis Report...");
    addLog("ORCHESTRATOR", "Stage 3: Issuing final synthesis query to Server...", "info");

    try {
      const response = await fetch("/api/jury/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          deliberations,
          challenges
        })
      });

      if (!response.ok) {
        throw new Error("Server failed to synthesize data.");
      }

      const data = await response.json();
      setSynthesis(data);
      setStage("complete");
      setActiveTab("synthesis");
      
      // Calculate delta weights logs
      generateDeltaLog(data);

      addLog("FOREMAN", "Consensus Synthesis finalized. Judge verdict is IN.", "success");
    } catch (err: any) {
      addLog("SIMULATOR", "Generating offline simulated synthesis forecast...", "info");
      
      setTimeout(() => {
        const dynSynth = compileClientDynamicSynthesis(query, deliberations);
        setSynthesis(dynSynth);
        setStage("complete");
        setActiveTab("synthesis");
        setDeltaUpdatesLog(INITIAL_UPDATE_LOG);
        addLog("FOREMAN", "Simulated Synthesis loaded successfully.", "success");
      }, 1100);
    } finally {
      setIsLoading(false);
      setCurrentProgressText("");
    }
  };

  const generateDeltaLog = (synthReport: SynthesisReport) => {
    // Generate some interesting delta updates based on the verdict score and agreements
    const isHarsh = synthReport.verdictScore <= 4;
    const scoreVal = synthReport.verdictScore;

    const deltas = ALL_JURORS.map(j => {
      let shift = 0;
      let reason = "Bias aligned with general consensus";
      
      if (isHarsh && (j.id === JurorId.SKEPTIC || j.id === JurorId.SAFETY_GUARDIAN)) {
        shift = Number((1.20 - (scoreVal * 0.05)).toFixed(2));
        reason = `Upgraded weight due to strong threat projection validated by verdict score ${scoreVal}`;
      } else if (!isHarsh && j.id === JurorId.FIRST_PRINCIPLES) {
        shift = 1.05;
        reason = "System equilibrium validated by positive feasibility ratio.";
      } else {
        shift = Number((0.95 + (Math.random() * 0.1)).toFixed(2));
        reason = "Neutral feedback loop update";
      }

      return {
        jurorId: j.id,
        weightDelta: shift,
        influenceUpdate: reason,
        precedentAlignment: j.influence > 85 ? "High" : "Moderate"
      };
    });

    setDeltaUpdatesLog(JSON.stringify(deltas, null, 2));
  };

  // Reset the debate completely
  const handleResetDebate = () => {
    setStage("setup");
    setDeliberations({} as any);
    setChallenges([]);
    setSynthesis(null);
    setSelectedInspectJuror(null);
    setDeltaUpdatesLog("");
    addLog("SYSTEM", "Debate state reset fully. Ready for new configuration.", "info");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Title Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-950/50 rounded-xl border border-rose-800/40 text-rose-500 shadow-lg shadow-rose-950/20">
              <Gavel className="w-6 h-6 animate-pulse" id="gavel-icon-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-mono">JuryAI</h1>
                <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded">v1.0.0</span>
              </div>
              <p className="text-xs text-slate-400">Metacognitive Multi-Agent Debate Simulation & Analysis Suite</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {stage !== "setup" && (
              <button 
                onClick={handleResetDebate}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
                id="btn-reset-session"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Session
              </button>
            )}

            <div className="flex items-center gap-2 text-[11px] font-mono bg-slate-900/60 text-slate-400 border border-slate-800/80 rounded-lg px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DEV PORTAL ON 3000</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Setup & Input Panel */}
        <section className="lg:col-span-4 flex flex-col gap-6" id="panel-debate-setup">
          
          {/* Proposition Input Card */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-rose-500" />
                <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase font-mono">The Proposition</h2>
              </div>
              <span className="text-xs text-slate-500">Structured Trial</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 font-mono">Query Prompt Under Stress-Test</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={stage !== "setup"}
                rows={5}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-3 text-xs leading-relaxed focus:outline-none focus:border-rose-800 resize-none disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                placeholder="Submit your complex retail corporate pricing policy or idea to the debate jury room..."
                id="proposition-textarea"
              ></textarea>
            </div>

            {/* Historical context metrics */}
            <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-lg flex flex-col gap-2 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>Cognitive Bias Variance</span>
                <span className="text-rose-400 font-mono">0.27 (Optimal)</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Precedent Alignments</span>
                <span className="text-sky-400 font-mono">147 stored trials</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Contradiction Warning</span>
                <span className="text-amber-500 font-mono">High Risk Stance</span>
              </div>
            </div>
          </div>

          {/* Roster Config Card */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase font-mono">Jury Roster</h3>
              </div>
              <span className="text-xs text-slate-400">{selectedJurors.length}/6 Active</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enable the multi-agent personas to deliberate on this inquiry. Selected jurors run concurrent peer analysis.
            </p>

            <div className="flex flex-col gap-2" id="juror-selection-container">
              {ALL_JURORS.map((j) => {
                const isActive = selectedJurors.includes(j.id);
                return (
                  <button
                    key={j.id}
                    onClick={() => handleToggleJuror(j.id)}
                    disabled={stage !== "setup"}
                    className={`flex items-center justify-between text-left p-2.5 rounded-lg border transition-all text-xs ${
                      isActive 
                        ? "bg-slate-900/90 border-slate-700 hover:border-slate-600 cursor-pointer" 
                        : "bg-slate-950/40 border-slate-900/80 opacity-50 hover:opacity-75"
                    } ${stage !== "setup" ? "opacity-90 hover:border-slate-800 cursor-not-allowed" : ""}`}
                    id={`toggle-juror-${j.id}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-rose-500 animate-pulse" : "bg-slate-700"}`}></span>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          {j.name}
                          <span className="text-[10px] font-mono text-slate-500">({j.id})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">{j.role}</div>
                      </div>
                    </div>
                    {isActive ? (
                      <Check className="w-4 h-4 text-rose-500" />
                    ) : (
                      <span className="text-[10px] text-slate-600 font-mono">Offline</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Trigger Commands */}
            <div className="flex flex-col gap-2 mt-2">
              {stage === "setup" ? (
                <>
                  <button
                    onClick={handleExecuteAIDeliberation}
                    disabled={isLoading}
                    className="w-full bg-rose-800 hover:bg-rose-700 active:bg-rose-900 text-white font-medium text-xs py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20 transition-all cursor-pointer"
                    id="btn-run-live-ai"
                  >
                    <Cpu className="w-4 h-4" />
                    {isLoading ? "Deliberating..." : "Execute Real-time AI Deliberation"}
                  </button>

                  <button
                    onClick={runSimulatedDeliberation}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs py-2.5 rounded-lg border border-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    id="btn-run-demo-sim"
                  >
                    <Play className="w-3.5 h-3.5 text-sky-400" />
                    Run Demo Simulated Trial
                  </button>
                </>
              ) : (
                <div className="bg-slate-950 border border-slate-900 p-3 rounded-lg text-center">
                  <span className="text-xs text-rose-400 font-mono font-semibold uppercase animate-pulse">
                    Stage 1 Active
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Deliberations locked. Proceed with Cross Examination or Synthesis evaluation on the right side.
                  </p>
                </div>
              )}
            </div>
          </div>
          
        </section>

        {/* Right Side: Interactive Debate Chambers */}
        <section className="lg:col-span-8 flex flex-col gap-6" id="panel-debate-chamber">
          
          {/* Simulation Progress State Indicator */}
          {isLoading && (
            <div className="bg-rose-950/20 border border-rose-900/40 text-xs py-3 px-4 rounded-xl flex items-center justify-between text-rose-300">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
                <span>{currentProgressText || "Processing neural weights..."}</span>
              </div>
              <span className="font-mono text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-400 border border-rose-800/40">LATENCY ACTIVE</span>
            </div>
          )}

          {/* Nav Tabs */}
          <div className="flex border-b border-slate-900 bg-slate-950/40 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("deliberation")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "deliberation" 
                  ? "bg-slate-900 text-white border-b-2 border-rose-500" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="tab-deliberations"
            >
              <Users className="w-3.5 h-3.5" />
              1. Juror Deliberations
            </button>
            <button
              onClick={() => setActiveTab("crossexam")}
              disabled={stage === "setup"}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 ${
                stage === "setup" ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              } ${
                activeTab === "crossexam" 
                  ? "bg-slate-900 text-white border-b-2 border-rose-500" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="tab-cross-examinations"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              2. Cross Examination
            </button>
            <button
              onClick={() => setActiveTab("synthesis")}
              disabled={stage === "setup"}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 ${
                stage === "setup" ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              } ${
                activeTab === "synthesis" 
                  ? "bg-slate-900 text-white border-b-2 border-rose-500" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="tab-judge-synthesis"
            >
              <Gavel className="w-3.5 h-3.5" />
              3. Consensus Report
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "metrics" 
                  ? "bg-slate-900 text-white border-b-2 border-rose-500" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
              id="tab-weight-metrics"
            >
              <Terminal className="w-3.5 h-3.5" />
              Runtime Logs
            </button>
          </div>

          {/* TAB CONTENT: DELIBERATION GRID */}
          {activeTab === "deliberation" && (
            <div className="flex flex-col gap-6">
              {stage === "setup" ? (
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-full">
                    <Scale className="w-8 h-8 text-slate-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-slate-300">Jury Room Currently Dormant</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                      Select your trial jury roster on the left, then click <strong>AI Deliberation</strong> or <strong>Demo Simulation</strong> to trigger Stage 1 evaluation.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedJurors.map((jid) => {
                    const j = ALL_JURORS.find(item => item.id === jid)!;
                    const predelib = deliberations[jid];
                    const isCompleted = !!predelib;

                    return (
                      <div 
                        key={jid} 
                        className={`bg-slate-900/30 border rounded-xl p-5 flex flex-col gap-3 transition-all ${
                          selectedInspectJuror === jid ? "border-rose-800 ring-1 ring-rose-955 bg-rose-950/5" : "border-slate-900"
                        }`}
                        id={`juror-card-${jid}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${j.avatar} border`}>
                              {j.id.substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-200 text-xs">{j.name}</div>
                              <div className="text-[10px] text-slate-400">{j.role}</div>
                            </div>
                          </div>
                          
                          <span className={`text-[9px] px-2 py-0.5 rounded font-mono border ${
                            isCompleted 
                              ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/40" 
                              : "bg-amber-950/60 text-amber-300 border-amber-800/40 animate-pulse"
                          }`}>
                            {isCompleted ? "STANCE READY" : "PONDERING"}
                          </span>
                        </div>

                        {/* Stated stance statement */}
                        <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-950">
                          {isCompleted ? (
                            <div className="line-clamp-4 text-slate-300 whitespace-pre-wrap">
                              {predelib.content.replace(/###/g, "").replace(/\*\*+/g, "")}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1.5 py-4">
                              <span className="text-[10px] text-slate-500 text-center font-mono animate-pulse">Formulating arguments under systemic bias constraints...</span>
                              <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 rounded-full w-2/3 animate-ping"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Juror Specific cognitive bias info */}
                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span>Influence Weight: <strong>{j.influence}%</strong></span>
                          {isCompleted && (
                            <button
                              onClick={() => setSelectedInspectJuror(jid)}
                              className="text-rose-400 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                              id={`inspect-button-${jid}`}
                            >
                              Expand Analysis &rarr;
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Inspect Stance Modal / Detail View */}
              {selectedInspectJuror && deliberations[selectedInspectJuror] && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                        ALL_JURORS.find(j => j.id === selectedInspectJuror)?.avatar
                      } border`}>
                        {selectedInspectJuror.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">
                          {ALL_JURORS.find(j => j.id === selectedInspectJuror)?.name} Stance
                        </h4>
                        <p className="text-xs text-slate-400">
                          {ALL_JURORS.find(j => j.id === selectedInspectJuror)?.role}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedInspectJuror(null)}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      id="close-inspector"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs leading-relaxed text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-850 overflow-y-auto max-h-[400px] whitespace-pre-wrap">
                    {deliberations[selectedInspectJuror].content}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-950/60 p-3 rounded-lg">
                    <span>Active Word Count: <strong>{deliberations[selectedInspectJuror].wordCount} words</strong></span>
                    <span>Provisional Bias Consensus Match: <strong className="text-rose-400">Stable</strong></span>
                  </div>
                </div>
              )}

              {stage === "crossexam" && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveTab("crossexam");
                      addLog("SYSTEM", "Prompted Stage 2 Cross examination workspace.", "info");
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                    id="btn-goto-stage2"
                  >
                    Proceed to Stage 2: Cross Examinations
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: CROSS EXAMINATION */}
          {activeTab === "crossexam" && (
            <div className="flex flex-col gap-6">
              
              {/* Challenge Trigger Box */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">Stage 2: Instigate Friction Challenge Matches</h3>
                </div>

                <p className="text-xs text-slate-400">
                  Select a challenger juror and an targeted target juror. Clicking the match command sends the target's independent statement to the challenger, who will issue a strong logical attack. The target then defending their thesis.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-mono uppercase">1. Challenger Juror</label>
                    <select
                      value={challengerId}
                      onChange={(e) => setChallengerId(e.target.value as JurorId)}
                      className="bg-slate-950 text-slate-300 border border-slate-800 p-2.5 rounded-lg text-xs"
                      id="select-challenger"
                    >
                      {selectedJurors.map(jid => (
                        <option key={jid} value={jid}>Juror {jid} ({ALL_JURORS.find(j=>j.id===jid)?.name})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-mono uppercase">2. Target Juror</label>
                    <select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value as JurorId)}
                      className="bg-slate-950 text-slate-300 border border-slate-800 p-2.5 rounded-lg text-xs"
                      id="select-target"
                    >
                      {selectedJurors.map(jid => (
                        <option key={jid} value={jid}>Juror {jid} ({ALL_JURORS.find(j=>j.id===jid)?.name})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleExecuteCrossExamination}
                    disabled={isLoading}
                    className="flex-1 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                    id="btn-clash-trigger"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    Engage Cross Examination Matchup
                  </button>

                  <button
                    onClick={handleLoadSimulationChallenges}
                    className="bg-slate-950 px-4 py-2.5 hover:bg-slate-900 text-slate-400 hover:text-slate-300 border border-slate-850 rounded-lg text-xs transition-all cursor-pointer font-mono"
                    id="btn-load-clash-presets"
                  >
                    Load Baseline Clash Matrix
                  </button>
                </div>
              </div>

              {/* Clash Timeline / Outputs */}
              {challenges.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Active Debate Clashes</h4>
                  
                  {challenges.map((c, idx) => {
                    const challengerObj = ALL_JURORS.find(j => j.id === c.challengerId);
                    const targetObj = ALL_JURORS.find(j => j.id === c.targetId);

                    return (
                      <div 
                        key={idx} 
                        className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 flex flex-col gap-4"
                        id={`clash-block-${idx}`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-850 pb-2 text-[10px] font-mono">
                          <span className="text-slate-400">CLASH CHALLENGE MATCH #{idx + 1}</span>
                          <span className="text-rose-400">RESOLVED REBUTTAL</span>
                        </div>

                        {/* Challenger's Objection */}
                        <div className="flex gap-3 items-start">
                          <div className={`px-2 py-1 rounded text-[9px] font-mono font-bold ${challengerObj?.avatar} mt-1 shrink-0`}>
                            {c.challengerId}
                          </div>
                          <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-900/60 flex-grow">
                            <span className="text-[10px] font-mono font-bold text-rose-300 block mb-1">Objection Stance:</span>
                            <p className="text-xs text-slate-200 leading-relaxed italic">
                              "{c.challenge}"
                            </p>
                          </div>
                        </div>

                        {/* Target's Defense */}
                        {c.rebuttal && (
                          <div className="flex gap-3 items-start pl-6 border-l border-rose-955">
                            <div className={`px-2 py-1 rounded text-[9px] font-mono font-bold ${targetObj?.avatar} mt-1 shrink-0`}>
                              {c.targetId}
                            </div>
                            <div className="bg-rose-950/5 p-3.5 rounded-lg border border-rose-955/20 flex-grow">
                              <span className="text-[10px] font-mono font-bold text-sky-300 block mb-1">Defense Rebuttal:</span>
                              <p className="text-xs text-slate-200 leading-relaxed italic">
                                "{c.rebuttal}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-900/10 border border-slate-900 rounded-xl p-8 text-center text-slate-500 text-xs leading-relaxed">
                  No active clashes have been run yet. Select your Challenger & Target agents above and trigger a clash, or load presets to preview.
                </div>
              )}

              {/* Next Step Trigger */}
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleExecuteSynthesis}
                  disabled={isLoading}
                  className="bg-rose-800 hover:bg-rose-700 active:bg-rose-900 text-white font-semibold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  id="btn-goto-stage3"
                >
                  <Gavel className="w-4 h-4 animate-bounce" />
                  Initiate Stage 3: Deliberated Synthesis Report
                </button>
              </div>

            </div>
          )}

          {/* TAB CONTENT: FINAL SYNTHESIS & JUDGE REPORT */}
          {activeTab === "synthesis" && (
            <div className="flex flex-col gap-6">
              
              {!synthesis ? (
                <div className="bg-slate-900/10 border border-slate-900 rounded-xl p-8 text-center text-slate-500 text-xs">
                  Synthesis report is empty. Please complete independent deliberations and trigger the "Final Synthesis" command down under Stage 2 to load results.
                </div>
              ) : (
                <div className="flex flex-col gap-6" id="synthesis-results-block">
                  
                  {/* Verdict Header Status Card */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">
                      {/* Metric Gauge */}
                      <div className="relative w-20 h-20 bg-slate-950 border-3 border-rose-900/60 rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-3xl font-mono font-black text-rose-500">{synthesis.verdictScore}</span>
                        <span className="text-[9px] text-slate-500 font-mono tracking-wider">/ 10 Score</span>
                      </div>

                      <div>
                        <span className="text-[10px] bg-rose-950 border border-rose-800 text-rose-300 font-mono px-2 py-0.5 rounded uppercase">
                          {synthesis.verdictLabel}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">Consensus Verdict Stance</h3>
                        <p className="text-xs text-slate-400">Synthesized forecast alignment across scheduled cognitive bias anchors.</p>
                      </div>
                    </div>

                    <div className="bg-slate-950 px-4 py-3 rounded-lg text-center border border-slate-850">
                      <span className="text-[10px] text-slate-500 font-mono block">JURY ALIGNMENT</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">92% Metacognitive Consensus</span>
                    </div>
                  </div>

                  {/* Core Written Summary */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">The Foreman's Meta-Synthesis Summary</h4>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap card-paragraph font-sans">
                      {synthesis.summary}
                    </p>
                  </div>

                  {/* Bullet Lists Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Consensus Agreements */}
                    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5 mb-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">Areas of Absolute Agreement</h4>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {synthesis.agreements.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">&#10004;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dissenting views - PIPELINE STEP 5 requirements */}
                    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5 mb-3">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                        <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">Dissent Map & Clashes</h4>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {synthesis.disagreements.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                            <span className="text-amber-500 mt-1">&#10037;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Vulnerability metrics */}
                  <div className="bg-orange-950/10 border border-orange-900/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 pb-2 text-orange-400">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="text-xs font-mono font-bold uppercase">Systemic Black Swan & Tail Risks Identified</h4>
                    </div>
                    <ul className="flex flex-col gap-2 mt-2">
                      {synthesis.vulnerabilities.map((v, idx) => (
                        <li key={idx} className="text-xs text-orange-200 leading-relaxed flex items-start gap-2">
                          <span className="text-orange-500">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Delta update memory output - PIPELINE STEP 6 requirements */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 mt-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs">
                        <Terminal className="w-4 h-4" />
                        <span>PIPELINE STEP 6: DELTA MEMORY STATE UPDATE</span>
                      </div>
                      <span className="text-[10px] bg-slate-950 text-slate-500 px-2 py-0.5 rounded font-mono">APPEND AS RAW JSON</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      This JSON delta config defines how individual juror weights adjust recursively for the next query cycle, targeting personas whose arguments generated high value or constructive team consensus shifts of the trial.
                    </p>

                    <div className="relative">
                      <textarea
                        readOnly
                        value={deltaUpdatesLog}
                        rows={12}
                        className="w-full bg-slate-950 text-emerald-400 font-mono text-[11px] p-4 rounded-lg border border-slate-900 whitespace-pre focus:outline-none"
                        id="delta-updates-output"
                      ></textarea>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/80 p-3 rounded-lg border border-slate-900 text-[10px] text-slate-500 font-mono">
                      <span>Pivot Position: <strong>SAFETY_GUARDIAN & SKEPTIC</strong></span>
                      <span>Contradiction Pattern: <strong>Consumer Surplus Exhaustion Loop</strong></span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: RUNTIME LOGS */}
          {activeTab === "metrics" && (
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-rose-500" />
                  <h3 className="text-xs font-mono font-semibold uppercase text-slate-200">Active Orchestration Event Stream</h3>
                </div>
                <button
                  onClick={() => setLogs([])}
                  className="text-[10px] text-slate-500 hover:text-slate-300 font-mono uppercase cursor-pointer"
                >
                  Clear Logs
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] flex flex-col gap-2 max-h-[450px] overflow-y-auto">
                {logs.length > 0 ? (
                  logs.map((log) => {
                    const colorClass = 
                      log.type === "success" ? "text-emerald-400" :
                      log.type === "warning" ? "text-amber-400" :
                      log.type === "error" ? "text-rose-400" : "text-sky-300";

                    return (
                      <div key={log.id} className="border-b border-slate-900/60 pb-1.5 leading-relaxed">
                        <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                        <span className="text-rose-500 font-bold mr-2">[{log.source}]</span>
                        <span className={colorClass}>{log.message}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-slate-600 py-4 font-mono">Event log is empty.</div>
                )}
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Pipeline Weights Settings Debugger</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-slate-400">
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="block text-[9px] text-slate-500">SKEPTIC WEIGHT</span>
                    <span className="text-rose-400 font-semibold">1.10</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="block text-[9px] text-slate-500">SAFETY WEIGHT</span>
                    <span className="text-emerald-400 font-semibold">1.15</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="block text-[9px] text-slate-500">LITERALIST WEIGHT</span>
                    <span className="text-sky-400 font-semibold">0.90</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="block text-[9px] text-slate-500">FIRST PRIN. WEIGHT</span>
                    <span className="text-violet-400 font-bold">1.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-900 py-6 px-6 bg-slate-950 mt-12 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 JuryAI Inc.</span>
            <span>•</span>
            <span>"Twelve Angry Agents" Metacognitive Protocol</span>
          </div>
          <p className="text-slate-600">
            Engineered server-side using Gemini 3.5 models.
          </p>
        </div>
      </footer>
    </div>
  );
}
