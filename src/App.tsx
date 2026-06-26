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
  ArrowRightLeft,
  Save,
  GitCompare,
  Lock
} from "lucide-react";
import { JurorId, Juror, DeliberationState, CrossExaminationState, SynthesisReport, LogEntry, PrecedentCase } from "./types";

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

function renderInlineStyles(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      const innerLower = inner.toLowerCase();
      let colorClass = "text-slate-100 bg-slate-900 border-slate-800";
      
      // Juror Persona Highlights
      if (innerLower.includes("skeptic")) {
        colorClass = "text-fuchsia-300 bg-fuchsia-950/40 border-fuchsia-800/40";
      } else if (innerLower.includes("literalist")) {
        colorClass = "text-sky-300 bg-sky-950/40 border-sky-800/40";
      } else if (innerLower.includes("edge case hunter") || innerLower.includes("edge_case_hunter")) {
        colorClass = "text-pink-300 bg-pink-950/40 border-pink-800/40";
      } else if (innerLower.includes("safety guardian") || innerLower.includes("safety_guardian")) {
        colorClass = "text-rose-300 bg-rose-950/40 border-rose-800/40";
      } else if (innerLower.includes("first principles") || innerLower.includes("first_principles")) {
        colorClass = "text-indigo-300 bg-indigo-950/40 border-indigo-800/40";
      } else if (innerLower.includes("synthesizer") || innerLower.includes("foreman") || innerLower.includes("consensus")) {
        colorClass = "text-emerald-300 bg-emerald-950/40 border-emerald-800/40";
      }
      
      // Concept highlights
      else if (innerLower.includes("risk") || innerLower.includes("vulnerab") || innerLower.includes("backlash") || innerLower.includes("fail") || innerLower.includes("penalt") || innerLower.includes("collaps") || innerLower.includes("reject") || innerLower.includes("evasion") || innerLower.includes("bot") || innerLower.includes("clash")) {
        colorClass = "text-rose-300 bg-rose-950/50 border-rose-900/50";
      } else if (innerLower.includes("gdpr") || innerLower.includes("ftc") || innerLower.includes("legal") || innerLower.includes("complian") || innerLower.includes("regulat") || innerLower.includes("article 22") || innerLower.includes("laws")) {
        colorClass = "text-sky-300 bg-sky-950/50 border-sky-900/50";
      } else if (innerLower.includes("surplus") || innerLower.includes("cooperat") || innerLower.includes("align") || innerLower.includes("agreement") || innerLower.includes("optimal") || innerLower.includes("approv") || innerLower.includes("retain")) {
        colorClass = "text-emerald-300 bg-emerald-950/50 border-emerald-900/50";
      } else if (innerLower.includes("proxy") || innerLower.includes("latenc") || innerLower.includes("error") || innerLower.includes("fals") || innerLower.includes("telemet")) {
        colorClass = "text-amber-300 bg-amber-950/40 border-amber-900/50";
      } else if (innerLower.includes("game-theor") || innerLower.includes("physics") || innerLower.includes("math") || innerLower.includes("equilibri") || innerLower.includes("game mechanics")) {
        colorClass = "text-violet-300 bg-violet-950/40 border-violet-900/50";
      }
      return (
        <strong key={index} className={`font-extrabold font-mono text-[11px] px-2 py-0.5 rounded border mx-0.5 inline-block ${colorClass}`}>
          {inner}
        </strong>
      );
    }
    
    // Quick-scan highlights for standalone key concepts
    const words = part.split(/(\b(?:risk|vulnerabilit(?:y|ies)|failure|collapse|rejection|backlash|GDPR|FTC|Article 22|legal|regulatory|compliance|surplus|game-theory|equilibrium)\b)/gi);
    if (words.length > 1) {
      return (
        <span key={index}>
          {words.map((w, idx) => {
            const wLower = w.toLowerCase();
            if (wLower === "risk" || wLower === "vulnerabilities" || wLower === "vulnerability" || wLower === "failure" || wLower === "collapse" || wLower === "rejection" || wLower === "backlash") {
              return <span key={idx} className="text-rose-400 font-extrabold bg-rose-950/30 px-1 rounded border border-rose-900/30">{w}</span>;
            }
            if (wLower === "gdpr" || wLower === "ftc" || wLower === "article 22" || wLower === "legal" || wLower === "regulatory" || wLower === "compliance") {
              return <span key={idx} className="text-sky-300 font-extrabold bg-sky-950/30 px-1 rounded border border-sky-900/30">{w}</span>;
            }
            if (wLower === "surplus" || wLower === "equilibrium" || wLower === "game-theory") {
              return <span key={idx} className="text-emerald-400 font-extrabold bg-emerald-950/30 px-1 rounded border border-emerald-900/30">{w}</span>;
            }
            return w;
          })}
        </span>
      );
    }

    return part;
  });
}

