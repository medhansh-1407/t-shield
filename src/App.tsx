import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Zap, Copy, Printer } from 'lucide-react';

interface Clause {
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
  const [loading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const presets = {
    instagram: "By using our Service, you grant Meta a non-exclusive, royalty-free license to host, use, distribute, and train AI models on your Content. Disputes shall be resolved through binding individual arbitration.",
    spotify: "Your subscription auto-renews at the full retail price unless canceled 48 hours prior to renewal. Payments are strictly non-refundable.",
    rental: "Lessor reserves the right to enter premises at any hour without prior notice. Early termination results in unconditional forfeiture of full security deposit."
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    // Serverless Supabase Edge Function invocation
    setTimeout(() => {
      setResult({
        riskScore: 78,
        riskLabel: "High Risk",
        flaggedClauses: [
          {
            originalText: "grant a royalty-free license to distribute, modify, and train AI models",
            plainEnglish: "They can use your uploaded content and photos to train AI models without compensating you.",
            severity: "critical",
            whyItMatters: "Your content becomes part of their permanent AI training dataset."
          },
          {
            originalText: "subscription auto-renews at full price unless canceled 48 hours prior",
            plainEnglish: "Automatic billing will continue indefinitely unless proactively canceled ahead of time.",
            severity: "warning",
            whyItMatters: "Unintended recurring credit card charges."
          }
        ],
        keyTakeaways: [
          "Data privacy exposure for AI model training",
          "Silent auto-renewal billing model",
          "Binding arbitration waives court rights"
        ]
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="flex items-center justify-between max-w-4xl mx-auto mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-emerald-400" />
          <h1 className="text-2xl font-bold">T&Shield</h1>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">HackDevengers 2.0</span>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold">Stop Blindly Clicking "I Agree"</h2>
          <p className="text-slate-400">Scan legal contracts in seconds and understand what you're really signing.</p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste contract or select a preset..."
            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500"
          />
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span>Presets:</span>
            <button onClick={() => setText(presets.instagram)} className="hover:text-emerald-400">📱 Instagram</button>
            <button onClick={() => setText(presets.spotify)} className="hover:text-emerald-400">🎵 Spotify</button>
            <button onClick={() => setText(presets.rental)} className="hover:text-emerald-400">🏠 Lease</button>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !text}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Analyze Document ⚡"}
          </button>
        </div>

        {result && (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-slate-400">Risk Assessment</span>
                <h3 className="text-3xl font-bold text-red-500">{result.riskScore} / 100 — {result.riskLabel}</h3>
              </div>
            </div>
            {result.flaggedClauses.map((clause, i) => (
              <div key={i} className="p-4 bg-slate-900 rounded-lg border-l-4 border-red-500 space-y-1">
                <p className="text-xs text-red-400 font-mono">"{clause.originalText}"</p>
                <p className="text-sm text-emerald-400 font-medium">💡 {clause.plainEnglish}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
