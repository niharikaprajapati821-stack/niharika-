import React, { useState } from 'react';
import { EtiquetteItem } from '../types';

interface LocalEtiquetteViewProps {
  etiquetteList: EtiquetteItem[];
  onBackToArrival: () => void;
}

export const LocalEtiquetteView: React.FC<LocalEtiquetteViewProps> = ({ etiquetteList, onBackToArrival }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const chozuyaSteps = [
    {
      step: 1,
      title: 'Bow at the Torii Gate',
      instruction: 'Before stepping through the sacred gateway, stop and bow slightly (approx 15 degrees) toward the main shrine sanctuary.'
    },
    {
      step: 2,
      title: 'Right Hand Scoops Water',
      instruction: 'Take the bamboo/wood ladle in your right hand, scoop cold mountain water from the stone basin, and pour roughly one third over your left hand to cleanse it.'
    },
    {
      step: 3,
      title: 'Switch Hands & Wash Right',
      instruction: 'Switch the ladle into your left hand, and wash your right hand with another third of the water.'
    },
    {
      step: 4,
      title: 'Rinse Mouth Gently',
      instruction: 'Return ladle to right hand, pour a small amount into your cupped left palm, bring to your lips and rinse silently. Never put the ladle directly to your mouth!'
    },
    {
      step: 5,
      title: 'Wash the Ladle Handle',
      instruction: 'Tilt the ladle vertically so the remaining water trickles down the handle, washing it clean for the next worshipper. Place it face down.'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full w-fit mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Kyoto Cultural Mindfulness
            </span>
          </div>
          <h1 className="font-editorial text-[32px] sm:text-[40px] text-on-surface">
            Kyoto Essentials: Need to Know
          </h1>
          <p className="font-sans text-[15px] text-secondary">
            In Japan, etiquette is not about rigid rules, but mindful consideration (Omoiyari) for shared public serenity.
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

      {/* Interactive Step-by-Step Chozuya Purification Module */}
      <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container-highest mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-sans text-[11px] font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">water_drop</span>
              <span>Interactive Shrine Walkthrough</span>
            </div>
            <h2 className="font-editorial text-[24px] text-on-surface">Chozuya (Water Basin) Purification Sequence</h2>
          </div>
          <div className="flex items-center gap-1.5">
            {chozuyaSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-8 h-8 rounded-full font-sans text-[12px] font-bold transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-primary text-on-primary scale-105'
                    : 'bg-surface-container-lowest text-secondary hover:bg-surface-container'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-sans text-[11px] font-bold">
              Step {activeStep + 1} of 5
            </span>
            <h3 className="font-sans font-bold text-[18px] text-on-surface">
              {chozuyaSteps[activeStep].title}
            </h3>
          </div>
          <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed mb-6">
            {chozuyaSteps[activeStep].instruction}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-surface-container-low">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-1.5 rounded-full bg-surface-container text-on-surface text-[12px] font-sans font-semibold disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(Math.min(chozuyaSteps.length - 1, activeStep + 1))}
              disabled={activeStep === chozuyaSteps.length - 1}
              className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-[12px] font-sans font-semibold disabled:opacity-40 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Principles Deep Dive */}
      <section className="mb-12">
        <h2 className="font-editorial text-[24px] text-on-surface mb-6">Four Sacred Tenets for Travelers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {etiquetteList.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${item.bgClass} flex items-center justify-center ${item.iconColorClass}`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                        {item.category}
                      </span>
                      <h3 className="font-sans font-semibold text-[18px] text-on-surface">{item.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[14px] text-secondary leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.detailedRules && (
                  <ul className="space-y-2 mb-4">
                    {item.detailedRules.map((rule, rIdx) => (
                      <li key={rIdx} className="font-sans text-[13px] text-on-surface-variant flex items-start gap-2">
                        <span className="text-primary font-bold">·</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2 text-primary font-sans text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>{item.actionTip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Additional Crucial Kyoto Protocols */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gion Geiko Respect */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined text-[20px]">no_photography</span>
            </div>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                Gion Private Streets
              </span>
              <h3 className="font-sans font-semibold text-[18px] text-on-surface">
                Maiko &amp; Geiko Photography Ban
              </h3>
            </div>
          </div>
          <p className="font-sans text-[13px] text-secondary leading-relaxed mb-3">
            Private alleys in Gion display strict "No Photography" signage carrying a ¥10,000 fine. Never chase, surround, or block geiko walking to appointments.
          </p>
          <div className="p-3 rounded-xl bg-error-container/40 text-on-error-container text-[12px] font-sans font-semibold">
            Fine ¥10,000 for photographing on private roads in Gion. Admire from a respectful distance without touching their kimono.
          </div>
        </div>

        {/* Street Trash Disposal */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
            </div>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">
                Public Cleanliness
              </span>
              <h3 className="font-sans font-semibold text-[18px] text-on-surface">
                Why There Are No Public Trash Cans
              </h3>
            </div>
          </div>
          <p className="font-sans text-[13px] text-secondary leading-relaxed mb-3">
            Following the 1995 subway sarin attacks and civic responsibility principles, Japan removed street bins. Travelers carry a small bag to take rubbish back to their hotel or use convenience store bins (Gomi-bako).
          </p>
          <div className="p-3 rounded-xl bg-primary/10 text-primary text-[12px] font-sans font-semibold">
            Dispose drink cans in the recycling holes right next to drink vending machines (cans &amp; plastic bottles only).
          </div>
        </div>
      </section>
    </div>
  );
};
