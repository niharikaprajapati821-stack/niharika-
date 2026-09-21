import React from 'react';
import { NavScreen } from '../types';

interface HeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenLocation: () => void;
  onOpenCurrency: () => void;
  onOpenEmergency: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  currentLocationName: string;
  arrivedAgo: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenLocation,
  onOpenCurrency,
  onOpenEmergency,
  onOpenSearch,
  onOpenProfile,
  isOfflineMode,
  onToggleOffline,
  currentLocationName,
  arrivedAgo
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf8fe]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-highest/60">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Left: Brand + Location Context + Exchange Rate */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Logo */}
          <button
            onClick={() => onNavigate('arrival-feed')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="brand-header-button"
          >
            <img
              alt="Compass Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XCIo_Ip-yPKncUz5nn1zF-PUQR7xd2fse-8ezqI6CD-PtzBnoYo-hc7w6EqY5hk8ZAGIT2WeGmiVx7DMIj2KNSx7Wq_QotDCeUc5p_WZceOmBVr2Iwf05L6bICtK8c8AEb7zlzCEmPVfL-b98wHuV6Zp7fSwSSwiqrRpBHYeJmwVPKBJMQ6X7vp1xZB-g-bUeayswWDLa4UnF2BwUwqOYlp8DHQxJPwN2At0dmGAD_G4kfFxZzJmlY_Sw"
            />
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-[20px] tracking-tight text-on-surface leading-none">
                Compass
              </span>
              <span className="font-sans text-[11px] font-bold text-outline tracking-wider uppercase mt-1">
                Contextual Travel Co-pilot
              </span>
            </div>
          </button>

          {/* Vertical Divider */}
          <div className="hidden sm:block h-6 w-px bg-surface-container-highest" />

          {/* Location Trigger */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container transition-colors rounded-full text-on-surface-variant text-left"
            type="button"
            id="header-location-selector"
            title="Change current location or ward"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
            <span className="font-sans font-semibold text-[12px] text-on-surface whitespace-nowrap">
              {currentLocationName}
            </span>
            <span className="hidden md:inline font-sans text-[13px] text-outline">
              · {arrivedAgo}
            </span>
            <span className="material-symbols-outlined text-[16px] text-outline ml-0.5">expand_more</span>
          </button>

          {/* USD / JPY Currency Pill */}
          <button
            onClick={onOpenCurrency}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-surface-container hover:bg-surface-container-high transition-colors rounded-full text-on-surface-variant cursor-pointer"
            type="button"
            id="header-currency-trigger"
            title="Open quick currency converter"
          >
            <span className="font-sans text-[11px] font-bold text-outline">USD/JPY:</span>
            <span className="font-sans text-[12px] font-semibold text-on-surface">¥155.20</span>
          </button>
        </div>

        {/* Center: Navigation Screens */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('arrival-feed')}
            className={`px-4 py-1.5 rounded-full font-sans text-[12px] transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'arrival-feed'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="nav-tab-arrival-feed"
          >
            Arrival Feed
          </button>
          <button
            onClick={() => onNavigate('transit-hub')}
            className={`px-4 py-1.5 rounded-full font-sans text-[12px] transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'transit-hub'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="nav-tab-transit-hub"
          >
            Transit Hub
          </button>
          <button
            onClick={() => onNavigate('safety-and-scams')}
            className={`px-4 py-1.5 rounded-full font-sans text-[12px] transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'safety-and-scams'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="nav-tab-safety-scams"
          >
            Safety &amp; Scams
          </button>
          <button
            onClick={() => onNavigate('curated-spots')}
            className={`px-4 py-1.5 rounded-full font-sans text-[12px] transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'curated-spots'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="nav-tab-curated-spots"
          >
            Curated Spots
          </button>
          <button
            onClick={() => onNavigate('local-etiquette')}
            className={`px-4 py-1.5 rounded-full font-sans text-[12px] transition-all whitespace-nowrap cursor-pointer ${
              currentScreen === 'local-etiquette'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            id="nav-tab-local-etiquette"
          >
            Local Etiquette
          </button>
        </nav>

        {/* Right: Emergency + Offline Indicator + Search + Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Emergency Pill */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-error-container hover:brightness-95 transition-all text-on-error-container rounded-full shadow-xs cursor-pointer"
            type="button"
            id="emergency-quick-button"
            title="Emergency SOS Contacts & Phrases"
          >
            <span className="material-symbols-outlined text-[15px] text-error">emergency</span>
            <span className="font-sans text-[11px] font-bold tracking-wide whitespace-nowrap">
              Police 110 · Med 119
            </span>
          </button>

          {/* Offline Indicator Button */}
          <button
            onClick={onToggleOffline}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
              isOfflineMode
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
            title={isOfflineMode ? 'Offline Mode Active' : 'Saved for offline transit (Click to toggle)'}
            type="button"
            id="offline-status-toggle"
          >
            <span className={`material-symbols-outlined text-[14px] ${isOfflineMode ? 'text-white' : 'text-primary'}`}>
              cloud_done
            </span>
            <span className="font-sans text-[11px] font-semibold">
              {isOfflineMode ? 'Offline Active' : 'Offline'}
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search places, transit, etiquette"
            className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            type="button"
            id="header-search-button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            className="pl-1 flex items-center group cursor-pointer"
            id="header-profile-button"
            title="Maya's Travel Preferences"
          >
            <img
              alt="Maya Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-highest group-hover:ring-primary transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArptkd-zoqnmw-jgb2CC-DXPQKLmMHqI8V-WfgHGvjxtVi3SjJrkfQ6q3hTWLqqqpAXhtTmXxGnfAvxSu4IlZbw5kv3RbWsbWN-xL83u3zPuMV3Ap0wdg7j2V99xOyrjehLfOiJB-s6-EXils3c4x2LsghBfdAcKBT4i1kp4z-BhVA7VQem3szzvt3_BXsPMNyJBpjEbt2lPEU4Lm4ZsS0COiYDuUDGmxpSFo_5Ef_Q6b10bEyn3IQ"
            />
          </button>
        </div>
      </div>

      {/* Mobile Screen Tabs (under header on small screens) */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-surface-container-low overflow-x-auto border-t border-surface-container-highest/60 no-scrollbar">
        <button
          onClick={() => onNavigate('arrival-feed')}
          className={`px-3 py-1 rounded-full font-sans text-[12px] whitespace-nowrap ${
            currentScreen === 'arrival-feed'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'text-on-surface-variant'
          }`}
        >
          Arrival Feed
        </button>
        <button
          onClick={() => onNavigate('transit-hub')}
          className={`px-3 py-1 rounded-full font-sans text-[12px] whitespace-nowrap ${
            currentScreen === 'transit-hub'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'text-on-surface-variant'
          }`}
        >
          Transit Hub
        </button>
        <button
          onClick={() => onNavigate('safety-and-scams')}
          className={`px-3 py-1 rounded-full font-sans text-[12px] whitespace-nowrap ${
            currentScreen === 'safety-and-scams'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'text-on-surface-variant'
          }`}
        >
          Safety &amp; Scams
        </button>
        <button
          onClick={() => onNavigate('curated-spots')}
          className={`px-3 py-1 rounded-full font-sans text-[12px] whitespace-nowrap ${
            currentScreen === 'curated-spots'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'text-on-surface-variant'
          }`}
        >
          Curated Spots
        </button>
        <button
          onClick={() => onNavigate('local-etiquette')}
          className={`px-3 py-1 rounded-full font-sans text-[12px] whitespace-nowrap ${
            currentScreen === 'local-etiquette'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'text-on-surface-variant'
          }`}
        >
          Local Etiquette
        </button>
      </div>
    </header>
  );
};
