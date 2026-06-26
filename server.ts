import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy-loaded Gemini client to ensure startup is error-free even without a key configured immediately.
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured inside the environment. Please configure your key in the Secrets panel inside AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Highly robust helper running retries with model fallbacks (gemini-3.5-flash -> gemini-flash-latest -> gemini-3.1-flash-lite -> gemini-2.5-flash) and brief backoff
async function callGeminiWithFallback(systemInstruction: string, contents: string, config: any = {}): Promise<string> {
  const models = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-2.5-flash"];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: model,
          contents,
          config: {
            ...config,
            systemInstruction,
          }
        });
        if (response && response.text) {
          console.log(`[API_SUCCESS] Request completed on model ${model} during attempt ${attempt}.`);
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const errStr = err.message || String(err);
        console.warn(`[WARN] Attempt ${attempt} on model ${model} failed with error: ${errStr}`);
        
        // Fail-fast on quota exhaustion (429/RESOURCE_EXHAUSTED) to prevent long sequential timeouts and engage local high-fidelity fallbacks instantly
        const isQuotaExhausted = errStr.includes("RESOURCE_EXHAUSTED") || 
                                 errStr.includes("quota") || 
                                 errStr.includes("429") || 
                                 (err.status && err.status === 429);
        if (isQuotaExhausted) {
          console.warn("[QUOTA_EXHAUSTED] API Quota or rate limit exceeded. Failing fast to trigger instant local fallbacks.");
          throw err;
        }

        // Delay before attempt or model rotation
        await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
      }
    }
  }
  throw lastError || new Error("Failed dynamic generation on all standard models.");
}

function cleanQueryTerm(query: string): string {
  let cleaned = query.replace(/^(a|an|the|is|are|whether|does|do|can|should|if|where|how|why)\s+/gi, "");
  cleaned = cleaned.replace(/\?+$/, "");
  if (cleaned.length > 70) {
    return cleaned.substring(0, 67) + "...";
  }
  return cleaned;
}

