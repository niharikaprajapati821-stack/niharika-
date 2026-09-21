import React, { useState } from 'react';
import { Spot, SpotTier, LocationContext, ScamAdvisory, EtiquetteItem } from '../types';

interface ArrivalFeedViewProps {
  location: LocationContext;
  spots: Spot[];
  scams: ScamAdvisory[];
  etiquetteList: EtiquetteItem[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (spotId: string) => void;
  onSelectSpot: (spot: Spot) => void;
  onOpenAudioBrief: () => void;
  onOpenOfflinePack: () => void;
  onOpenCurrencyCalc: () => void;
  onOpenSafetyDetails: () => void;
  onNavigateToTransit: () => void;
}

export const ArrivalFeedView: React.FC<ArrivalFeedViewProps> = ({
  location,
  spots,
  scams,
  etiquetteList,
  bookmarkedIds,
  onToggleBookmark,
  onSelectSpot,
  onOpenAudioBrief,
  onOpenOfflinePack,
  onOpenCurrencyCalc,
  onOpenSafetyDetails,
  onNavigateToTransit
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<SpotTier>('all');
  const [showGlancePill, setShowGlancePill] = useState<boolean>(true);
  const [isPlayingAudioQuick, setIsPlayingAudioQuick] = useState<boolean>(false);

  // Filter spots based on tier
  const filteredSpots = spots.filter(spot => {
    if (selectedTier === 'all') return true;
    return spot.tier === selectedTier;
  });

  const handleCategoryClick = (category: string, elementId?: string) => {
    setActiveCategory(category);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAudioButtonClick = () => {
    setIsPlayingAudioQuick(!isPlayingAudioQuick);
    onOpenAudioBrief();
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn">
      {/* Dynamic Ambient Arrival Banner */}
      <section className="w-full pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Live Context · {location.ward}
              </span>
            </div>
            <h1 className="font-editorial text-[32px] sm:text-[40px] md:text-[48px] text-on-surface tracking-tight leading-tight">
              Welcome to {location.city}, Maya. Here is your calm arrival brief.
            </h1>
            <p className="font-sans text-[15px] text-secondary flex flex-wrap items-center gap-2">
              <span>Local time {location.timeJST}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  {location.weather.icon}
                </span>
                {location.weather.condition} {location.weather.temp}°C
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
              <span>{location.areaLabel}</span>
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAudioButtonClick}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xs transition-all cursor-pointer ${
                isPlayingAudioQuick
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface'
              }`}
              id="transit-audio-btn"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${isPlayingAudioQuick ? 'text-white' : 'text-primary'}`}>
                {isPlayingAudioQuick ? 'pause' : 'hearing'}
              </span>
              <span className="font-sans text-[12px] font-semibold">
                {isPlayingAudioQuick ? 'Playing Audio Brief...' : 'Audio Orientation (1m)'}
              </span>
            </button>

            <button
              onClick={onOpenOfflinePack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary transition-all shadow-xs cursor-pointer"
              type="button"
              id="offline-pack-btn"
            >
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
              <span className="font-sans text-[12px] font-semibold">Offline Guide Pack</span>
            </button>
          </div>
        </div>

        {/* Category Segment Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-5 py-2 rounded-full font-sans text-[12px] shadow-xs transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            All Essentials
          </button>
          <button
            onClick={() => handleCategoryClick('transit', 'transit-baseline-section')}
            className={`px-5 py-2 rounded-full font-sans text-[12px] shadow-xs transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'transit'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            Transit Fares &amp; IC
          </button>
          <button
            onClick={() => handleCategoryClick('spots', 'curated-spots-section')}
            className={`px-5 py-2 rounded-full font-sans text-[12px] shadow-xs transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'spots'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            Curated Neighborhood Spots
          </button>
          <button
            onClick={() => handleCategoryClick('scam', 'fraud-watch-section')}
            className={`px-5 py-2 rounded-full font-sans text-[12px] shadow-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'scam'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">shield</span>
            Scam Radar
          </button>
          <button
            onClick={() => handleCategoryClick('etiquette', 'cultural-etiquette-section')}
            className={`px-5 py-2 rounded-full font-sans text-[12px] shadow-xs transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'etiquette'
                ? 'bg-primary text-on-primary font-semibold'
                : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            Cultural Etiquette
          </button>
        </div>
      </section>

      {/* The "Arrival Snapshot" Hero Capsule Cards */}
      <section id="transit-baseline-section" className="w-full mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Transit Baseline */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container-highest/60 hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">train</span>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                    Mobility
                  </span>
                  <h2 className="font-sans font-semibold text-[16px] text-on-surface">Transit Baseline</h2>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-sans text-[11px] font-bold">
                JR &amp; Metro
              </span>
            </div>
            <div className="my-5 flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[13px] text-secondary">Subway Base Fare</span>
                <span className="font-sans text-[20px] text-on-surface font-semibold">
                  {location.baseSubwayFare}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[13px] text-secondary">Taxi Flag-Drop</span>
                <span className="font-sans text-[20px] text-on-surface font-semibold">
                  {location.taxiFlagDrop} <span className="font-sans text-[13px] text-outline font-normal">/ 1.2km</span>
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onNavigateToTransit}
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-2.5 text-on-surface-variant text-left transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
              contactless
            </span>
            <p className="font-sans text-[13px] leading-tight flex-1">
              IC Card (Suica / Pasmo / ICOCA) tap-to-go on all city buses &amp; subways.
            </p>
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Card 2: Safety Index & Emergency */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container-highest/60 hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                    Security
                  </span>
                  <h2 className="font-sans font-semibold text-[16px] text-on-surface">Safety Index</h2>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-sans text-[11px] font-bold">
                Level 1 · Safe
              </span>
            </div>
            <div className="my-5 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-secondary">Police (Koban)</span>
                <span className="font-sans text-[20px] text-on-surface font-semibold">110</span>
              </div>
              <div className="h-8 w-px bg-surface-container-high" />
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-secondary">Fire / Medical</span>
                <span className="font-sans text-[20px] text-on-surface font-semibold">119</span>
              </div>
              <div className="h-8 w-px bg-surface-container-high" />
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-secondary">Tourist SOS</span>
                <span className="font-sans text-[16px] text-primary font-semibold">#9110</span>
              </div>
            </div>
          </div>
          <button
            onClick={onOpenSafetyDetails}
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-2.5 text-on-surface-variant text-left transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
              support_agent
            </span>
            <p className="font-sans text-[13px] leading-tight flex-1">
              24/7 Multilingual Japan Visitor Hotline available via tap or VOIP.
            </p>
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Card 3: Currency Quick-Math */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container-highest/60 hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                    Reference
                  </span>
                  <h2 className="font-sans font-semibold text-[16px] text-on-surface">Currency Math</h2>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-sans text-[11px] font-bold">
                $1 = ¥155.20
              </span>
            </div>
            <div className="my-4 grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-secondary">Quick Benchmark</span>
                <span className="font-sans font-semibold text-[16px] text-on-surface mt-0.5">¥1,000 ≈ $6.45</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-secondary">Hand Drip Coffee</span>
                <span className="font-sans font-semibold text-[16px] text-on-surface mt-0.5">~¥550 ($3.50)</span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface-variant">
            <span className="font-sans text-[13px]">
              Conbini lunch avg: <strong>¥720</strong> ($4.65)
            </span>
            <button
              onClick={onOpenCurrencyCalc}
              className="text-primary font-sans text-[11px] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
              type="button"
            >
              Calc tool →
            </button>
          </div>
        </div>
      </section>

      {/* Primary Section 1: Curated Spots by Tiers */}
      <section id="curated-spots-section" className="w-full mt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-sans text-[11px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span>Curated Spots Near You</span>
            </div>
            <h2 className="font-editorial text-[24px] sm:text-[28px] text-on-surface">
              Selected for mindful discovery, zero clutter.
            </h2>
          </div>

          {/* Tier selector tabs */}
          <div className="flex items-center gap-1 p-1 bg-surface-container rounded-full shrink-0 overflow-x-auto no-scrollbar" id="tier-filter-container">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === 'all'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              All Tiers
            </button>
            <button
              onClick={() => setSelectedTier('budget')}
              className={`px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === 'budget'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Pocket-Friendly $
            </button>
            <button
              onClick={() => setSelectedTier('iconic')}
              className={`px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === 'iconic'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Iconic $$
            </button>
            <button
              onClick={() => setSelectedTier('gem')}
              className={`px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === 'gem'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Hidden Gem $$$
            </button>
            <button
              onClick={() => setSelectedTier('fine')}
              className={`px-4 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === 'fine'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
              type="button"
            >
              Splurge $$$$
            </button>
          </div>
        </div>

        {/* 4 Curated Spot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpots.map(spot => {
            const isBookmarked = bookmarkedIds.has(spot.id);
            return (
              <article
                key={spot.id}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-highest/60"
              >
                <div
                  onClick={() => onSelectSpot(spot)}
                  className="cursor-pointer"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={spot.imageUrl}
                      alt={spot.imageAlt}
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-sans text-[11px] font-bold shadow-xs">
                      {spot.tierLabel}
                    </div>
                    <div
                      className={`absolute bottom-3 right-3 px-2 py-0.5 rounded-full font-sans text-[11px] font-bold ${
                        spot.statusOpen
                          ? 'bg-primary text-on-primary'
                          : spot.tier === 'fine'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {spot.status}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-outline font-sans text-[11px] font-bold mb-1.5">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">
                          {spot.distance.includes('train') ? 'train' : 'directions_walk'}
                        </span>
                        {spot.distance}
                      </span>
                      <span>{spot.category}</span>
                    </div>
                    <h3 className="font-sans font-semibold text-[20px] text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {spot.name}
                    </h3>
                    <p className="font-sans text-[13px] text-secondary leading-relaxed line-clamp-2">
                      {spot.quote}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-outline font-sans text-[13px] border-t border-surface-container-low">
                  <span className="text-tertiary font-sans text-[11px] font-bold">{spot.priceAvg}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(spot.id);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                    type="button"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark spot'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isBookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Primary Section 2: Local Safety Radar & Fraud Watch */}
      <section id="fraud-watch-section" className="w-full mt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container-highest/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-tertiary-container font-sans text-[11px] font-bold uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[18px]">gpp_maybe</span>
                <span>Local Radar &amp; Honest Guidance</span>
              </div>
              <h2 className="font-editorial text-[24px] sm:text-[28px] text-on-surface">
                Fraud Watch &amp; Neighborhood Advisory
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-xs text-secondary font-sans text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary">history</span>
              <span>Verified by Kansai Tourism Bureau · 40m ago</span>
            </div>
          </div>

          {/* Soft amber calm warning banner */}
          <div className="p-4 rounded-2xl bg-tertiary-fixed/40 flex items-start gap-3.5 mb-6 border border-tertiary-fixed">
            <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">
              notification_important
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
              <p className="font-sans text-[15px] text-on-tertiary-fixed leading-snug">
                <strong>Mild Advisory:</strong> Unofficial taxi meter tampering reported near Kyoto Station North Exit during peak evening hours (20:00–23:00).
              </p>
              <button
                onClick={onNavigateToTransit}
                className="font-sans text-[11px] font-bold px-3 py-1 bg-surface-container-lowest hover:bg-white text-tertiary rounded-full shrink-0 shadow-xs transition-all cursor-pointer"
              >
                Use Official Stand #2
              </button>
            </div>
          </div>

          {/* Two expandable scam cards with practical evasion tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scams.slice(0, 2).map((scam) => (
              <div
                key={scam.id}
                className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container-highest/60"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[18px]">{scam.icon}</span>
                      </span>
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                        {scam.patternNumber}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-sans text-[11px] font-bold">
                      {scam.frequency}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-[20px] text-on-surface mb-2">
                    {scam.title}
                  </h3>
                  <p className="font-sans text-[13px] text-secondary leading-relaxed mb-4">
                    {scam.description}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-2.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div className="text-[13px] font-sans leading-snug">
                    <strong className="text-on-surface">{scam.countermeasureLabel}:</strong> {scam.countermeasure}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Section 3: Essential Cultural Etiquette ("Need to Know") */}
      <section id="cultural-etiquette-section" className="w-full mt-14 mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 text-primary font-sans text-[11px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Cultural Mindfulness</span>
            </div>
            <h2 className="font-editorial text-[24px] sm:text-[28px] text-on-surface">
              Kyoto Essentials: Need to Know
            </h2>
          </div>
          <span className="font-sans text-[13px] text-secondary">
            Small gestures of quiet respect make your journey seamless.
          </span>
        </div>

        {/* 4 Horizontal Badge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {etiquetteList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:bg-surface-container-low transition-colors border border-surface-container-highest/60"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl ${item.bgClass} flex items-center justify-center ${item.iconColorClass} mb-4`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                  {item.category}
                </span>
                <h3 className="font-sans font-semibold text-[16px] text-on-surface mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-[13px] text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-2 text-primary font-sans text-[11px] font-bold border-t border-surface-container-low">
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>{item.actionTip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Floating Co-Pilot Glance Pill (Desktop Bottom Anchor) */}
      {showGlancePill && (
        <aside
          aria-label="Upcoming transit glance"
          className="fixed bottom-6 right-8 z-40 hidden xl:flex items-center gap-4 px-5 py-3 rounded-full bg-surface/90 backdrop-blur-xl shadow-xl border border-surface-container-highest/80 text-on-surface"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="font-sans text-[12px] font-semibold">Next Connection:</span>
            <span className="font-sans text-[13px] text-secondary">Karasuma Line → Shijo (4 min)</span>
          </div>
          <div className="h-4 w-px bg-surface-container-highest" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-tertiary">battery_charging_full</span>
            <span className="font-sans text-[11px] font-bold text-secondary">Offline Cache Ready</span>
          </div>
          <button
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant cursor-pointer"
            onClick={() => setShowGlancePill(false)}
            title="Close glance pill"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </aside>
      )}
    </div>
  );
};
