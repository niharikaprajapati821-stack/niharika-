import React from 'react';
import { NavScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: NavScreen) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <footer className="w-full bg-surface-container-low mt-12 border-t border-surface-container-highest/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-outline font-sans text-[13px]">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-sans font-semibold text-[12px] text-on-surface-variant">
            © 2024 Compass Co-Pilot
          </span>
          <span className="hidden sm:inline">·</span>
          <span>Ambient geo-intelligence active for Japan (Kansai Region)</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('transit-hub')}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Transit Alerts
          </button>
          <button
            onClick={onOpenEmergency}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Embassy Directory
          </button>
          <button
            onClick={() => onNavigate('safety-and-scams')}
            className="hover:text-on-surface transition-colors cursor-pointer"
          >
            Privacy &amp; Telemetry
          </button>
        </div>
      </div>
    </footer>
  );
};
