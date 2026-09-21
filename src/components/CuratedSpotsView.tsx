import React, { useState } from 'react';
import { Spot, SpotTier } from '../types';

interface CuratedSpotsViewProps {
  spots: Spot[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  onSelectSpot: (spot: Spot) => void;
  onBackToArrival: () => void;
}

export const CuratedSpotsView: React.FC<CuratedSpotsViewProps> = ({
  spots,
  bookmarkedIds,
  onToggleBookmark,
  onSelectSpot,
  onBackToArrival
}) => {
  const [selectedTier, setSelectedTier] = useState<SpotTier>('all');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = spots.filter((spot) => {
    if (selectedTier !== 'all' && spot.tier !== selectedTier) return false;
    if (onlySaved && !bookmarkedIds.has(spot.id)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        spot.name.toLowerCase().includes(q) ||
        spot.category.toLowerCase().includes(q) ||
        spot.description.toLowerCase().includes(q) ||
        spot.locationArea.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn pt-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full w-fit mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Curated Neighborhood Directory
            </span>
          </div>
          <h1 className="font-editorial text-[32px] sm:text-[40px] text-on-surface">
            Selected for Mindful Discovery
          </h1>
          <p className="font-sans text-[15px] text-secondary">
            Zero commercial hype. Preserved culinary institutions, quiet listening salons, and riverside sanctuaries.
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

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-xs mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Tier Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'all'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            All Tiers
          </button>
          <button
            onClick={() => setSelectedTier('budget')}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'budget'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Pocket-Friendly $
          </button>
          <button
            onClick={() => setSelectedTier('iconic')}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'iconic'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Iconic $$
          </button>
          <button
            onClick={() => setSelectedTier('gem')}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'gem'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Hidden Gem $$$
          </button>
          <button
            onClick={() => setSelectedTier('fine')}
            className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'fine'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Splurge $$$$
          </button>
        </div>

        {/* Right controls: Bookmarked toggle + search input */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              onlySaved
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {onlySaved ? 'bookmark' : 'bookmark_border'}
            </span>
            Saved ({bookmarkedIds.size})
          </button>

          <div className="relative flex-1 md:w-56">
            <span className="material-symbols-outlined text-[16px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Search dishes, alleys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-surface-container text-[12px] font-sans text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Grid of Spots */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-surface-container-highest">
          <span className="material-symbols-outlined text-[36px] text-outline mb-2">nature_people</span>
          <h3 className="font-editorial text-[20px] text-on-surface">No spots match your filters</h3>
          <p className="font-sans text-[13px] text-secondary mt-1">Try resetting the tier filter or search query.</p>
          <button
            onClick={() => {
              setSelectedTier('all');
              setOnlySaved(false);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-full font-sans text-[12px] font-semibold text-on-surface cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spot) => {
            const isBookmarked = bookmarkedIds.has(spot.id);
            return (
              <article
                key={spot.id}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-highest"
              >
                <div onClick={() => onSelectSpot(spot)} className="cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
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
                      className={`absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full font-sans text-[11px] font-bold ${
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
                        <span className="material-symbols-outlined text-[15px] text-primary">near_me</span>
                        {spot.distance}
                      </span>
                      <span>{spot.locationArea}</span>
                    </div>
                    <h3 className="font-sans font-semibold text-[20px] text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {spot.name}
                    </h3>
                    <p className="font-sans text-[13px] text-secondary leading-relaxed mb-3">
                      {spot.quote}
                    </p>
                    <p className="font-sans text-[12px] text-outline line-clamp-2">
                      {spot.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 flex items-center justify-between text-outline font-sans text-[13px] border-t border-surface-container-low">
                  <div>
                    <span className="text-tertiary font-sans text-[12px] font-bold">{spot.priceAvg}</span>
                    <span className="text-[11px] text-outline block">{spot.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectSpot(spot)}
                      className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-sans text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Taxi Card
                    </button>
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
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
