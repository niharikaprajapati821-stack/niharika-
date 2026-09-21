/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavScreen, Spot } from './types';
import { LOCATIONS, INITIAL_SPOTS, SCAM_ADVISORIES, ETIQUETTE_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { ArrivalFeedView } from './components/ArrivalFeedView';
import { TransitHubView } from './components/TransitHubView';
import { SafetyScamsView } from './components/SafetyScamsView';
import { CuratedSpotsView } from './components/CuratedSpotsView';
import { LocalEtiquetteView } from './components/LocalEtiquetteView';
import { CurrencyModal } from './components/CurrencyModal';
import { AudioOrientationModal } from './components/AudioOrientationModal';
import { OfflinePackModal } from './components/OfflinePackModal';
import { LocationModal } from './components/LocationModal';
import { SpotDetailModal } from './components/SpotDetailModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('arrival-feed');
  const [currentLocationKey, setCurrentLocationKey] = useState<string>('kyoto-shimogyo');
  const [spots] = useState<Spot[]>(INITIAL_SPOTS);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('compass_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['gion-okaru']);
    } catch {
      return new Set(['gion-okaru']);
    }
  });

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Modals state
  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
  const [isAudioBriefOpen, setIsAudioBriefOpen] = useState<boolean>(false);
  const [isOfflinePackOpen, setIsOfflinePackOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('compass_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (spotId: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(spotId)) {
        next.delete(spotId);
      } else {
        next.add(spotId);
      }
      return next;
    });
  };

  const currentLocation = LOCATIONS[currentLocationKey] || LOCATIONS['kyoto-shimogyo'];

  const handleNavigate = (screen: NavScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenCurrency={() => setIsCurrencyOpen(true)}
        onOpenEmergency={() => handleNavigate('safety-and-scams')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        currentLocationName={`${currentLocation.city}, ${currentLocation.ward}`}
        arrivedAgo={currentLocation.arrivedAgo}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {currentScreen === 'arrival-feed' && (
          <ArrivalFeedView
            location={currentLocation}
            spots={spots}
            scams={SCAM_ADVISORIES}
            etiquetteList={ETIQUETTE_ITEMS}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onSelectSpot={(spot) => setSelectedSpot(spot)}
            onOpenAudioBrief={() => setIsAudioBriefOpen(true)}
            onOpenOfflinePack={() => setIsOfflinePackOpen(true)}
            onOpenCurrencyCalc={() => setIsCurrencyOpen(true)}
            onOpenSafetyDetails={() => handleNavigate('safety-and-scams')}
            onNavigateToTransit={() => handleNavigate('transit-hub')}
          />
        )}

        {currentScreen === 'transit-hub' && (
          <TransitHubView
            onBackToArrival={() => handleNavigate('arrival-feed')}
            onOpenOfflinePack={() => setIsOfflinePackOpen(true)}
          />
        )}

        {currentScreen === 'safety-and-scams' && (
          <SafetyScamsView
            scams={SCAM_ADVISORIES}
            onBackToArrival={() => handleNavigate('arrival-feed')}
          />
        )}

        {currentScreen === 'curated-spots' && (
          <CuratedSpotsView
            spots={spots}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onSelectSpot={(spot) => setSelectedSpot(spot)}
            onBackToArrival={() => handleNavigate('arrival-feed')}
          />
        )}

        {currentScreen === 'local-etiquette' && (
          <LocalEtiquetteView
            etiquetteList={ETIQUETTE_ITEMS}
            onBackToArrival={() => handleNavigate('arrival-feed')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEmergency={() => handleNavigate('safety-and-scams')}
      />

      {/* Modals & Drawers */}
      <CurrencyModal
        isOpen={isCurrencyOpen}
        onClose={() => setIsCurrencyOpen(false)}
      />

      <AudioOrientationModal
        isOpen={isAudioBriefOpen}
        onClose={() => setIsAudioBriefOpen(false)}
        locationName={`${currentLocation.city}, ${currentLocation.ward}`}
      />

      <OfflinePackModal
        isOpen={isOfflinePackOpen}
        onClose={() => setIsOfflinePackOpen(false)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocationKey={currentLocationKey}
        onSelectLocation={(key) => setCurrentLocationKey(key)}
      />

      <SpotDetailModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        isBookmarked={selectedSpot ? bookmarkedIds.has(selectedSpot.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        spots={spots}
        scams={SCAM_ADVISORIES}
        etiquette={ETIQUETTE_ITEMS}
        onSelectSpot={(spot) => setSelectedSpot(spot)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        savedCount={bookmarkedIds.size}
      />
    </div>
  );
}
