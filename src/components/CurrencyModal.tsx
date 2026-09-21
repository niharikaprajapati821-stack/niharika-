import React, { useState } from 'react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({ isOpen, onClose }) => {
  const [jpyAmount, setJpyAmount] = useState<string>('1000');
  const rate = 155.20; // 1 USD = 155.20 JPY

  if (!isOpen) return null;

  const numJpy = parseFloat(jpyAmount) || 0;
  const numUsd = (numJpy / rate).toFixed(2);
  const numEur = (numJpy / 168.40).toFixed(2);
  const numGbp = (numJpy / 196.80).toFixed(2);

  const benchmarks = [
    { label: 'Convenience Store Onigiri', jpy: 160 },
    { label: 'Kyoto Subway Base Fare', jpy: 210 },
    { label: 'Kyoto City Bus Flat Fare', jpy: 230 },
    { label: 'Specialty Hand Drip Coffee', jpy: 550 },
    { label: '7-Eleven Bento / Conbini Lunch', jpy: 720 },
    { label: 'Gion Okaru Curry Udon', jpy: 1200 },
    { label: 'Recommended Cash Reserve', jpy: 10000 },
    { label: 'Shinkansen to Tokyo (Nozomi)', jpy: 14170 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
            </span>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase text-outline">Live Telemetry</span>
              <h2 className="font-editorial text-[22px] text-on-surface">Currency Quick-Math</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Currency rate header */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
          <span className="font-sans text-[13px] text-secondary">Bank Benchmark Rate</span>
          <span className="font-sans font-bold text-[14px] text-primary">$1.00 USD = ¥155.20 JPY</span>
        </div>

        {/* Dynamic Calculator Inputs */}
        <div className="space-y-3">
          <div>
            <label className="font-sans text-[11px] font-bold uppercase text-outline block mb-1.5">
              Japanese Yen (JPY ¥)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-[20px] text-outline">
                ¥
              </span>
              <input
                type="number"
                value={jpyAmount}
                onChange={(e) => setJpyAmount(e.target.value)}
                placeholder="Enter Yen..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-surface-container-highest text-[22px] font-bold font-sans text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="p-3 rounded-xl bg-surface-container-low text-center">
              <span className="text-[11px] font-sans font-bold text-outline block">USD ($)</span>
              <span className="text-[16px] font-bold font-sans text-on-surface">${numUsd}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center">
              <span className="text-[11px] font-sans font-bold text-outline block">EUR (€)</span>
              <span className="text-[16px] font-bold font-sans text-on-surface">€{numEur}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-center">
              <span className="text-[11px] font-sans font-bold text-outline block">GBP (£)</span>
              <span className="text-[16px] font-bold font-sans text-on-surface">£{numGbp}</span>
            </div>
          </div>
        </div>

        {/* Quick Travel Benchmarks */}
        <div>
          <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-2">
            Everyday Kyoto Benchmarks
          </span>
          <div className="space-y-1.5">
            {benchmarks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setJpyAmount(item.jpy.toString())}
                className="w-full px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center justify-between transition-colors text-left cursor-pointer group"
              >
                <span className="font-sans text-[13px] text-on-surface group-hover:text-primary">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-semibold text-[13px] text-on-surface">
                    ¥{item.jpy.toLocaleString()}
                  </span>
                  <span className="font-sans text-[11px] text-outline">
                    (${(item.jpy / rate).toFixed(2)})
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-primary text-on-primary font-sans text-[13px] font-semibold hover:bg-primary-container transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