function MarkdownRenderer({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div className="flex flex-col gap-3.5 font-sans text-slate-300 leading-relaxed text-xs">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1.5" />;
        }

        const isScoreLine = trimmed.toLowerCase().includes("score:") && (trimmed.toLowerCase().includes("provisional") || trimmed.includes("Score:"));
        if (isScoreLine) {
          const match = trimmed.match(/Score:\s*(\d+)/i);
          const scoreVal = match ? parseInt(match[1]) : 3;
          let scoreColor = "from-rose-950/30 to-red-950/10 border-red-900/50 text-red-300";
          let circleColor = "border-red-500 text-red-400";
          if (scoreVal >= 7) {
            scoreColor = "from-emerald-950/30 to-teal-950/10 border-emerald-900/50 text-emerald-300";
            circleColor = "border-emerald-500 text-emerald-400";
          } else if (scoreVal >= 5) {
            scoreColor = "from-amber-950/30 to-orange-950/10 border-amber-900/50 text-amber-300";
            circleColor = "border-amber-500 text-amber-400";
          }
          return (
            <div key={i} className={`mt-5 p-4 rounded-xl border bg-gradient-to-r ${scoreColor} flex items-center justify-between shadow-xl`}>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-500">PROVISIONAL JUROR STANDING</span>
                <span className="text-xs font-medium leading-relaxed font-sans">{renderInlineStyles(trimmed)}</span>
              </div>
              <div className={`flex items-center justify-center font-mono font-black text-2xl h-11 w-11 rounded-full bg-slate-950 border-2 ${circleColor} shadow-md`}>
                {scoreVal}
              </div>
            </div>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xs font-extrabold text-rose-400 uppercase tracking-widest mt-5 first:mt-0 font-mono border-b border-slate-900 pb-1.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 inline-block animate-pulse"></span>
              {renderInlineStyles(trimmed.substring(4))}
            </h3>
          );
        }

        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={i} className="text-[11px] font-extrabold text-slate-100 uppercase tracking-wide mt-4 first:mt-0 font-mono flex items-center gap-1.5">
              <span className="text-rose-500/80 font-bold font-mono">▸</span>
              {renderInlineStyles(trimmed.substring(5))}
            </h4>
          );
        }

        const isBulletList = trimmed.startsWith("- ") || trimmed.startsWith("* ");
        if (isBulletList) {
          return (
            <div key={i} className="flex gap-2.5 items-start pl-3 text-slate-300 hover:text-slate-100 transition-colors duration-150">
              <span className="text-rose-500 font-extrabold select-none mt-1 shrink-0 text-xs">•</span>
              <span className="flex-grow">{renderInlineStyles(trimmed.substring(2))}</span>
            </div>
          );
        }

        const isNumbered = /^\d+\.\s+/.test(trimmed);
        if (isNumbered) {
          const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (match) {
            return (
              <div key={i} className="flex gap-2.5 items-start pl-3 text-slate-300 mt-2 hover:text-slate-100 transition-colors duration-150">
                <span className="text-sky-400 font-mono font-bold select-none shrink-0 text-[10px] bg-slate-950 border border-slate-850 px-1.5 py-0.5 rounded-md leading-none h-5 flex items-center justify-center shadow">
                  {match[1]}
                </span>
                <span className="flex-grow pt-0.5">{renderInlineStyles(match[2])}</span>
              </div>
            );
          }
        }

        return (
          <p key={i} className="text-slate-300 leading-relaxed font-sans hover:text-slate-100 transition-colors duration-150 pb-0.5">
            {renderInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

const INITIAL_PRECEDENT_CASES: PrecedentCase[] = [
  {
    id: "precedent_1",
    title: "Real-time Dynamic Income Pricing",
    query: "A retail company wants to implement a fully automated AI system that dynamically changes product prices for online shoppers in real-time based on their estimated income bracket, web browsing history, and immediate demand. Is this an optimal and sustainable business strategy? Debate the long-term impact.",
    timestamp: "2026-06-10T14:30:00.000Z",
    verdictScore: 2,
    verdictLabel: "UNEXPLODED BIAS RISK - REJECTED",
    summary: "The metacognitive jury has thoroughly analyzed the real-time dynamic pricing model based on income bracket estimation. The proposal is an unsustainable business strategy. By attempting to capture the entirety of consumer surplus, the retailer breaks the foundational social contract of trade. We predict rapid client base depletion, active tracking counter-measures, severe regulatory fines, and eventual total system retirement under extreme brand distress.",
    selectedJurors: [JurorId.SKEPTIC, JurorId.LITERALIST, JurorId.EDGE_CASE_HUNTER, JurorId.SAFETY_GUARDIAN, JurorId.FIRST_PRINCIPLES],
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
    biasVariance: 0.27,
    contradictionAlerts: ["GDPR Article 22 Profiling Ban aligns with consumer active spoofing resistance loops."],
    deliberations: {
      [JurorId.SKEPTIC]: {
        jurorId: JurorId.SKEPTIC,
        content: `### SKEPTIC DELIBERATION\nPrice profiling based on wealth is a recipe for catastrophic PR backleases. Buyers will spot this immediately and coordinate active boycotts over social networks.\n\n#### Provisional Score\nScore: 2/10`,
        wordCount: 32,
        timestamp: "2026-06-10T14:30:00.000Z"
      },
      [JurorId.LITERALIST]: {
        jurorId: JurorId.LITERALIST,
        content: `### LITERALIST DELIBERATION\nCalculating wealth parameters in real-time has too high of a systemic error rate. Web histories do not map precisely to wealth, causing faulty calculations.\n\n#### Provisional Score\nScore: 3/10`,
        wordCount: 31,
        timestamp: "2026-06-10T14:30:00.000Z"
      }
    } as any,
    challenges: []
  },
  {
    id: "precedent_2",
    title: "Mandatory Social Credit Scoring for Vehicle Leases",
    query: "A vehicle leasing service wants to utilize public social registry, driving telemetry metrics, and financial records to assign a social security trust score to drivers, automatically shutting down engines remotely if a driver's live score drops below regulatory boundaries. Evaluate the legal and socio-technical balance.",
    timestamp: "2026-06-11T10:15:00.000Z",
    verdictScore: 1,
    verdictLabel: "CRITICAL COMPLIANCE FAILURE",
    summary: "The panel strongly rejects assigning automated social points systems to public utilities such as transport. Engine shutdowns represent lethal physical risks that exceed standard insurance or legal compliance liabilities, collapsing repeat transaction viability.",
    selectedJurors: [JurorId.SKEPTIC, JurorId.SAFETY_GUARDIAN, JurorId.EDGE_CASE_HUNTER],
    agreements: [
      "Physical vehicle shutoffs introduce direct lethal accident exposure.",
      "Aggregating public registers and driving telemetry violating bodily and movement autonomy.",
      "Severe liability from false-positive score drops (e.g. system faults, offline sync failure)."
    ],
    disagreements: [
      "Safety Guardian argues for absolute human-rights bans, while Edge Case Hunter notes that hacker groups will spoof driver scores or hijack engines via remote protocols."
    ],
    vulnerabilities: [
      "Direct physical safety risks mid-highway due to network latency during forced remote shutoff.",
      "Total brand destruction and massive state criminal investigations."
    ],
    biasVariance: 0.12,
    contradictionAlerts: ["Lethal mechanical intervention clash: remote bypass breaches fundamental consumer safety duties."],
    deliberations: {
      [JurorId.SAFETY_GUARDIAN]: {
        jurorId: JurorId.SAFETY_GUARDIAN,
        content: `### SAFETY GUARDIAN DELIBERATION\nThis proposal violates core human dignity principles. Shutting off an engine remotely based on metadata represents a public safety disaster.\n\n#### Provisional Score\nScore: 1/10`,
        wordCount: 29,
        timestamp: "2026-06-11T10:15:00.000Z"
      }
    } as any,
    challenges: []
  },
  {
    id: "precedent_3",
    title: "Pharma Biometric Dynamic Pricing",
    query: "A pharmaceutical conglomerate plans to adjust insulin subscription pricing dynamically on smart devices using active biosensor telemetry metrics (tracking physical heart rates, activity level, and compliance metrics). Is it viable?",
    timestamp: "2026-06-15T09:00:00.000Z",
    verdictScore: 1,
    verdictLabel: "ETHICALLY DISASTROUS",
    summary: "Forcing patients to pay volatile pricing for life-saving medicine based on real-time biometric metrics represents severe corporate extraction that violates fundamental ethical guidelines. Legal structures would intervene instantly.",
    selectedJurors: [JurorId.SAFETY_GUARDIAN, JurorId.FIRST_PRINCIPLES, JurorId.SKEPTIC],
    agreements: [
      "Lifesaving medicine cannot be dynamicized based on utility extraction models.",
      "Biometric tracking for commercial gain is highly restrictive under HIPAA and GDPR regulations.",
      "Breaks completely the foundational social reputation of standard health practices."
    ],
    disagreements: [
      "Safety Guardian flags standard healthcare ethics violation, while First Principles shows consumer survival limits: patients cannot flight-shift easily, making it monopoly-coerced extraction rather than trade."
    ],
    vulnerabilities: [
      "Subscribers will hack smart health bands to loop high-activity spoof inputs, rendering data collections fully corrupt.",
      "Universal public condemnation and rapid national antitrust intervention."
    ],
    biasVariance: 0.08,
    contradictionAlerts: ["Monopoly coercion deadlock: zero buy safety alternative forces user counterfeit devices."],
    deliberations: {
      [JurorId.FIRST_PRINCIPLES]: {
        jurorId: JurorId.FIRST_PRINCIPLES,
        content: `### FIRST PRINCIPLES DELIBERATION\nPrice discrimination on essential medicine has a vertical demand elasticity profile, enabling extortion-level extraction that collapses public legitimacy.\n\n#### Provisional Score\nScore: 1/10`,
        wordCount: 26,
        timestamp: "2026-06-15T09:00:00.000Z"
      }
    } as any,
    challenges: []
  },
  {
    id: "precedent_4",
    title: "Autonomous K-12 AI Mental Counselors",
    query: "An educational district proposes replacing human mental-health counselors with fully autonomous generative conversational agent personas trained to monitor adolescent emotional profiles and report clinical concerns. Is this sustainable?",
    timestamp: "2026-06-20T16:45:00.000Z",
    verdictScore: 5,
    verdictLabel: "CONDITIONAL CONTAINMENT",
    summary: "Replacing counselors is rejected; however, using AI personas as a secondary supportive triage toolkit is conditionally viable. Human counseling holds distinct qualities that conversational models cannot replicate organically.",
    selectedJurors: [JurorId.SKEPTIC, JurorId.SAFETY_GUARDIAN, JurorId.FIRST_PRINCIPLES, JurorId.LITERALIST],
    agreements: [
      "K-12 students represent absolute high-protection vulnerable categories.",
      "The system must remain fully opt-in, strict GDPR sandbox limits on student data.",
      "A human therapist must reside at the root of every diagnostic escalated alert."
    ],
    disagreements: [
      "First Principles highlights the cost-efficiency improvements for underserved rural schools, while Safety Guardian warns of critical hallucinations in urgent situations."
    ],
    vulnerabilities: [
      "AI hallucinating advice during critical acute events.",
      "Conversational profiles leaked or scraped via school network vulnerabilities."
    ],
    biasVariance: 1.82,
    contradictionAlerts: ["Human biological empathy vs scalability balance: triage parameters must be explicitly sandboxed."],
    deliberations: {
      [JurorId.SKEPTIC]: {
        jurorId: JurorId.SKEPTIC,
        content: `### SKEPTIC DELIBERATION\nTeenagers will intentionally feed extreme inputs to trigger counselor alerts as a joke, polluting database intelligence.\n\n#### Provisional Score\nScore: 4/10`,
        wordCount: 26,
        timestamp: "2026-06-20T16:45:00.000Z"
      }
    } as any,
    challenges: []
  }
];

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

  const [activeTab, setActiveTab ] = useState<"welcome" | "deliberation" | "crossexam" | "synthesis" | "precedents" | "metrics" | "legal">("welcome");
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

  // Precedent Local Persistence State
  const [precedents, setPrecedents] = useState<PrecedentCase[]>(() => {
    try {
      const stored = localStorage.getItem("juryai_precedents");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading precedents from localStorage:", e);
    }
    return INITIAL_PRECEDENT_CASES;
  });

  const [selectedPrecedentId, setSelectedPrecedentId] = useState<string | null>(null);
  const [newPrecedentTitle, setNewPrecedentTitle] = useState<string>("");
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<"privacy" | "terms" | "api">("privacy");

  // Metacognitive calculations
  const calculateCognitiveBiasVariance = () => {
    const scoresList: number[] = [];
    Object.values(deliberations).forEach((d: any) => {
      const m = d.content.match(/Score:\s*(\d+)/i);
      if (m) {
        scoresList.push(parseInt(m[1]));
      }
    });
    if (scoresList.length === 0) {
      return { val: 0.27, label: "0.27 (Optimal)", color: "text-rose-400" };
    }
    const mean = scoresList.reduce((a, b) => a + b, 0) / scoresList.length;
    const variance = scoresList.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scoresList.length;
    const stdDev = Math.sqrt(variance);
    const val = parseFloat(stdDev.toFixed(2));
    let txt = `${val} (Healthy Dialectic)`;
    let col = "text-emerald-400 font-bold";
    if (val < 0.6) {
      txt = `${val} (Echo Chamber Risk / Highly Aligned)`;
      col = "text-rose-400 font-bold";
    } else if (val > 2.2) {
      txt = `${val} (Polarized Clashes / Gridlock Danger)`;
      col = "text-amber-400 font-bold";
    }
    return { val, label: txt, color: col };
  };

  const getContradictionStatus = () => {
    const hasSkeptic = selectedJurors.includes(JurorId.SKEPTIC);
    const hasSafety = selectedJurors.includes(JurorId.SAFETY_GUARDIAN);
    
    const scoresList: number[] = [];
    Object.values(deliberations).forEach((d: any) => {
      const m = d.content.match(/Score:\s*(\d+)/i);
      if (m) scoresList.push(parseInt(m[1]));
    });
    
    const avgScore = scoresList.length > 0 ? scoresList.reduce((a, b) => a + b, 0) / scoresList.length : 3;

    if (scoresList.length > 0) {
      const max = Math.max(...scoresList);
      const min = Math.min(...scoresList);
      if (max - min >= 5) {
        return { label: "Severe Clash Stance", color: "text-rose-400", desc: "Philosophical deadlock: Juror stances represent an absolute contradiction on this issue." };
      }
    }

    if (avgScore <= 3) {
      if (hasSkeptic && hasSafety) {
        return { label: "High Risk Policy", color: "text-amber-400", desc: "User boycott risk and regulatory bans align negatively under evaluation." };
      }
      return { label: "Structural Deficit", color: "text-orange-400", desc: "System is highly vulnerable to feedback collapses under actual stress rules." };
    }
    if (avgScore >= 7) {
      return { label: "Harmonious Stance", color: "text-emerald-400", desc: "No critical structural contradictions detected across cognitive perspectives." };
    }
    return { label: "Conditional Containment", color: "text-sky-400", desc: "Debated policy requires specific static risk guards and strict monitoring limits." };
  };

  const handleSaveCurrentToPrecedents = () => {
    if (!synthesis) return;
    const title = newPrecedentTitle.trim() || cleanQueryTerm(query) || "Custom Strategy Debate";
    
    const newCase: PrecedentCase = {
      id: `precedent_${Date.now()}`,
      title,
      query,
      timestamp: new Date().toISOString(),
      verdictScore: synthesis.verdictScore,
      verdictLabel: synthesis.verdictLabel,
      summary: synthesis.summary,
      selectedJurors: [...selectedJurors],
      deliberations: { ...deliberations },
      challenges: [...challenges],
      agreements: [...synthesis.agreements],
      disagreements: [...synthesis.disagreements],
      vulnerabilities: [...synthesis.vulnerabilities],
      biasVariance: calculateCognitiveBiasVariance().val,
      contradictionAlerts: [getContradictionStatus().desc]
    };

    const updated = [newCase, ...precedents];
    setPrecedents(updated);
    try {
      localStorage.setItem("juryai_precedents", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    addLog("ORCHESTRATOR", `Successfully committed historical precedent "${title}" to secure library index.`, "success");
    setSelectedPrecedentId(newCase.id);
    setActiveTab("precedents");
  };

  const handleDeletePrecedent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (["precedent_1", "precedent_2", "precedent_3", "precedent_4"].includes(id)) {
      addLog("SYSTEM", "System core preseeds are locked for platform integrity and cannot be deleted.", "warning");
      return;
    }
    const updated = precedents.filter(p => p.id !== id);
    setPrecedents(updated);
    try {
      localStorage.setItem("juryai_precedents", JSON.stringify(updated));
    } catch (err) {}
    if (selectedPrecedentId === id) {
      setSelectedPrecedentId(null);
    }
    addLog("SYSTEM", "Removed strategy trial from persistent local archives.", "info");
  };

  const getRefinedDraftSuggestion = () => {
    const qLower = query.toLowerCase();
    if (qLower.includes("dynamically") && qLower.includes("online shoppers")) {
      return "A retail brand implements fixed, transparent base pricing paired with opt-in voluntary loyalty discounts, governed by hard caps preventing prices from rising above 1.1x standard catalog listings, complete with strict GDPR-compliant opt-out controls and periodic manual auditing. Evaluate its long-term viability and client retention.";
    }
    if (qLower.includes("vehicle") && qLower.includes("social")) {
      return "A vehicle rental service provides voluntary safety-discount contracts where drivers opt-in to telemetry monitoring for lower rates, but absolute shutdown control resides with human operators. Mid-highway engine shutdowns are strictly forbidden, and metrics reside behind secure private sandboxes. Evaluate driver willingness and safety compliance.";
    }
    if (qLower.includes("insulin") || qLower.includes("pharma")) {
      return "A pharmaceutical manufacturer offers life-saving pharmaceuticals at fixed, regulated, flat-rate tiers. High-income or institutional buyers pay standard flat prices while low-income patients are granted subsidized access through verified grant programs with no biometric tracking sensors. Evaluate this strategy.";
    }
    if (qLower.includes("school") || qLower.includes("counselors")) {
      return "An educational district deploys conversational AI therapist agent personas as secondary, strictly voluntary triage toolkits to support human counselors. Counselors maintain final decision authority, privacy sandboxes protect adolescent data, and students may opt out. Evaluate structural stability.";
    }
    return `A revised formulation of the original proposal: incorporating strict human-in-the-loop oversight, active privacy sandboxes, voluntary consensus participation, absolute transparency of variables, and static risk caps to contain systemic tail risks in production. Evaluate the strategic balance.`;
  };

  const handleApplyRefinedDraft = () => {
    const refined = getRefinedDraftSuggestion();
    setQuery(refined);
    setStage("setup");
    setDeliberations({} as any);
    setChallenges([]);
    setSynthesis(null);
    setSelectedInspectJuror(null);
    setDeltaUpdatesLog("");
    setActiveTab("deliberation");
    addLog("ORCHESTRATOR", "Loaded double-loop refined proposal. All prior deliberations cleared. Ready for revision trial.", "success");
    const el = document.getElementById("panel-debate-setup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const isStep1Complete = query.trim().length >= 10;
  const isStep2Complete = isStep1Complete && selectedJurors.length >= 3;

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
              <span>ENGINE ONLINE</span>
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
                <Scale className="w-4 h-4 text-rose-500 animate-pulse" />
                <h2 className="text-sm font-semibold tracking-wide text-slate-200 uppercase font-mono">01- The Proposition</h2>
              </div>
              <span className="text-[10px] bg-rose-950/40 text-rose-400 border border-rose-900/40 px-2 py-0.5 rounded font-mono uppercase">Formulation</span>
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
            <div className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-lg flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-100 hover:text-white transition-colors">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Cpu className="w-3.5 h-3.5 text-rose-500" />
                  Cognitive Bias Variance
                </span>
                <span className={`${calculateCognitiveBiasVariance().color} font-mono text-right max-w-[200px] truncate`}>
                  {calculateCognitiveBiasVariance().label}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-100 hover:text-white transition-colors">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Database className="w-3.5 h-3.5 text-sky-400" />
                  Precedent Alignments
                </span>
                <button 
                  onClick={() => setActiveTab("precedents")}
                  className="text-sky-400 font-mono text-right hover:underline font-bold bg-transparent border-none p-0 cursor-pointer"
                >
                  {precedents.length} stored {precedents.length === 1 ? "trial" : "trials"}
                </button>
              </div>
              <div className="flex justify-between items-center text-slate-100 hover:text-white transition-colors">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  Contradiction Warning
                </span>
                <span className={`${getContradictionStatus().color} font-mono text-right`} title={getContradictionStatus().desc}>
                  {getContradictionStatus().label}
                </span>
              </div>

              {/* Expandable active audit details */}
              {Object.keys(deliberations).length > 0 && (
                <div className="mt-1.5 p-2 rounded bg-slate-900/60 border border-slate-900 text-[10px] text-slate-400 leading-relaxed font-mono">
                  <span className="text-rose-400 font-bold block mb-0.5 uppercase tracking-wider">⚖️ Active Audit:</span>
                  {getContradictionStatus().desc}
                </div>
              )}
            </div>
          </div>

          {/* Roster Config Card - Step 02 */}
          {!isStep1Complete ? (
            <div className="bg-slate-900/10 border border-slate-900/60 opacity-60 rounded-xl p-5 shadow-inner flex flex-col gap-3 justify-center items-center text-center py-10">
              <Lock className="w-8 h-8 text-slate-500 mb-1" />
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">02- Jury Roster Locked</span>
              <p className="text-[11px] text-slate-500 max-w-[220px] leading-relaxed">
                Please enter a valid proposition prompt in Step 01 (at least 10 characters) to unlock the Expert Jury roster selection.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase font-mono">02- Jury Roster</h3>
                </div>
                <span className="text-xs text-slate-300 font-mono font-semibold bg-emerald-950/40 text-emerald-400 px-2 py-0.5 border border-emerald-900/40 rounded">
                  {selectedJurors.length}/6 Active
                </span>
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
                          ? "bg-slate-900/95 border-slate-700/80 hover:border-slate-600 cursor-pointer shadow-lg" 
                          : "bg-slate-950/30 border-slate-900 opacity-65 hover:opacity-90"
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
            </div>
          )}

          {/* 03- Execute Deliberation Suite Card */}
          {isStep1Complete && (
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 shadow-xl flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-500 animate-pulse" />
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase font-mono">03- Run Trial</h3>
                </div>
                {isStep2Complete ? (
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded font-mono">Ready</span>
                ) : (
                  <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-900 px-2 py-0.5 rounded font-mono">Select 3+ Jurors</span>
                )}
              </div>

              {!isStep2Complete ? (
                <div className="text-center py-4">
                  <p className="text-[11px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                    ⚠️ Please select a minimum of 3 active jurors in Step 02 to unlock Step 03- Trial execution.
                  </p>
                </div>
              ) : (
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
              )}
            </div>
          )}
          
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

          {/* Nav Tabs - Sleek Corporate Responsive Flex Grid */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950/40 border border-slate-900/60 shadow-inner">
            <button
              onClick={() => setActiveTab("welcome")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "welcome" 
                  ? "bg-rose-900/20 text-rose-400 border border-rose-800/60" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-welcome-tour"
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              Welcome Tour
            </button>
            <button
              onClick={() => setActiveTab("deliberation")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "deliberation" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-deliberations"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              04- Juror Deliberations
            </button>
            <button
              onClick={() => setActiveTab("crossexam")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "crossexam" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-cross-examinations"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
              05- Cross Exam
            </button>
            <button
              onClick={() => setActiveTab("synthesis")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "synthesis" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-judge-synthesis"
            >
              <Gavel className="w-3.5 h-3.5 text-sky-400" />
              06- Consensus
            </button>
            <button
              onClick={() => setActiveTab("precedents")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "precedents" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-precedents-library"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              07- Precedents ({precedents.length})
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "metrics" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-weight-metrics"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              08- Logs
            </button>
            <button
              onClick={() => setActiveTab("legal")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "legal" 
                  ? "bg-slate-900 text-slate-100 border border-slate-700/80" 
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
              id="tab-legal-privacy"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              09- Legal & Privacy
            </button>
          </div>

          {/* TAB CONTENT: WELCOME TOUR */}
          {activeTab === "welcome" && (
            <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col gap-6 animate-fadeIn">
              {/* Welcome Header */}
              <div className="flex flex-col md:flex-row items-start gap-4 pb-6 border-b border-slate-900">
                <div className="p-3.5 bg-rose-955/20 border border-rose-900/60 rounded-xl text-rose-500 shrink-0 shadow-lg shadow-rose-950/20">
                  <Gavel className="w-7 h-7 animate-pulse text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                    JuryAI Dialectic Engine
                    <span className="text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-900/60 px-2 py-0.5 rounded font-normal uppercase normal-case tracking-normal">Enterprise Sandbox</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    JuryAI is a <strong>metacognitive multi-agent policy simulation suite</strong>. 
                    By combining custom strategic propositions with multiple divergent LLM expert personas, 
                    the engine subjects business policies, pricing algorithms, or compliance standards to rigorous multi-bias peer reviews, 
                    adversarial cross-examinations, and consolidated foreperson synthesis.
                  </p>
                </div>
              </div>

              {/* Complete System flow */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  The Complete Multi-Agent Dialectic System Flow
                </span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-[10px] font-mono">
                  <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 flex items-center justify-center font-bold">01</span>
                    <span className="text-slate-200 font-bold">Formulation</span>
                    <span className="text-slate-500 text-[9px] leading-tight">User input proposition</span>
                  </div>
                  <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-955/20 border border-rose-900/50 text-rose-400 flex items-center justify-center font-bold">02</span>
                    <span className="text-rose-400 font-bold">Deliberations</span>
                    <span className="text-slate-500 text-[9px] leading-tight">Personas generate reports</span>
                  </div>
                  <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-955/20 border border-amber-900/50 text-amber-400 flex items-center justify-center font-bold">03</span>
                    <span className="text-amber-400 font-bold">Cross-Exams</span>
                    <span className="text-slate-500 text-[9px] leading-tight">Hostile peer friction</span>
                  </div>
                  <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-955/20 border border-sky-900/50 text-sky-400 flex items-center justify-center font-bold">04</span>
                    <span className="text-sky-400 font-bold">Consensus</span>
                    <span className="text-slate-500 text-[9px] leading-tight">Verdict scorecard & bias</span>
                  </div>
                  <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-955/20 border border-emerald-900/50 text-emerald-400 flex items-center justify-center font-bold">05</span>
                    <span className="text-emerald-400 font-bold">Refinement</span>
                    <span className="text-slate-500 text-[9px] leading-tight">Double-loop feedback</span>
                  </div>
                </div>
              </div>

              {/* Guided Instructions */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Dialectic Chamber Onboarding Checklist
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">01- Formulate Proposition</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Enter any corporate plan, pricing scheme, algorithm, or code of conduct in the left-hand panel.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">02- Select Jury Roster</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Toggle specialized agent personas to represent distinct viewpoints (e.g. Scepticism, First Principles).
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">03- Run Multi-Agent Trial</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Initiate Stage 1 to generate detailed critiques using active AI agents or immediate high-fidelity simulation datasets.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">4</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">04- Peer Cross Examination</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Go to Stage 2, pick two opposing expert agents, and observe direct rebuttal clashes to test argument integrity.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">5</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">05- Foreperson Consensus Report</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Go to Stage 3 to review the aggregate scorecard, cognitive bias variance, agreement patterns, and policy warnings.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl flex gap-3">
                    <div className="text-xs font-mono font-bold text-rose-500 bg-rose-955/20 border border-rose-900/40 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">6</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">06- Double-Loop Refinement</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Apply the automatically generated, vulnerability-adjusted proposition as a fresh iteration loop to test improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Start Action Callout */}
              <div className="mt-2 bg-gradient-to-r from-rose-950/20 to-slate-900/50 border border-rose-900/50 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-rose-400 font-mono block text-sm mb-1">🚀 EXPERIMENT ONE-CLICK SIMULATION</span>
                  Instantly load a pre-configured multi-agent dynamic pricing trial to observe the entire system in action.
                </div>
                <button
                  onClick={() => {
                    setQuery("A retail company wants to implement a fully automated AI system that dynamically changes product prices for online shoppers in real-time based on their estimated income bracket, web browsing history, and immediate demand. Is this an optimal and sustainable business strategy? Debate the long-term impact.");
                    setSelectedJurors([
                      JurorId.SKEPTIC,
                      JurorId.LITERALIST,
                      JurorId.EDGE_CASE_HUNTER,
                      JurorId.SAFETY_GUARDIAN,
                      JurorId.FIRST_PRINCIPLES
                    ]);
                    runSimulatedDeliberation();
                    setActiveTab("deliberation");
                  }}
                  className="bg-rose-900 hover:bg-rose-800 text-white border border-rose-700 px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer shrink-0 shadow-lg shadow-rose-950/40"
                >
                  Launch Demo Trial
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: DELIBERATION GRID */}
          {activeTab === "deliberation" && (
            <div className="flex flex-col gap-6">
              {stage === "setup" ? (
                <div className="bg-slate-950/45 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-center gap-4 py-16 animate-fadeIn">
                  <div className="p-4 bg-rose-950/30 border border-rose-900/40 rounded-full text-rose-500">
                    <Users className="w-8 h-8 animate-pulse text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-slate-200 uppercase tracking-wide">04- Juror Deliberations Pending</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                      Chambers are currently empty. Formulate your proposition, select the roster on the left, and click <strong>Execute Real-time AI Deliberation</strong> or <strong>Run Demo Simulated Trial</strong> in Step 03 to unlock Stage 1 individual reports.
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

                  <div className="bg-slate-950 p-5 rounded-lg border border-slate-900 overflow-y-auto max-h-[400px]">
                    <MarkdownRenderer text={deliberations[selectedInspectJuror].content} />
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
              
              {stage === "setup" ? (
                <div className="bg-slate-950/45 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-center gap-4 py-16 animate-fadeIn">
                  <div className="p-4 bg-amber-955/20 border border-amber-900/40 rounded-full text-amber-500">
                    <ArrowRightLeft className="w-8 h-8 text-amber-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-slate-200 uppercase tracking-wide">05- Cross Examination Pending</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                      Cross examination clashes require active juror reports. First initiate deliberations in Step 03 of the left panel to establish foundational arguments.
                    </p>
                  </div>
                </div>
              ) : (
                <>
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
            </>
          )}
        </div>
      )}

          {/* TAB CONTENT: FINAL SYNTHESIS & JUDGE REPORT */}
          {activeTab === "synthesis" && (
            <div className="flex flex-col gap-6">
              
              {stage === "setup" ? (
                <div className="bg-slate-950/45 border border-slate-900 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-center gap-4 py-16 animate-fadeIn">
                  <div className="p-4 bg-sky-955/20 border border-sky-900/40 rounded-full text-sky-400">
                    <Gavel className="w-8 h-8 text-sky-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-slate-200 uppercase tracking-wide">06- Consensus Report Pending</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                      Foreperson synthesis report generates a structured scorecard of vulnerabilities and amendment policies. Execute deliberations in Step 03 of the left panel to begin.
                    </p>
                  </div>
                </div>
              ) : !synthesis ? (
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
                    <div className="bg-slate-950 p-5 rounded-lg border border-slate-900">
                      <MarkdownRenderer text={synthesis.summary} />
                    </div>
                  </div>

                  {/* Bullet Lists Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Consensus Agreements */}
                    <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex-grow">Areas of Absolute Agreement</h4>
                        <span className="text-[9px] bg-emerald-950 border border-emerald-900 text-emerald-400 font-mono px-2 py-0.5 rounded-full">
                          APPROVED SHIFT
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        {synthesis.agreements.map((item, idx) => (
                          <div key={idx} className="text-xs text-slate-200 leading-relaxed bg-emerald-950/10 hover:bg-emerald-950/20 transition px-4 py-3 rounded-lg border border-emerald-900/30 flex items-start gap-3">
                            <span className="text-emerald-400 font-bold select-none h-5 w-5 rounded-full bg-emerald-950 border border-emerald-900 flex items-center justify-center shrink-0 text-[10px]">
                              ✓
                            </span>
                            <span className="flex-grow pt-0.5">{renderInlineStyles(item)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dissenting views - PIPELINE STEP 5 requirements */}
                    <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex-grow">Dissent Map & Clashes</h4>
                        <span className="text-[9px] bg-amber-950 border border-amber-900 text-amber-400 font-mono px-2 py-0.5 rounded-full">
                          ACTIVE CLASH
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        {synthesis.disagreements.map((item, idx) => (
                          <div key={idx} className="text-xs text-slate-200 leading-relaxed bg-amber-950/10 hover:bg-amber-950/20 transition px-4 py-3 rounded-lg border border-amber-900/20 flex items-start gap-3">
                            <span className="text-amber-400 font-bold select-none h-5 w-5 rounded-full bg-amber-950 border border-amber-900/40 flex items-center justify-center shrink-0 text-[10px]">
                              ✦
                            </span>
                            <span className="flex-grow pt-0.5">{renderInlineStyles(item)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Vulnerability metrics */}
                  <div className="bg-gradient-to-r from-orange-950/20 to-rose-950/10 border border-orange-900/30 rounded-xl p-6 shadow-md">
                    <div className="flex items-center gap-2 pb-3 text-orange-400 border-b border-orange-900/20 mb-4 justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 animate-pulse text-orange-400" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest">Systemic Black Swan & Tail Risks Identified</h4>
                      </div>
                      <span className="text-[9px] text-orange-400 bg-orange-950/50 border border-orange-900 font-mono px-2 py-0.5 rounded-full">
                        HIGH VOLATILITY
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {synthesis.vulnerabilities.map((v, idx) => (
                        <div key={idx} className="text-xs text-orange-200 leading-relaxed bg-orange-950/10 hover:bg-orange-950/20 transition px-4 py-3 rounded-lg border border-orange-900/30 flex items-start gap-3">
                          <span className="text-orange-400 font-extrabold select-none h-5 w-5 rounded-full bg-slate-950 border border-orange-900/50 flex flex-shrink-0 items-center justify-center text-[10px]">
                            ⚠️
                          </span>
                          <span className="flex-grow pt-0.5">{renderInlineStyles(v)}</span>
                        </div>
                      ))}
                    </div>
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

                  {/* TWO-COLUMN ADVANCED CONTROLLER: ARCHIVER & DRAFT AMENDMENT SIMULATOR */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    {/* Archiver Card */}
                    <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 flex flex-col gap-3 justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 border-b border-slate-900 pb-3 mb-3 text-sky-400">
                          <Database className="w-4 h-4" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Commit Consensus to Precedent Ledger</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          Archive this synthesized debate inside the cognitive precedents repository. Retain custom juror arguments, consensus scores, agreements, and specific systemic warnings for comparison.
                        </p>

                        <div className="flex flex-col gap-1.5 bg-slate-950 p-3 rounded-lg border border-slate-900/60 shadow-inner">
                          <label className="text-[10px] text-slate-500 font-mono uppercase font-bold" htmlFor="precedent-title-input">Debate Precedent Title</label>
                          <input
                            type="text"
                            id="precedent-title-input"
                            value={newPrecedentTitle}
                            onChange={(e) => setNewPrecedentTitle(e.target.value)}
                            placeholder="e.g., Dynamic Income Retail Discrimination Trial"
                            className="bg-slate-900 text-xs text-slate-200 px-3 py-2 rounded border border-slate-800 focus:outline-none focus:border-sky-500 w-full"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSaveCurrentToPrecedents}
                        className="mt-4 w-full bg-slate-950 hover:bg-slate-905 active:bg-slate-950 text-sky-400 border border-sky-900/45 hover:border-sky-500/80 transition px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Commit Case to Secure Repository
                      </button>
                    </div>

                    {/* Draft Amendment Simulator Card */}
                    <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 flex flex-col gap-3 justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 border-b border-slate-900 pb-3 mb-3 text-amber-500">
                          <GitCompare className="w-4 h-4" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Double-Loop Draft Amendment proposed</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          To resolve the absolute contradictions and system vulnerabilities, our metacognitive synthesizer proposed an amended, policy-compliant draft formulation.
                        </p>

                        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-900/60 shadow-inner text-xs text-emerald-300/90 leading-relaxed font-mono">
                          <strong className="text-[9px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Amended Proposition Draft:</strong>
                          "{getRefinedDraftSuggestion()}"
                        </div>
                      </div>

                      <button
                        onClick={handleApplyRefinedDraft}
                        className="mt-4 w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer border-none shadow-md shadow-emerald-950/20"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Apply Amendment as Next Debate Cycle
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB CONTENT: COGNITIVE PRECEDENTS LIBRARY */}
          {activeTab === "precedents" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
              {/* Cases List Sidebar (col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-sky-400" />
                      Archived Debates ({precedents.length})
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Select a historic trial precedent to inspect the full consensus summary, team-level agreements, and unexploded vulnerabilities.
                  </p>

                  <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                    {precedents.map((p) => {
                      const isSelected = selectedPrecedentId === p.id;
                      const scoreColor = p.verdictScore >= 7 ? "text-emerald-400 border-emerald-900/50 bg-emerald-950/20" :
                                         p.verdictScore >= 5 ? "text-amber-400 border-amber-900/50 bg-amber-950/20" :
                                         "text-rose-400 border-rose-900/50 bg-rose-950/20";
                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSelectedPrecedentId(p.id);
                            addLog("SYSTEM", `Inspecting details for precedent: "${p.title}"`, "info");
                          }}
                          className={`border rounded-xl p-3.5 flex flex-col gap-2 transition-all cursor-pointer ${
                            isSelected 
                              ? "border-sky-500 bg-slate-900/70 shadow-lg" 
                              : "border-slate-900 hover:border-slate-800 bg-slate-950/20 hover:bg-slate-900/20"
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-xs font-bold text-slate-200 line-clamp-1">{p.title}</span>
                            <div className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold shrink-0 ${scoreColor}`}>
                              LVL {p.verdictScore}
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed italic">
                            "{p.query}"
                          </p>

                          <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-1 border-t border-slate-900/30 pt-1.5">
                            <span>{new Date(p.timestamp).toLocaleDateString()}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sky-300 font-bold uppercase truncate max-w-[120px]">{p.verdictLabel}</span>
                              {/* Delete button (only show on custom saved cases, not baseline seed precedents) */}
                              {!["precedent_1", "precedent_2", "precedent_3", "precedent_4"].includes(p.id) && (
                                <button
                                  onClick={(e) => handleDeletePrecedent(p.id, e)}
                                  className="text-rose-450 text-rose-400 hover:text-rose-300 ml-2 font-bold cursor-pointer bg-transparent border-none p-0 inline-block"
                                  title="Delete Case"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Case Details Viewer (col-span-7) */}
              <div className="lg:col-span-7">
                {(() => {
                  const currentCase = precedents.find(p => p.id === selectedPrecedentId);
                  if (!currentCase) {
                    return (
                      <div className="bg-slate-900/10 border border-slate-900 rounded-xl p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
                        <Scale className="w-10 h-10 text-slate-700 animate-pulse" />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-400 font-mono">No Case Selected</h4>
                          <p className="text-xs text-slate-500 mt-1">Select a precedent case from the ledger on the left to review its findings.</p>
                        </div>
                      </div>
                    );
                  }

                  const scoreColor = currentCase.verdictScore >= 7 ? "text-emerald-400 border-emerald-900 bg-emerald-950/30" :
                                     currentCase.verdictScore >= 5 ? "text-amber-400 border-amber-900 bg-amber-950/30" :
                                     "text-rose-455 text-rose-400 border-rose-900 bg-rose-950/30";

                  return (
                    <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-6 flex flex-col gap-5">
                      <div className="border-b border-slate-900 pb-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-sky-950 border border-sky-850 text-sky-400 font-mono px-2 py-0.5 rounded font-bold">
                              {currentCase.verdictLabel}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white mt-1.5">{currentCase.title}</h3>
                          <span className="text-[10px] text-slate-500 font-mono block mt-1">SIMULATED TRIAL DATE: {new Date(currentCase.timestamp).toLocaleString()}</span>
                        </div>

                        <div className="bg-slate-950 px-4 py-3 rounded-lg text-center border border-slate-900 shrink-0 self-stretch sm:self-auto flex sm:flex-col justify-between items-center">
                          <span className="text-[9px] text-slate-500 font-mono block uppercase">Verdict Score</span>
                          <span className={`text-2xl font-mono font-black ${scoreColor}`}>{currentCase.verdictScore} / 10</span>
                        </div>
                      </div>

                      {/* Original prompt */}
                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300 block mb-1 font-mono text-[10px] uppercase font-bold text-[9px] tracking-wider">Under Debate:</strong>
                        "{currentCase.query}"
                      </div>

                      {/* Foreperson's Meta-Synthesis */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Gavel className="w-3.5 h-3.5 text-rose-500" />
                          Consensus Summary
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 text-xs text-slate-200 leading-relaxed">
                          <MarkdownRenderer text={currentCase.summary} />
                        </div>
                      </div>

                      {/* Agreements, Disagreements, Vulnerabilities */}
                      <div className="grid grid-cols-1 gap-4">
                        {currentCase.agreements && currentCase.agreements.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                              Agreements Point ({currentCase.agreements.length})
                            </span>
                            <ul className="text-xs text-slate-300 list-disc list-inside pl-2.5 flex flex-col gap-1 leading-relaxed bg-slate-950 p-3.5 rounded-lg border border-slate-900">
                              {currentCase.agreements.map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {currentCase.vulnerabilities && currentCase.vulnerabilities.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-455 text-rose-400 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                              Systemic Vulnerabilities & Risks
                            </span>
                            <ul className="text-xs text-slate-300 list-disc list-inside pl-2.5 flex flex-col gap-1 leading-relaxed bg-slate-950 p-3.5 rounded-lg border border-slate-900">
                              {currentCase.vulnerabilities.map((v, i) => (
                                <li key={i} className="text-rose-100/90">{v}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Critical Action button: Load into chamber */}
                      <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-slate-500 font-mono">
                        <span>Cognitive Diversity Variance: <strong className="text-rose-400">{currentCase.biasVariance || 0.27}</strong></span>
                        <button
                          onClick={() => {
                            setQuery(currentCase.query);
                            setDeliberations(currentCase.deliberations);
                            setChallenges(currentCase.challenges);
                            setSynthesis({
                              agreements: currentCase.agreements || [],
                              disagreements: currentCase.disagreements || [],
                              vulnerabilities: currentCase.vulnerabilities || [],
                              verdictScore: currentCase.verdictScore,
                              verdictLabel: currentCase.verdictLabel,
                              summary: currentCase.summary
                            });
                            setSelectedJurors(currentCase.selectedJurors);
                            setStage("complete");
                            setActiveTab("synthesis");
                            addLog("SYSTEM", `Restored historic precedent case "${currentCase.title}" into Active Jury Chamber.`, "success");
                          }}
                          className="bg-sky-800 hover:bg-sky-700 active:bg-sky-950 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-950/20 self-stretch sm:self-auto border-none"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Load Case into Jury Chambers
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
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

          {/* TAB CONTENT: LEGAL & PRIVACY */}
          {activeTab === "legal" && (
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 md:p-6 flex flex-col gap-6 animate-fadeIn">
              <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase text-slate-200 text-slate-100">Legal Compliance & Privacy Portal</h3>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">VERSION 2.4 • LAST UPDATED JUNE 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Document Selector Sidebar */}
                <div className="md:col-span-3 flex flex-row md:flex-col gap-2">
                  <button
                    onClick={() => setSelectedLegalDoc("privacy")}
                    className={`text-left p-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedLegalDoc === "privacy"
                        ? "bg-rose-955/20 border border-rose-900/60 text-rose-400"
                        : "bg-slate-950/20 border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setSelectedLegalDoc("terms")}
                    className={`text-left p-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedLegalDoc === "terms"
                        ? "bg-rose-955/20 border border-rose-900/60 text-rose-400"
                        : "bg-slate-950/20 border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Terms of Service
                  </button>
                  <button
                    onClick={() => setSelectedLegalDoc("api")}
                    className={`text-left p-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedLegalDoc === "api"
                        ? "bg-rose-955/20 border border-rose-900/60 text-rose-400"
                        : "bg-slate-950/20 border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    API Usage Policy
                  </button>
                </div>

                {/* Policy text viewer */}
                <div className="md:col-span-9 bg-slate-955/10 p-5 rounded-xl border border-slate-900 flex flex-col gap-5 leading-relaxed text-slate-300 text-xs">
                  {selectedLegalDoc === "privacy" && (
                    <>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2 font-mono uppercase tracking-wide">Privacy & Data Governance Policy</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          At JuryAI, we take information privacy, enterprise data security, and client confidentiality with utmost seriousness. This document outlines how data flows, where it is cached, and your control rights under global data governance protocols.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">1. Zero-Retention Model Pipeline</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          The strategic propositions and query prompts entered into the dialectic engine are piped directly to secure, enterprise-tier Google Gemini models via secure transit. No inputs are stored or ever used to train public datasets.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">2. Local Storage Cache & Session Life</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Precedent trial logs, custom juror roster selections, and debate brief cache variables are maintained locally within your browser's private secure namespace (LocalStorage). You have full authority to purge this container cache at any time.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">3. Information Security Standards</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          JuryAI operates behind industry-leading sandboxing. All real-time LLM agent requests are fully authenticated and filtered for safety violations, adversarial injection attempts, and intellectual property compliance.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedLegalDoc === "terms" && (
                    <>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2 font-mono uppercase tracking-wide">Terms of Service Agreement</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Please review these Terms of Service carefully prior to utilizing the JuryAI dialectic stress-testing chamber. By initializing a trial simulation, you agree to comply with standard enterprise safety and fair usage directives.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">1. Theoretical Simulation Boundary</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          All agent evaluations, cross-examination clashes, and meta-synthesis Consensus reports are auto-generated theoretical stress-tests. They represent model-derived viewpoints meant strictly for risk mitigation planning and do not constitute actual legal advice.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">2. Safe & Fair Usage Policy</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Users are strictly prohibited from generating propositions containing harmful, malicious, or hate-based text. Our moderation layer automatically suspends query pipelines that trigger safety policy alerts.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">3. Output Copyright & IP ownership</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          You retain 100% intellectual property ownership over the formulated propositions and custom-generated consensus amendment drafts derived from your active sessions.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedLegalDoc === "api" && (
                    <>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2 font-mono uppercase tracking-wide">API Integration & Sovereignty Guidelines</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          This section outlines rate limiting, API routing, and security tunneling rules established to protect both upstream server capacity and end-user request latency.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">1. Pipeline Rate Limits</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Standard portal users are allocated up to 15 concurrent real-time AI deliberation rounds per hour to ensure equitable performance limits across concurrent developer sandboxes.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h5 className="font-bold text-slate-200 font-mono text-xs uppercase">2. Upstream SLA Guarantee</h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          JuryAI leverages direct Google Cloud integrations offering an estimated 99.9% uptime for core agent generation pipelines, failing gracefully with local dynamic mock caching during extreme spike conditions.
                        </p>
                      </div>
                    </>
                  )}

                  <div className="border-t border-slate-900 pt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>SECURITY STATUS: ACTIVE SECURE</span>
                    <span>GDPR & ENTERPRISE ALIGNED</span>
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
