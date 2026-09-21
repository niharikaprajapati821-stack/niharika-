import React, { useState } from 'react';
import { ScamAdvisory } from '../types';
import { EMERGENCY_PHRASES } from '../data/mockData';

interface SafetyScamsViewProps {
  scams: ScamAdvisory[];
  onBackToArrival: () => void;
}

export const SafetyScamsView: React.FC<SafetyScamsViewProps> = ({ scams, onBackToArrival }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>('');

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakingPhrase(text);
      utterance.onend = () => setSpeakingPhrase(null);
      utterance.onerror = () => setSpeakingPhrase(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setReportText('');
    setTimeout(() => setReportSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn pt-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full w-fit mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Kansai Tourism Safety Bureau
            </span>
          </div>
          <h1 className="font-editorial text-[32px] sm:text-[40px] text-on-surface">
            Safety Radar &amp; Honest Guidance
          </h1>
          <p className="font-sans text-[15px] text-secondary">
            Kyoto remains one of the world's safest cities. These advisories prevent minor commercial exploitation.
          </p>
        </div>

        <button
          onClick={onBackToArrival}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-sans text-[12px] font-semibold transition-colors border border-surface-container-highest cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Arrival Brief
        </button>
      </div>

      {/* Emergency Hotlines Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase text-secondary">Police / Theft</span>
              <span className="w-2 h-2 rounded-full bg-error" />
            </div>
            <div className="text-[28px] font-bold font-sans text-on-surface">110</div>
            <p className="font-sans text-[12px] text-secondary mt-1">Police box (Koban) emergency dispatch. English translation available on line.</p>
          </div>
          <button
            onClick={() => handleCopy('110')}
            className="mt-4 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-sans font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            {copiedNumber === '110' ? 'Copied 110!' : 'Copy 110'}
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase text-secondary">Fire / Ambulance</span>
              <span className="w-2 h-2 rounded-full bg-error" />
            </div>
            <div className="text-[28px] font-bold font-sans text-on-surface">119</div>
            <p className="font-sans text-[12px] text-secondary mt-1">Medical emergency and ambulance response. Free service throughout Japan.</p>
          </div>
          <button
            onClick={() => handleCopy('119')}
            className="mt-4 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-sans font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            {copiedNumber === '119' ? 'Copied 119!' : 'Copy 119'}
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase text-secondary">Tourist SOS</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="text-[24px] font-bold font-sans text-primary mt-1">#9110</div>
            <p className="font-sans text-[12px] text-secondary mt-1">Non-emergency police consultation, lost passports, and general assistance.</p>
          </div>
          <button
            onClick={() => handleCopy('#9110')}
            className="mt-4 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-sans font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            {copiedNumber === '#9110' ? 'Copied #9110!' : 'Copy #9110'}
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase text-secondary">Japan Visitor Hotline</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="text-[18px] font-bold font-sans text-on-surface mt-2">050-3816-2787</div>
            <p className="font-sans text-[12px] text-secondary mt-1">24/7 JNTO multilingual support in English, Chinese, and Korean.</p>
          </div>
          <button
            onClick={() => handleCopy('050-3816-2787')}
            className="mt-4 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-sans font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            {copiedNumber === '050-3816-2787' ? 'Copied Number!' : 'Copy Hotline'}
          </button>
        </div>
      </div>

      {/* Verified Scam Patterns */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">Pattern Recognition</span>
            <h2 className="font-editorial text-[24px] text-on-surface">Verified Advisory Catalog</h2>
          </div>
          <span className="font-sans text-[12px] text-secondary">Updated real-time from official reports</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scams.map((scam) => (
            <div
              key={scam.id}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-sans text-[11px] font-bold">
                    {scam.patternNumber}
                  </span>
                  <span className="font-sans text-[11px] text-outline">{scam.location}</span>
                </div>
                <h3 className="font-sans font-semibold text-[18px] text-on-surface mb-2">{scam.title}</h3>
                <p className="font-sans text-[13px] text-secondary leading-relaxed mb-4">{scam.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-2.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">verified</span>
                <div className="text-[13px] font-sans leading-snug">
                  <strong className="text-on-surface">{scam.countermeasureLabel}:</strong> {scam.countermeasure}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Phrases with Speech Audio */}
      <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container-highest mb-12">
        <div className="mb-6">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-primary">Voice &amp; Flashcards</span>
          <h2 className="font-editorial text-[24px] text-on-surface">Essential Japanese Safety Phrases</h2>
          <p className="font-sans text-[13px] text-secondary">Tap the speaker icon to play high-clarity Japanese pronunciation to station staff or officers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_PHRASES.map((phrase, idx) => {
            const isSpeaking = speakingPhrase === phrase.japanese;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans text-[11px] font-bold uppercase text-outline">{phrase.situation}</span>
                    <button
                      onClick={() => handleSpeak(phrase.japanese)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-primary text-on-primary animate-pulse'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                      title="Speak phrase out loud"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isSpeaking ? 'volume_up' : 'volume_up'}
                      </span>
                    </button>
                  </div>
                  <div className="font-sans font-bold text-[18px] text-on-surface mt-1">{phrase.japanese}</div>
                  <div className="font-sans text-[13px] text-primary font-medium">{phrase.romaji}</div>
                  <p className="font-sans text-[13px] text-secondary mt-2">"{phrase.english}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Report Section */}
      <section className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest">
        <h3 className="font-sans font-semibold text-[16px] text-on-surface mb-2">Report an Unofficial Tout or Lost Item</h3>
        <p className="font-sans text-[13px] text-secondary mb-4">
          Help Kansai Tourism Bureau keep travelers safe. Submissions are reviewed by bilingual dispatch coordinators.
        </p>

        {reportSubmitted ? (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-sans text-[13px] font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
            Thank you, Maya. Your report has been logged with the Kansai Tourism Safety desk.
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-3">
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe location, incident, or tout behavior..."
              rows={3}
              className="w-full p-3 rounded-xl border border-surface-container-highest bg-surface-container-low text-on-surface text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-sans text-[12px] font-semibold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Submit Confidential Advisory
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
