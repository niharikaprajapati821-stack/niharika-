import React, { useState } from 'react';
import { Spot } from '../types';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copiedTaxi, setCopiedTaxi] = useState<boolean>(false);
  const [fullscreenTaxi, setFullscreenTaxi] = useState<boolean>(false);

  if (!spot) return null;

  const handleCopyTaxi = () => {
    navigator.clipboard.writeText(spot.taxiNote);
    setCopiedTaxi(true);
    setTimeout(() => setCopiedTaxi(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      {fullscreenTaxi ? (
        <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl flex flex-col items-center justify-between text-center min-h-[400px]">
          <div className="w-full flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="font-sans text-[12px] font-bold uppercase text-gray-500">
              For Driver / タクシー運転手さんへ
            </span>
            <button
              onClick={() => setFullscreenTaxi(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="py-8">
            <p className="text-[32px] sm:text-[38px] font-bold text-gray-900 leading-snug tracking-tight font-sans">
              {spot.taxiNote}
            </p>
            <p className="text-[16px] text-gray-600 mt-4 font-sans">
              {spot.japaneseAddress}
            </p>
          </div>

          <button
            onClick={() => setFullscreenTaxi(false)}
            className="w-full py-4 rounded-full bg-primary text-white font-sans font-bold text-[16px] cursor-pointer"
          >
            Done / 戻る
          </button>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-highest flex flex-col">
          {/* Top Image Hero */}
          <div className="relative h-60 w-full overflow-hidden bg-surface-container shrink-0">
            <img
              src={spot.imageUrl}
              alt={spot.imageAlt}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-sans text-[11px] font-bold shadow-xs">
                {spot.tierLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-sans text-[11px] font-bold shadow-xs">
                {spot.status}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between text-outline font-sans text-[12px] mb-1">
                <span>{spot.distance} · {spot.category}</span>
                <span className="text-tertiary font-bold">{spot.priceAvg}</span>
              </div>
              <h2 className="font-editorial text-[28px] sm:text-[32px] text-on-surface leading-tight">
                {spot.name}
              </h2>
              <p className="font-sans text-[14px] text-primary italic mt-1">
                {spot.quote}
              </p>
            </div>

            <p className="font-sans text-[14px] text-secondary leading-relaxed">
              {spot.description}
            </p>

            {/* Mindful Tips */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-highest">
              <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-2">
                Mindful Arrival Advice
              </span>
              <ul className="space-y-1.5">
                {spot.tips.map((tip, idx) => (
                  <li key={idx} className="font-sans text-[13px] text-on-surface-variant flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Taxi Driver Card */}
            <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-primary font-sans text-[11px] font-bold uppercase">
                  <span className="material-symbols-outlined text-[16px]">local_taxi</span>
                  <span>Show to Japanese Taxi Driver</span>
                </div>
                <button
                  onClick={() => setFullscreenTaxi(true)}
                  className="text-primary font-sans text-[11px] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                  Fullscreen
                </button>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-lowest font-sans font-bold text-[16px] text-on-surface">
                {spot.taxiNote}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-sans text-[11px] text-outline truncate mr-2">{spot.address}</span>
                <button
                  onClick={handleCopyTaxi}
                  className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-[11px] font-sans font-semibold transition-colors cursor-pointer shrink-0"
                >
                  {copiedTaxi ? 'Copied Note' : 'Copy Japanese Note'}
                </button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onToggleBookmark(spot.id)}
                className={`flex-1 py-3 rounded-full font-sans text-[13px] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  isBookmarked
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isBookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
                {isBookmarked ? 'Saved in Itinerary' : 'Save for Later'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-sans text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
