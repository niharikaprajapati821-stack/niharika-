import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, savedCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Maya"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArptkd-zoqnmw-jgb2CC-DXPQKLmMHqI8V-WfgHGvjxtVi3SjJrkfQ6q3hTWLqqqpAXhtTmXxGnfAvxSu4IlZbw5kv3RbWsbWN-xL83u3zPuMV3Ap0wdg7j2V99xOyrjehLfOiJB-s6-EXils3c4x2LsghBfdAcKBT4i1kp4z-BhVA7VQem3szzvt3_BXsPMNyJBpjEbt2lPEU4Lm4ZsS0COiYDuUDGmxpSFo_5Ef_Q6b10bEyn3IQ"
            />
            <div>
              <h3 className="font-editorial text-[20px] text-on-surface">Maya Chen</h3>
              <span className="font-sans text-[11px] font-bold text-primary uppercase">
                Solo Mindful Traveler · Kyoto 7-Day Stay
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <span className="font-sans text-[13px] text-on-surface">Bookmarked Sanctuary Spots</span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-sans text-[11px] font-bold">
              {savedCount} Spots
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <span className="font-sans text-[13px] text-on-surface font-semibold block">Dietary Mindfulness</span>
              <span className="font-sans text-[11px] text-secondary">Pescatarian &amp; Dashi-friendly</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-primary">restaurant</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <span className="font-sans text-[13px] text-on-surface font-semibold block">Transit Pass Linked</span>
              <span className="font-sans text-[11px] text-secondary">Digital ICOCA card via Apple Wallet</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-primary">nfc</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <span className="font-sans text-[13px] text-on-surface font-semibold block">Emergency Contact</span>
              <span className="font-sans text-[11px] text-secondary">US Consulate General Osaka-Kobe</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-outline">verified</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-primary text-on-primary font-sans text-[13px] font-semibold hover:bg-primary-container transition-colors cursor-pointer"
        >
          Close Preferences
        </button>
      </div>
    </div>
  );
};
