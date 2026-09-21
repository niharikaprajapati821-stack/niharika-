import React from 'react';
import { LOCATIONS } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationKey: string;
  onSelectLocation: (key: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocationKey,
  onSelectLocation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">near_me</span>
            </span>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase text-outline">Geo-Context</span>
              <h2 className="font-editorial text-[22px] text-on-surface">Switch Location</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <p className="font-sans text-[13px] text-secondary">
          Compass adapts transit baselines, local scam radar, and nearby mindful spots to your current ward.
        </p>

        <div className="space-y-2">
          {Object.entries(LOCATIONS).map(([key, loc]) => {
            const isSelected = key === currentLocationKey;
            return (
              <button
                key={key}
                onClick={() => {
                  onSelectLocation(key);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-primary-container/10 border-primary text-on-surface shadow-xs'
                    : 'bg-surface-container-low hover:bg-surface-container border-surface-container-highest text-on-surface'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-[15px] text-on-surface">
                      {loc.city}, {loc.ward}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-sans text-[12px] text-secondary block mt-0.5">
                    {loc.areaLabel} · {loc.weather.condition} {loc.weather.temp}°C
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {isSelected ? 'check_circle' : 'chevron_right'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