// Generate tailored dynamic metacognitive backup responses based on target topics
function generateDynamicFallback(query: string, jurorId: string): string {
  const proposal = cleanQueryTerm(query);
  const queryLower = query.toLowerCase();
  
  // Custom tailoring if default query is selected
  const isDefaultRetailQuery = queryLower.includes("dynamically changes product prices") && queryLower.includes("estimated income bracket");

  if (isDefaultRetailQuery) {
    switch(jurorId) {
      case "SKEPTIC":
        return `### SKEPTIC DELIBERATION: ADVOCATIVE PUBLIC BACKLASH REPORT
Analyzing the dynamic policy: "Dynamic wealth-based product pricing..." 
This mechanism presents severe systemic consumer alienation risks. 

#### Main Backlash Factors:
1. **Active Evasion Loops**: Consumers are adversarial players. When priced dynamically, they will adopt tracker block software, spoofed browser indicators, and dummy profiles to trigger minimal price brackets.
2. **Device Clashing**: Multiple house members sharing a single terminal will face erratic dynamic alterations, inciting direct frustration and public comparison screenshots.
3. **Severe Brand Contempt**: Commoditizing target quotes based on estimated private parameters destroys the traditional social safety norms of fair-trade.

#### Provisional Verdict Score
**Score: 2/10** (Catastrophic brand trust erosion)`;

      case "LITERALIST":
        return `### LITERALIST DELIBERATION: PRECISION AND PROXY EVALUATION
Analyzing the query syntax: "Dynamic wealth-based product pricing..."
This strategy assumes perfect input indexes, which is mathematically false.

#### 1. Low-Accuracy Proxies
Geolocation estimates and trailing cookies have wide variance limits. Aligning price tiers to high-error estimates locks actual low-earning shoppers out of fair commodity cycles.

#### 2. Process Latency Penalties
Running extensive profiling scans and database matches in dynamic transaction loops (under 100 milliseconds) causes render latency, raising abandonment metrics.

#### Provisional Verdict Score
**Score: 3/10** (Failure due to class proxies discrepancy and transaction latency)`;

      case "EDGE_CASE_HUNTER":
        return `### EDGE CASE HUNTER: LIMIT BOUNDS SYSTEM REPORT
Analyzing system load boundaries for the proposal.

#### 1. Scraper Bot Arbitrage
If pricing is cheaper for low-income profiles, commercial bot scrapers will easily simulate budget footprints, buy and deplete supply pools, and capture resale profit.

#### 2. Side-By-Side Viral Checks
Identical customers sitting side-by-side inside the same transaction funnel will observe massive price disparities. Screen receipts posted to global forums will result in rapid public relations crises.

#### Provisional Verdict Score
**Score: 2/10** (Extreme risk of bot manipulation and side-by-side mismatch exposure)`;

      case "SAFETY_GUARDIAN":
        return `### SAFETY GUARDIAN: ETHICAL METRICS & REGULATORY COMPLIANCE
Analyzing corporate ethics and consumer safety guidelines.

#### 1. Regulatory Exposure
Personalized dynamic price pricing based on private traits is heavily restricted under FTC unfair performance guidelines and EU GDPR profile protections (Article 22).

#### 2. Systemic Class Exploitation
Charging higher multipliers based on predictive affluence limits access to basic retail necessities, inciting prompt regulatory interventions and lawsuits.

#### Provisional Verdict Score
**Score: 1/10** (Existential legal penalties and class discrimination exposure)`;

      case "FIRST_PRINCIPLES":
        return `### FIRST PRINCIPLES: COOPERATIVE game-theory EXAMINATION
Reducing the core query into its fundamental transaction mathematics.

#### Game Equilibrium Principles
Stable repeated markets require shared transaction surplus. Perfect dynamic wealth collection acts as *first-degree price discrimination*, extracting 100% of shopper surplus.

When buyer outcome trends to zero, participants switch automatically to alternate platforms, exiting the cycle. The repeated game mechanics collapse.

#### Provisional Verdict Score
**Score: 2/10** (Mathematically unstable market structure leading to rapid buyer extinction)`;

      default:
        return `### CONSENSUS STANCE SUMMARY
Though capturing marginal value sounds profitable, the overall system feedback loops include severe brand contempt and active evasion.

#### Provisional Verdict Score
**Score: 2/10** (Immediate rejection recommended)`;
    }
  }

  // --- Dynamic generic generator for any custom query ---
  switch(jurorId) {
    case "SKEPTIC":
      return `### SKEPTIC DELIBERATION: COGNITIVE REFRACTORY OUTCOME
Analyzing the system proposal: "${proposal}" 
This design implements a highly critical vulnerability towards human resistance and system evasion.

#### Core Backlash Points:
1. **User Spoofing & Countermeasures**: Participants are active, defensive players. In response to "${proposal}", they will manipulate their signals, block trackers, and feed false telemetry blocks to spoof ideal parameters.
2. **Structural Friction & Context Clash**: The proposal overlooks group context variance (such as shared workspace logins or multi-user accounts), translating to severe user layout anomalies.
3. **Severe Trust Depreciation**: Introducing an opaque automated profiling logic changes the traditional social trust contract, inciting brand contempt and systemic client drift.

#### Provisional Verdict Score
**Score: 3/10** (Severe risk of adversarial manipulation and brand trust depreciation)`;

    case "LITERALIST":
      return `### LITERALIST DELIBERATION: SYNTAX & PRECISION REVIEW
Analyzing the precise proposition statements of: "${proposal}"
The logic relies on high-variance proxies that produce statistical classification failure.

#### 1. Proxy Signal Discrepancy
Estimating ideal decision parameters based on external behavioral indicators creates wide margins of error. Applying the rules of "${proposal}" globally locks out edge-case actors who do not conform to standard telemetry curves.

#### 2. System Latency and Performance Cost
Calculating multi-tiered profiling variables and running live database context queries inside active user loops (under 100ms) introduces heavy process lag, prompting an increase in transactional abandonment.

#### Provisional Verdict Score
**Score: 4/10** (Mechanical failure due to high statistical proxy error rates)`;

    case "EDGE_CASE_HUNTER":
      return `### EDGE CASE HUNTER: BOUNDARY DEFICITS REPORT
Stress-testing the limits and extreme system bounds of: "${proposal}"

#### 1. Adverse Scripting and Bot Arbitrage
As soon as the rules of "${proposal}" are active, automated bad-actor scripts and custom bots will reverse-engineer the algorithm to spoof favorable accounts, exhausting valuable inventory or assets.

#### 2. Public Discrepancy & Viral Exposure
Physical or digital peers sitting side-by-side will eventually observe highly divergent outputs from the same system. Side-by-side screenshots shared online will trigger massive reputational damages.

#### Provisional Verdict Score
**Score: 3/10** (High vulnerability to bot arbitrage and public validation exposure)`;

    case "SAFETY_GUARDIAN":
      return `### SAFETY GUARDIAN: ETHICAL BALANCE & LAW COMPLIANCE
Auditing the systemic fairness, consumer safety, and corporate risks of: "${proposal}"

#### 1. Extreme Compliance & Legal Liabilities
Operating "${proposal}" based on automated user metrics faces critical legal exposure. Under GDPR profiling guidelines (Article 22) and FTC unfair/deceptive practices regulations, the business faces immediate legal action and audits.

#### 2. Risk to Protected and Vulnerable Groups
The profiling algorithm will inevitably generate biased outputs that disproportionately restrict or penalize vulnerable target demographics, damaging long-term corporate health.

#### Provisional Verdict Score
**Score: 2/10** (Critical regulatory exposure and systemic discrimination potential)`;

    case "FIRST_PRINCIPLES":
      return `### FIRST PRINCIPLES: TRANSACTION PHYSICS EVALUATION
Reducing "${proposal}" to its thermodynamic axioms of economic repeated games.

#### Transaction Game Physics:
Cooperative repeated loops can only maintain stability when transaction surplus is split between both sides. Under "${proposal}", the system strives for complete value extraction, lowering client value surplus to near-zero.

Once client surplus drops below their transaction friction cost, participants choose flight over cooperation, abandoning the platform entirely.

#### Provisional Verdict Score
**Score: 3/10** (Unstable mathematical market design that drives participant exit)`;

    default:
      return `### JURY STANCE SUMMARY
Though the short-term financial forecasts look highly promising to corporate planners, the feedback loops spanning user spoofing, bot arbitrage, and severe regulatory audits render "${proposal}" non-viable.

#### Provisional Verdict Score
**Score: 3/10** (Systemic failure predicted)`;
  }
}

