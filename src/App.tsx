import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Zap, 
  Copy, 
  Printer, 
  X, 
  Check, 
  Filter, 
  Info, 
  AlertOctagon,
  Sparkles
} from 'lucide-react';

interface Clause {
  id: string;
  originalText: string;
  plainEnglish: string;
  severity: 'critical' | 'warning' | 'info';
  whyItMatters: string;
}

interface AnalysisResult {
  riskScore: number;
  riskLabel: string;
  flaggedClauses: Clause[];
  keyTakeaways: string[];
}

export default function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [copied, setCopied] = useState(false);
  const [copiedClauseId, setCopiedClauseId] = useState<string | null>(null);

  const presets = {
    instagram: {
      title: "📱 Instagram T&C",
      text: "By using our Service, you grant Meta a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, and translate your Content. We may utilize your interactions, posted media, and behavioral telemetry to train proprietary artificial intelligence models and share contextual metadata with vetted third-party commercial partners without further explicit notification. Any controversies or claims arising out of this agreement shall be determined by binding individual arbitration administered by the American Arbitration Association, waiving all rights to class action proceedings or trial by jury."
    },
    spotify: {
      title: "🎵 Spotify Terms",
      text: "Your Paid Subscription will automatically renew at the end of each subscription period at the standard retail price unless you terminate your Paid Subscription through your account subscription page at least 48 hours prior to the end of the current billing cycle. Spotify reserves the unilateral right to amend subscription fees upon fourteen days electronic notice and continued usage constitutes irrevocable acceptance of new pricing tiers. All subscription payments and charges are strictly non-refundable regardless of service utilization or partial-month cancellation."
    },
    rental: {
      title: "🏠 Rental Lease",
      text: "Lessor reserves the unrestricted right to access the demised premises at any hour without prior written notification for inspection or maintenance purposes. Any early termination of this Lease by Lessee regardless of cause or statutory hardship shall result in immediate and unconditional forfeiture of the full Security Deposit in addition to liquidated damages equivalent to three months standard rental fee. Overnight guests residing for more than forty-eight consecutive hours without written management authorization will incur a mandatory surcharge of $150 per diurnal period."
    },
    nda: {
      title: "💼 Freelance NDA",
      text: "Contractor hereby irrevocably assigns to Company all right, title, and interest worldwide in and to any intellectual property, inventions, ideas, software, or creative works developed during the performance of services. Contractor agrees not to engage, directly or indirectly, in any business competing with Company for a period of five (5) years post-termination within any geographical market. Contractor assumes uncapped personal financial liability for any incidental or consequential damages resulting from breach of confidentiality."
    }
  };

  const runAnalysis = () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setAnalysis(null);
    setScanStep('Scanning text patterns & legalese...');

    setTimeout(() => setScanStep('Evaluating data privacy & liability risks...'), 600);
    setTimeout(() => setScanStep('Translating clauses into plain English...'), 1200);

    setTimeout(() => {
      let mockResult: AnalysisResult;

      const lowerText = text.toLowerCase();

      if (lowerText.includes('spotify') || lowerText.includes('renew') || lowerText.includes('subscription')) {
        mockResult = {
          riskScore: 68,
          riskLabel: 'Moderate Risk',
          flaggedClauses: [
            {
              id: '1',
              originalText: "automatically renew at the end of each subscription period at the standard retail price unless you terminate at least 48 hours prior",
              plainEnglish: "Your card will keep getting charged automatically every billing cycle unless you remember to cancel 2 days early.",
              severity: 'warning',
              whyItMatters: "Unintended recurring financial charges if you forget the cancellation window."
            },
            {
              id: '2',
              originalText: "unilateral right to amend subscription fees upon fourteen days electronic notice",
              plainEnglish: "They can raise your monthly price with just 2 weeks email notice.",
              severity: 'warning',
              whyItMatters: "Service costs can increase without explicit agreement renewal."
            },
            {
              id: '3',
              originalText: "All subscription payments and charges are strictly non-refundable regardless of service utilization",
              plainEnglish: "No refunds ever, even if you didn't use the account or canceled late.",
              severity: 'critical',
              whyItMatters: "Immediate loss of disputed funds with zero clawback options."
            }
          ],
          keyTakeaways: [
            "Silent recurring auto-renewal billing model",
            "Price hikes allowed with only 14 days notice",
            "Strict non-refundable payment terms"
          ]
        };
      } else if (lowerText.includes('rental') || lowerText.includes('lessor') || lowerText.includes('deposit')) {
        mockResult = {
          riskScore: 88,
          riskLabel: 'High Risk',
          flaggedClauses: [
            {
              id: '1',
              originalText: "unrestricted right to access the demised premises at any hour without prior written notification",
              plainEnglish: "Landlord can enter your home anytime without advance warning.",
              severity: 'critical',
              whyItMatters: "Complete loss of residential privacy rights."
            },
            {
              id: '2',
              originalText: "early termination... shall result in immediate and unconditional forfeiture of the full Security Deposit",
              plainEnglish: "If you move out early for any reason, you automatically lose 100% of your deposit.",
              severity: 'critical',
              whyItMatters: "Severe financial penalty even during emergency moves."
            },
            {
              id: '3',
              originalText: "Overnight guests residing for more than forty-eight consecutive hours... surcharge of $150",
              plainEnglish: "Guests staying over 2 nights trigger a mandatory $150 fine per day.",
              severity: 'warning',
              whyItMatters: "Restrictions on social visits and personal visitors."
            }
          ],
          keyTakeaways: [
            "Landlord can enter without 24-hour prior notice",
            "100% security deposit forfeiture upon early leave",
            "Heavy daily financial penalties for staying guests"
          ]
        };
      } else if (lowerText.includes('assigns') || lowerText.includes('competing') || lowerText.includes('freelance')) {
        mockResult = {
          riskScore: 92,
          riskLabel: 'Critical Risk',
          flaggedClauses: [
            {
              id: '1',
              originalText: "irrevocably assigns to Company all right, title, and interest worldwide in and to any intellectual property",
              plainEnglish: "Everything you create or invent belongs 100% to the company forever.",
              severity: 'critical',
              whyItMatters: "Complete surrender of personal intellectual property rights."
            },
            {
              id: '2',
              originalText: "not engage, directly or indirectly, in any business competing... for a period of five (5) years",
              plainEnglish: "You cannot work in your industry or field for 5 whole years after leaving.",
              severity: 'critical',
              whyItMatters: "Unreasonable restriction on future employment income."
            },
            {
              id: '3',
              originalText: "assumes uncapped personal financial liability for any incidental or consequential damages",
              plainEnglish: "If confidential info leaks, your personal savings and assets can be sued unlimitedly.",
              severity: 'critical',
              whyItMatters: "Exposes personal bank accounts and assets to lawsuits."
            }
          ],
          keyTakeaways: [
            "Total loss of personal creative IP ownership",
            "Aggressive 5-year non-compete clause",
            "Uncapped personal financial legal liability"
          ]
        };
      } else {
        // Default / Instagram preset response
        mockResult = {
          riskScore: 78,
          riskLabel: 'High Risk',
          flaggedClauses: [
            {
              id: '1',
              originalText: "royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, modify... and create derivative works",
              plainEnglish: "They can reuse, edit, and license your photos and posts globally without paying you anything.",
              severity: 'critical',
              whyItMatters: "Your personal content can be commercially distributed by third parties."
            },
            {
              id: '2',
              originalText: "utilize your interactions, posted media, and behavioral telemetry to train proprietary artificial intelligence models",
              plainEnglish: "Your private media, captions, and activity are fed into AI models without option to opt out.",
              severity: 'warning',
              whyItMatters: "Personal media permanently embedded in commercial AI datasets."
            },
            {
              id: '3',
              originalText: "determined by binding individual arbitration... waiving all rights to class action proceedings or trial by jury",
              plainEnglish: "You waive your constitutional right to sue them in court or join class-action lawsuits.",
              severity: 'critical',
              whyItMatters: "Strips away your primary legal protection in corporate disputes."
            }
          ],
          keyTakeaways: [
            "Commercial reuse rights over user media content",
            "Non-consensual AI model training on personal posts",
            "Binding arbitration strips right to court trials"
          ]
        };
      }

      setAnalysis(mockResult);
      setIsLoading(false);
    }, 1600);
  };

  const handleCopySummary = () => {
    if (!analysis) return;
    const summary = `🛡️ T&Shield Analysis Summary\nRisk Score: ${analysis.riskScore}/100 (${analysis.riskLabel})\n\nKey Takeaways:\n${analysis.keyTakeaways.map(t => `• ${t}`).join('\n')}\n\nAnalyzed at: T&Shield Legal Scanner`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyClause = (id: string, clauseText: string) => {
    navigator.clipboard.writeText(clauseText);
    setCopiedClauseId(id);
    setTimeout(() => setCopiedClauseId(null), 1500);
  };

  const filteredClauses = analysis?.flaggedClauses.filter(clause => {
    if (activeFilter === 'all') return true;
    return clause.severity === activeFilter;
  }) || [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              T&Shield
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700/60 px-3 py-1 rounded-full font-medium">
              HackDevengers 2.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Legal Jargon Killer
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Stop Blindly Clicking <span className="text-emerald-400">"I Agree"</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Paste any agreement, contract, or T&C below. T&Shield isolates predatory clauses, flags financial traps, and translates legalese into plain English.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#1e293b]/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your legal document, lease, or terms of service here..."
              className="w-full h-44 bg-[#0f172a]/90 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none font-mono"
            />
            {text && (
              <button
                onClick={() => setText('')}
                className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition"
                title="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono">
              {text.length} / 10,000 chars
            </div>
          </div>

          {/* Sample Presets */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              ⚡ Try a real-world sample preset:
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(presets).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setText(item.text)}
                  className="px-3 py-2 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg text-slate-300 hover:text-white transition text-left truncate"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={runAnalysis}
            disabled={isLoading || !text.trim()}
            className="w-full py-3.5 px-6 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 text-base"
          >
            {isLoading ? (
              <>
                <Zap className="w-5 h-5 animate-spin text-slate-950" />
                <span>{scanStep}</span>
              </>
            ) : (
              <>
                <span>Analyze Document</span>
                <Zap className="w-5 h-5 fill-slate-950" />
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Risk Gauge Card */}
            <div className="bg-[#1e293b]/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 ${
                  analysis.riskScore >= 70 ? 'border-red-500 bg-red-500/10 text-red-400' :
                  analysis.riskScore >= 40 ? 'border-amber-500 bg-amber-500/10 text-amber-400' :
                  'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                }`}>
                  <div className="text-center">
                    <span className="text-3xl font-extrabold block leading-none">{analysis.riskScore}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">/ 100 Risk</span>
                  </div>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    analysis.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    analysis.riskScore >= 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {analysis.riskLabel}
                  </span>
                  <h3 className="text-xl font-bold text-white">Document Risk Rating</h3>
                  <p className="text-xs text-slate-400">
                    {analysis.flaggedClauses.length} clauses flagged requiring user attention.
                  </p>
                </div>
              </div>

              {/* Action Utilities */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-[#1e293b]/50 border border-slate-800/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Executive Takeaways
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {analysis.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="bg-[#0f172a]/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" /> Flagged Clauses
              </h4>
              
              <div className="flex items-center gap-1 bg-[#0f172a] p-1 rounded-xl border border-slate-800 text-xs">
                {(['all', 'critical', 'warning', 'info'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition ${
                      activeFilter === f 
                        ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Clause Cards List */}
            <div className="space-y-4">
              {filteredClauses.map((clause) => (
                <div 
                  key={clause.id} 
                  className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      clause.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      clause.severity === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {clause.severity}
                    </span>
                    <button
                      onClick={() => handleCopyClause(clause.id, clause.originalText)}
                      className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition"
                      title="Copy original quote"
                    >
                      {copiedClauseId === clause.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="text-[11px]">{copiedClauseId === clause.id ? 'Copied' : 'Quote'}</span>
                    </button>
                  </div>

                  {/* Original Legal Quote */}
                  <div className="bg-[#0f172a]/90 p-3.5 rounded-xl border border-red-500/10 text-xs font-mono text-slate-300 leading-relaxed">
                    <span className="text-red-400 font-bold mr-1.5">"</span>
                    {clause.originalText}
                    <span className="text-red-400 font-bold ml-1.5">"</span>
                  </div>

                  {/* Plain English Translation */}
                  <div className="bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/20 text-xs text-slate-200 space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5" /> Plain English Translation:
                    </div>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {clause.plainEnglish}
                    </p>
                  </div>

                  {/* Why It Matters */}
                  <div className="text-[11px] text-slate-400 italic flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span><strong className="not-italic text-slate-300">Why it matters:</strong> {clause.whyItMatters}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 border-t border-slate-800/80 mt-12 text-center space-y-2 text-xs text-slate-500">
        <p>Built for <strong>HackDevengers 2.0</strong></p>
        <p className="text-[11px] text-slate-600">T&Shield is an AI educational tool. Not a substitute for formal legal counsel.</p>
      </footer>
    </div>
  );
}
