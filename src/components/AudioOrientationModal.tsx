import React, { useState, useEffect, useRef } from 'react';

interface AudioOrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
}

export const AudioOrientationModal: React.FC<AudioOrientationModalProps> = ({ isOpen, onClose, locationName }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const briefScript = `Welcome to Kyoto, Maya. Take a slow, quiet breath. You have arrived in ${locationName}. The ancient capital moves at a deliberate, contemplative pace. Remember three peaceful anchors for your afternoon: first, city buses board from the rear door, and you pay flat two hundred and thirty yen at the front when you step down. Second, exceptional hospitality is already whole and honored; tipping is never expected and may cause polite confusion. Third, keep a crisp ten thousand yen note in your pocket for historic udon alleys and temple gate admissions. Let the city reveal itself to you without haste. Have a serene journey.`;

  // Play a soft meditative chime tone
  const playCalmChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz calming frequency
      osc.frequency.exponentialRampToValueAtTime(396, ctx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // Audio context might be restricted
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      playCalmChime();
      setIsPlaying(true);
      setProgress(0);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(briefScript);
        utterance.rate = 0.88; // Calm, deliberate cadence
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
          if (timerRef.current) clearInterval(timerRef.current);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
        };
        window.speechSynthesis.speak(utterance);
      }

      // Progress animation
      const startTime = Date.now();
      const duration = 28000; // ~28s speech
      timerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, (elapsed / duration) * 100);
        setProgress(p);
        if (p >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Auto play on open for delight
      handlePlayToggle();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-container-highest flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined text-[22px]">hearing</span>
            </span>
            <div>
              <span className="font-sans text-[11px] font-bold uppercase text-outline">Mindful Co-Pilot</span>
              <h2 className="font-editorial text-[22px] text-on-surface">Calm Arrival Orientation</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Audio Waveform / Pulsing Disc */}
        <div className="p-8 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative mb-4 flex items-center justify-center">
            {isPlaying && (
              <div className="absolute w-24 h-24 rounded-full bg-primary/20 animate-ping" />
            )}
            <button
              onClick={handlePlayToggle}
              className="relative w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
              title={isPlaying ? 'Pause orientation' : 'Play orientation'}
            >
              <span className="material-symbols-outlined text-[32px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          <span className="font-sans text-[13px] font-semibold text-on-surface">
            {isPlaying ? 'Speaking calm brief...' : 'Paused'}
          </span>
          <span className="font-sans text-[11px] text-outline mt-0.5">
            1-minute ambient voice guide · Recorded for Maya
          </span>

          {/* Progress bar */}
          <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Spoken Transcript */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest max-h-40 overflow-y-auto">
          <span className="font-sans text-[11px] font-bold uppercase text-outline block mb-1">
            Brief Transcript
          </span>
          <p className="font-sans text-[13px] text-secondary leading-relaxed italic">
            "{briefScript}"
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-surface-container hover:bg-surface-container-high font-sans text-[13px] font-semibold text-on-surface transition-colors cursor-pointer"
        >
          Close Audio Player
        </button>
      </div>
    </div>
  );
};