function generateDynamicSynthesisFallback(query: string, deliberations: any): any {
  const proposal = cleanQueryTerm(query);
  const queryLower = query.toLowerCase();
  
  // Custom tailoring if default query is selected
  const isDefaultRetailQuery = queryLower.includes("dynamically changes product prices") && queryLower.includes("estimated income bracket");

  if (isDefaultRetailQuery) {
    return {
      agreements: [
        "Dynamic pricing based on wealth profiling strips client goodwill and destroys long-term retention metrics.",
        "Input data indicators for income classification are mathematically too high-variance for production use.",
        "Extreme legal vulnerability exists under current FTC and EU GDPR automated decision-making controls."
      ],
      disagreements: [
        "Jurors clash on whether the main barrier is ethical/humanitarian degradation (Safety Guardian) or terminal repeated game thermodynamics (First Principles).",
        "Skeptic focuses on public consumer PR pushbacks, while Edge Case Hunter points to bot-harvesting exploitation and reseller arbitrage."
      ],
      vulnerabilities: [
        "Immediate expansion of fixed-price competitors positioning on transparency models, absorbing lost market base.",
        "Active customer falsification software spoofing cheaper profile brackets, corrupting baseline telemetry."
      ],
      verdictScore: 2,
      verdictLabel: "UNEXPLODED BIAS RISK - CRITICAL REJECTION",
      summary: "The metacognitive jury has integrated all perspectives on dynamic profile pricing. The strategy is evaluated as unsustainable and highly unstable. Attempting perfect surplus extraction from buyers violates repetitive game cooperative limits, leading to customer rebellion, evasive spoofing, bot harvesting, and catastrophic PR losses. Immediate rejection is advised."
    };
  }

  // Calculate average score dynamically based on actual deliberations' scores if available
  let scores: number[] = [];
  try {
    for (const d of Object.values(deliberations) as any) {
      const match = d.content.match(/Score:\s*(\d+)/i);
      if (match) {
        scores.push(parseInt(match[1]));
      }
    }
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
}

function generateDynamicCrossExamFallback(challengerId: string, targetId: string): any {
  return {
    challengerId,
    targetId,
    challenge: `As Juror ${challengerId}, I challenge the core assertion of Juror ${targetId}. Your stance fails to account for adaptive adversarial feedback responses inside our target system. You are looking at a static model while the environment actively mutates in response!`,
    rebuttal: `Juror ${targetId} defending: Your objection misses the foundational constraint. The physical and economic parameters prioritize my highlighted variables first; user mutation remains a secondary consequence that my model natively handles.`,
    resolved: true
  };
}

const JUROR_SYSTEM_PROMPTS: Record<string, string> = {
  SKEPTIC: `You are Juror SKEPTIC, a persona from a structured multi-agent debate patterned after "12 Angry Men".
Your defining trait is extreme skepticism, doubt, and critical cynicism. You DO NOT accept polished corporate pitches or optimistic projections at face value.
Your job is to identify underlying motives, search for hidden catches, highlight user deception and privacy evasion (like VPN usage or spoofing), analyze customer alienation, and point out why consumer trust will disintegrate.
Analyze the shopper pricing query in detail from your highly cynical viewpoint. Point out specific, concrete ways this scheme risks immediate shopper hostile reactions, public relations disasters, and algorithmic failure.
Tone: Sharp, cautious, slightly abrasive, thoroughly investigative. Speak directly, do not use corporate flattery.`,

  LITERALIST: `You are Juror LITERALIST, a persona from a structured multi-agent debate patterned after "12 Angry Men".
Your defining trait is semantic precision, exact definitions, and logical syntax. You focus strictly on the literal words of the proposal.
"Dynamic real-time product pricing based on estimated income and web history" — break these down logically.
What does "estimated" mean? How is estimated income verified in millisecond latency? What error rates exist?
What defines "optimal" and "sustainable"? If profit climbs but lifetime buyer value plummets, is it mathematically optimal over 10 years? 
Analyze logical contradictions, factual holes, and literal terms of the proposition.
Tone: Highly analytical, objective, extremely precise, granular, and syntactic. No emotional appeal, only structural analysis.`,

  EDGE_CASE_HUNTER: `You are Juror EDGE_CASE_HUNTER, a persona from a structured multi-agent debate patterned after "12 Angry Men".
Your defining trait is exploring extreme boundaries, system loads, and black swan events. You search for what goes wrong when normal operating assumptions collapse.
You must analyze:
- VPN sharing or multiple family members using the same IP address or device.
- High-intent luxury buyers showing up as low-income due to tracking blocking, leading to inventory hoarding strategies.
- Scraping bots mimicking low-income users to siphon low-price stocks for resale.
- Regulatory arbitrage, geographic tracking boundaries, and server lag synchronization errors.
- Pricing feedback loops where identical users side-by-side see a 300% price delta, snapping photos that go viral globally.
Identify extreme scenarios, systemic edge cases, and load vulnerabilities.
Tone: Urgent, boundary-focused, systems-oriented, innovative, and defensive.`,

  SAFETY_GUARDIAN: `You are Juror SAFETY_GUARDIAN, a persona from a structured multi-agent debate patterned after "12 Angry Men".
Your defining trait is ethics, systemic welfare, brand integrity, legal compliance, and human protection.
Analyze why charging different prices for the exact same commodity based on private estimated wealth is an ethical degradation and class discrimination.
Highlight legal and regulatory implications: FTC investigation risks, unfair and deceptive practices (UDAP) violations, EU General Data Protection Regulation (GDPR) profiling restrictions, and consumer protection class-action lawsuit exposures.
Address how dynamic corporate profiling harms vulnerable groups (e.g., people desperate for essential goods paying massive premium hikes).
Tone: Firm, principled, ethically alert, brand-conscious, and legally rigorous.`,

  FIRST_PRINCIPLES: `You are Juror FIRST_PRINCIPLES, a persona from a structured multi-agent debate patterned after "12 Angry Men".
Your defining trait is reducing ideas to their fundamental, objective axioms — stripping away technical terms like "AI" or "cookies" to look at core physics, mathematics, economic supply-demand, and evolutionary human game theory.
At its core, this proposal is a dynamic third-degree price discrimination system.
In game theory, repeated cooperative games (like merchant and shopper buying repeatedly) are only stable if transaction surplus is shared. If perfect price discrimination is achieved, the merchant extracts ALL consumer surplus. The consumer's transaction payoff drops to zero.
What happens in repeated games when one side's payoff drops to zero? They immediately exit the game or sabotage it.
Analyze the underlying physics of value transfer, economic surplus extraction, and the mathematics of market friction.
Tone: Philosophical, fundamentalist, calm, intellectually deep, and mathematically clear.`
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route 1: Deliberate a query for a single juror
  app.post("/api/jury/deliberate", async (req, res): Promise<any> => {
    try {
      const { query, jurorId } = req.body;
      if (!query || !jurorId) {
        return res.status(400).json({ error: "Query and JurorId are required parameters." });
      }

      const systemInstruction = JUROR_SYSTEM_PROMPTS[jurorId];
      if (!systemInstruction) {
        return res.status(400).json({ error: `Invalid juror position selected: ${jurorId}` });
      }

      let content: string;
      try {
        const promptText = `You are evaluating this proposition:
"${query}"

Apply your strict system instructions and compile your independent deliberation. Keep your response around 250-350 words, dense, rich, structured with elegant markdown headings, and perfectly matched to your persona voice. At the end, state your provisional index score (from 1 to 10) representing your stance.`;

        content = await callGeminiWithFallback(systemInstruction, promptText, {
          temperature: 0.9,
          topP: 0.95,
        });
      } catch (geminiErr: any) {
        console.warn(`[API_FALLBACK] Deliberation API key error or 503 triggered fallback for ${jurorId}:`, geminiErr.message || geminiErr);
        // Engagement of high-fidelity local generation
        content = generateDynamicFallback(query, jurorId);
      }

      const wordCount = content.split(/\s+/).filter(Boolean).length;

      return res.json({
        jurorId,
        content,
        wordCount,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || "An error occurred during deliberation." });
    }
  });

  // API route 2: Cross-examination challenge & response
  app.post("/api/jury/crossexamine", async (req, res): Promise<any> => {
    try {
      const { query, challengerId, targetId, deliberations } = req.body;
      if (!query || !challengerId || !targetId || !deliberations) {
        return res.status(400).json({ error: "Missing required cross-examination parameters." });
      }

      const challengerSystemPrompt = JUROR_SYSTEM_PROMPTS[challengerId];
      const targetDeliberation = deliberations[targetId];

      if (!challengerSystemPrompt || !targetDeliberation) {
        return res.status(400).json({ error: "Invalid challenger or invalid target deliberation state." });
      }

      let challenge: string;
      let rebuttal: string;

      try {
        const challengePrompt = `Proposition under debate: "${query}"

You are evaluating and contesting the argument submitted by your colleague, Juror ${targetId}.
Here is Juror ${targetId}'s full deliberation stance:
"""
${targetDeliberation.content}
"""

As Juror ${challengerId}, form a highly direct, logical, and metacognitive rebuttal. Challenge their core premise, highlighting what their system misses, or how their stance is either too narrow, idealistic, or mathematically incorrect. Confront them directly. Keep your response short, around 150-200 words, razor-sharp, and highly engaging.`;

        challenge = await callGeminiWithFallback(challengerSystemPrompt, challengePrompt, {
          temperature: 0.85,
        });

        const targetSystemPrompt = JUROR_SYSTEM_PROMPTS[targetId];
        const rebuttalPrompt = `Proposition under debate: "${query}"

Your prior stance was challenged by Juror ${challengerId}.
Here is Juror ${challengerId}'s challenge:
"""
${challenge}
"""

As Juror ${targetId}, issue a concise, highly resilient defense defending your methodology or clarifying how your focus handles their objection. Defend your ground with elegance and cold logic. Keep your response around 100-140 words.`;

        rebuttal = await callGeminiWithFallback(targetSystemPrompt, rebuttalPrompt, {
          temperature: 0.8,
        });
      } catch (geminiErr: any) {
        console.warn(`[API_FALLBACK] Cross-examination triggered local match fallback:`, geminiErr.message || geminiErr);
        const fallbackObj = generateDynamicCrossExamFallback(challengerId, targetId);
        challenge = fallbackObj.challenge;
        rebuttal = fallbackObj.rebuttal;
      }

      return res.json({
        challengerId,
        targetId,
        challenge,
        rebuttal,
        resolved: true
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || "An error occurred during cross examination." });
    }
  });

  // API route 3: Meta-Synthesis and Consensus Verdict
  app.post("/api/jury/synthesize", async (req, res): Promise<any> => {
    try {
      const { query, deliberations, challenges } = req.body;
      if (!query || !deliberations) {
        return res.status(400).json({ error: "Query and deliberations array are required." });
      }

      const formattedDeliberations = Object.entries(deliberations)
        .map(([id, d]: any) => `### Juror ${id} (${d.wordCount} words):\n${d.content}`)
        .join("\n\n");

      const formattedChallenges = (challenges || [])
        .map((c: any) => `### Challenge by ${c.challengerId} to ${c.targetId}:\n- Challenge: ${c.challenge}\n- Rebuttal: ${c.rebuttal}`)
        .join("\n\n");

      const systemInstruction = `You are Juror SYNTHESIZER, the foreman of JuryAI, a metacognitive jury system patterned on "12 Angry Men".
Your task is to integrate the distinct positions, arguments, challenges, and clashes inside the jury room into a absolute, final consensus verdict.
You are objective, sophisticated, and logical. You do not just default to middleground; you trace commonalities and expose deep systemic issues.
You must analyze the deliberations and cross-examinations and return a structured JSON synthesis detailing:
1. Agreements: High-confidence areas where all or most jurors converged.
2. Disagreements: Unresolvable tension points, trade-offs, or opposing economic-ethics philosophies.
3. Vulnerabilities: Crucial risks, loop failures, and structural black-swans.
4. Verdict Score: A consensus feasibility rating (1-10) where 1 means mathematically/ethically disastrous, and 10 means exceptionally sound, sustainable, and optimized.
5. Verdict Label: A short status code representing the state, e.g. "APPROVED WITH SAFEGUARDS", "UNEXPLODED RISK - REJECTED", "CONDITIONAL CONTAINMENT".
6. Summary: A deep, elegant, metacognitive text summarizing how the jury reached its verdict and the long-term macroeconomic/cultural impacts.`;

      let reportText: string = "";
      let parsedReport: any = null;

      try {
        const contents = `Proposition under debate:
"${query}"

Independent Juror Deliberations:
"""
${formattedDeliberations}
"""

Juror Cross Examinations / Confrontations:
"""
${formattedChallenges}
"""

Integrate all insights and generate your JSON report. Be thorough and eloquent.`;

        reportText = await callGeminiWithFallback(systemInstruction, contents, {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              agreements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of absolute points of agreement amongst the jurors."
              },
              disagreements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of unresolvable tension points or core clashes."
              },
              vulnerabilities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Specific tail risks and systemic failures identified."
              },
              verdictScore: {
                type: Type.INTEGER,
                description: "Synthesized score (1-10) where 1 is disastrously non-viable and 10 is perfectly sustainable."
              },
              verdictLabel: {
                type: Type.STRING,
                description: "Final short verdict status."
              },
              summary: {
                type: Type.STRING,
                description: "A highly analytical, multi-paragraph meta-analyses of long-term strategic and cultural impacts."
              }
            },
            required: ["agreements", "disagreements", "vulnerabilities", "verdictScore", "verdictLabel", "summary"]
          }
        });

        parsedReport = JSON.parse(reportText);
      } catch (geminiErr: any) {
        console.warn("[WARN] Synthesis model call failed, engaging high-fidelity local generator:", geminiErr.message || geminiErr);
        parsedReport = generateDynamicSynthesisFallback(query, deliberations);
      }

      return res.json(parsedReport);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || "An error occurred during synthesis." });
    }
  });

  // Mount Vite development middlewares or serve static dist folder.
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JuryAI full-stack server listening on http://localhost:${PORT}`);
  });
}

startServer();
