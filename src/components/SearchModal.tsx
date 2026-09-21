import React, { useState } from 'react';
import { Spot, ScamAdvisory, EtiquetteItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  spots: Spot[];
  scams: ScamAdvisory[];
  etiquette: EtiquetteItem[];
  onSelectSpot: (spot: Spot) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  spots,
  scams,
  etiquette,
  onSelectSpot
}) => {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedSpots = q ? spots.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) : [];
  const matchedScams = q ? scams.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) : [];
  const matchedEtiquette = q ? etiquette.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[80vh]">
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[20px] text-primary absolute left-4">
            search
          </span>
          <input
            autoFocus
            type="text"
            placeholder="Search Kyoto transit, curry udon, etiquette, scams..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-surface-container-low border border-surface-container-highest text-[15px] font-sans text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto space-y-4 max-h-[60vh] pr-1">
          {!q ? (
            <div className="py-6 text-center text-outline font-sans text-[13px]">
              Type a word like "curry", "taxi", "tipping", "locker", or "dashi"...
            </div>
          ) : matchedSpots.length === 0 && matchedScams.length === 0 && matchedEtiquette.length === 0 ? (
            <div className="py-6 text-center text-outline font-sans text-[13px]">
              No matches found for "{query}"
            </div>
          ) : (
            <>
              {matchedSpots.length > 0 && (
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-2">
                    Curated Spots ({matchedSpots.length})
                  </span>
                  <div className="space-y-2">
                    {matchedSpots.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelectSpot(s);
                          onClose();
                        }}
                        className="w-full p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container text-left transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="font-sans font-bold text-[14px] text-on-surface">{s.name}</div>
                          <div className="font-sans text-[12px] text-secondary">{s.category} · {s.priceAvg}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-[11px] font-bold font-sans text-primary">
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedScams.length > 0 && (
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-2">
                    Safety Advisories ({matchedScams.length})
                  </span>
                  <div className="space-y-2">
                    {matchedScams.map((sc) => (
                      <div key={sc.id} className="p-3 rounded-2xl bg-surface-container-low">
                        <div className="font-sans font-bold text-[14px] text-on-surface">{sc.title}</div>
                        <div className="font-sans text-[12px] text-secondary mt-0.5">{sc.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedEtiquette.length > 0 && (
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-2">
                    Cultural Protocols ({matchedEtiquette.length})
                  </span>
                  <div className="space-y-2">
                    {matchedEtiquette.map((et) => (
                      <div key={et.id} className="p-3 rounded-2xl bg-surface-container-low">
                        <div className="font-sans font-bold text-[14px] text-on-surface">{et.title}</div>
                        <div className="font-sans text-[12px] text-secondary mt-0.5">{et.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-sans text-[13px] font-semibold transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
