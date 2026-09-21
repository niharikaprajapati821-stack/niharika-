import React, { useState } from 'react';

interface OfflinePackModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
}

export const OfflinePackModal: React.FC<OfflinePackModalProps> = ({
  isOpen,
  onClose,
  isOfflineMode,
  onToggleOffline
}) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleReDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1200);
  };

  const packItems = [
    { title: 'Kyoto Metro & JR Transit Schematics', size: '4.2 MB', cached: true },
    { title: 'Kansai Tourism Bureau Safety Advisories', size: '1.1 MB', cached: true },
    { title: 'Gion & Shimogyo Mindful Spot Coordinates', size: '8.6 MB', cached: true },
    { title: 'Emergency Audio Pronunciation Flashcards', size: '2.4 MB', cached: true }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
            </span>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase text-outline">Offline Storage</span>
              <h2 className="font-editorial text-[22px] text-on-surface">Offline Guide Pack</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Offline Toggle status card */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-[22px] ${isOfflineMode ? 'text-primary' : 'text-outline'}`}>
              {isOfflineMode ? 'cloud_off' : 'cloud_done'}
            </span>
            <div>
              <div className="font-sans font-bold text-[14px] text-on-surface">
                {isOfflineMode ? 'Simulation: Offline Mode Active' : 'Cache Status: Fully Synced'}
              </div>
              <div className="font-sans text-[11px] text-secondary">
                {isOfflineMode ? 'Reading purely from local device storage' : 'Ready for subway tunnels and roaming-free days'}
              </div>
            </div>
          </div>
          <button
            onClick={onToggleOffline}
            className={`px-3 py-1.5 rounded-full font-sans text-[11px] font-bold transition-colors cursor-pointer ${
              isOfflineMode
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            {isOfflineMode ? 'Switch Online' : 'Simulate Offline'}
          </button>
        </div>

        {/* Cached modules */}
        <div className="space-y-2">
          <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-1">
            Cached Guide Assets (16.3 MB Total)
          </span>
          {packItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                <span className="font-sans text-[13px] text-on-surface">{item.title}</span>
              </div>
              <span className="font-sans text-[11px] text-outline">{item.size}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleReDownload}
            disabled={downloading}
            className="flex-1 py-3 rounded-full bg-primary text-on-primary font-sans text-[13px] font-semibold hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloading ? 'sync' : 'refresh'}
            </span>
            {downloading ? 'Refreshing Cache...' : 'Update & Re-verify Pack'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-sans text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
