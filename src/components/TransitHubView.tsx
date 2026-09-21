import React, { useState } from 'react';
import { TRANSIT_LINES } from '../data/mockData';

interface TransitHubViewProps {
  onBackToArrival: () => void;
  onOpenOfflinePack: () => void;
}

export const TransitHubView: React.FC<TransitHubViewProps> = ({ onBackToArrival, onOpenOfflinePack }) => {
  const [icBalance, setIcBalance] = useState<number>(3420);
  const [selectedDestination, setSelectedDestination] = useState<string>('gion');
  const [isTappingCard, setIsTappingCard] = useState<boolean>(false);
  const [tapMessage, setTapMessage] = useState<string | null>(null);

  const handleSimulateTap = (fare: number) => {
    if (icBalance < fare) {
      setTapMessage('Insufficient balance. Please reload IC card at ticket machine.');
      return;
    }
    setIsTappingCard(true);
    setTimeout(() => {
      setIcBalance(prev => prev - fare);
      setIsTappingCard(false);
      setTapMessage(`Pi-Po! ¥${fare} deducted. Remaining balance: ¥${(icBalance - fare).toLocaleString()}`);
      setTimeout(() => setTapMessage(null), 4000);
    }, 600);
  };

  const routes = {
    gion: {
      dest: 'Gion / Shijo-Kawaramachi',
      time: '12 min',
      fare: '¥230',
      method: 'City Bus #205 or Karasuma Line transfer to Hankyu',
      steps: ['Board City Bus #205 at Kyoto Station Bus Terminal Stand A2', 'Ride 6 stops to Shijo Kawaramachi', 'Tap IC card at front door upon disembarking']
    },
    arashiyama: {
      dest: 'Arashiyama Bamboo Grove',
      time: '24 min',
      fare: '¥240',
      method: 'JR San-in Main Line (Sagano Line)',
      steps: ['Go to JR Platform 32/33 at Kyoto Station', 'Take Sagano Line train to JR Saga-Arashiyama Station', 'Walk 8 minutes through traditional village to the bamboo forest']
    },
    fushimi: {
      dest: 'Fushimi Inari Taisha (Torii Gates)',
      time: '9 min',
      fare: '¥150',
      method: 'JR Nara Line Local',
      steps: ['Head to JR Platform 8/9/10 (Nara Line)', 'Take Local train (2 stops) to Inari Station (Do not take Rapid)', 'The giant vermilion Torii gate is directly opposite station exit']
    },
    kinkakuji: {
      dest: 'Kinkaku-ji (Golden Pavilion)',
      time: '35 min',
      fare: '¥230',
      method: 'City Bus #205 Express',
      steps: ['Board City Bus #205 at Bus Terminal B3', 'Direct ride through north Kyoto to Kinkakuji-michi', 'Walk 3 minutes to the temple wooden gate']
    }
  };

  const currentRoute = routes[selectedDestination as keyof typeof routes] || routes.gion;

  return (
    <div className="flex flex-col w-full pb-16 animate-fadeIn pt-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full w-fit mb-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Kyoto Mobility &amp; IC Hub
            </span>
          </div>
          <h1 className="font-editorial text-[32px] sm:text-[40px] text-on-surface">
            Mindful Transit Navigator
          </h1>
          <p className="font-sans text-[15px] text-secondary">
            Effortless guidance for Kyoto's buses, subways, and airport express links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToArrival}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-sans text-[12px] font-semibold transition-colors border border-surface-container-highest cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Arrival Brief
          </button>
          <button
            onClick={onOpenOfflinePack}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-sans text-[12px] font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">cloud_download</span>
            Download Transit Map
          </button>
        </div>
      </div>

      {/* Grid: IC Card simulator + Kyoto Bus Rule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* IC Card Glance Card */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-highest flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-secondary-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[18px]">credit_card</span>
                </span>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">Digital Pass</span>
                  <h3 className="font-sans font-semibold text-[16px] text-on-surface">ICOCA / Suica Wallet</h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-sans text-[11px] font-bold">
                Active
              </span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low mb-4">
              <span className="font-sans text-[11px] text-secondary">Current Balance</span>
              <div className="font-sans text-[32px] font-bold text-on-surface tracking-tight mt-0.5">
                ¥{icBalance.toLocaleString()}
              </div>
              <div className="font-sans text-[11px] text-outline mt-1">
                ≈ ${(icBalance / 155.20).toFixed(2)} USD · Good for ~14 city bus rides
              </div>
            </div>

            {tapMessage && (
              <div className="p-3 mb-4 rounded-xl bg-primary-container/20 text-on-primary-fixed-variant text-[12px] font-sans font-semibold flex items-center gap-2 animate-fadeIn">
                <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                {tapMessage}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => handleSimulateTap(230)}
              disabled={isTappingCard}
              className="flex-1 py-2 px-3 rounded-full bg-primary text-on-primary text-[12px] font-sans font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">contactless</span>
              {isTappingCard ? 'Tapping...' : 'Test Tap (¥230 Bus)'}
            </button>
            <button
              onClick={() => setIcBalance(prev => prev + 1000)}
              className="py-2 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-[12px] font-sans font-semibold transition-colors cursor-pointer"
              title="Add ¥1,000 at station machine"
            >
              +¥1,000
            </button>
          </div>
        </div>

        {/* Kyoto Bus Boarding Rule (Essential) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-highest flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[18px]">directions_bus</span>
              </span>
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">Crucial Rule</span>
                <h3 className="font-sans font-semibold text-[16px] text-on-surface">Kyoto Bus Boarding Protocol</h3>
              </div>
            </div>
            <p className="font-sans text-[13px] text-secondary leading-relaxed mb-4">
              Kyoto city buses operate differently from Tokyo and western transit:
            </p>
            <ul className="space-y-2 font-sans text-[13px] text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">1</span>
                <span><strong>Enter through the REAR door:</strong> Do not touch any card reader when entering flat-fare zone buses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">2</span>
                <span><strong>Exit through the FRONT door:</strong> Pay flat <strong>¥230</strong> by tapping your IC card or placing exact coins in the fare box.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">3</span>
                <span><strong>Change machine:</strong> Machine next to driver accepts ¥1,000 bills to break into coins before paying.</span>
              </li>
            </ul>
          </div>
          <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low text-outline text-[11px] font-sans">
            Pro-tip: Never stand up while bus is moving. Wait until it comes to a complete halt before walking forward.
          </div>
        </div>

        {/* Official Taxi Stand vs Unofficial Tout Alert */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-highest flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-[18px]">local_taxi</span>
              </span>
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">Station Guidance</span>
                <h3 className="font-sans font-semibold text-[16px] text-on-surface">Kyoto Station Official Taxis</h3>
              </div>
            </div>
            <p className="font-sans text-[13px] text-secondary leading-relaxed mb-4">
              Never take rides from people approaching you inside the station. Official taxis only pick up at verified dispatch bays.
            </p>
            <div className="space-y-3 font-sans text-[13px]">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <strong className="text-primary block text-[13px]">Official Stand #2 (North / Karasuma Exit):</strong>
                <span className="text-secondary text-[12px]">Queued dispatch queue with uniformed dispatcher. All taxis take IC, credit card, and cash with calibrated digital meters.</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low">
                <strong className="text-on-surface block text-[13px]">Automatic Door Notice:</strong>
                <span className="text-secondary text-[12px]">Rear passenger doors are remotely controlled by driver. Do not touch or force door open.</span>
              </div>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between text-[11px] font-sans text-secondary">
            <span>Flag drop: ¥500 (first 1.2km)</span>
            <span className="text-primary font-semibold">No tipping expected</span>
          </div>
        </div>
      </div>

      {/* Live Station Departures */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-outline">Real-time Telemetry</span>
            <h2 className="font-editorial text-[24px] text-on-surface">Kyoto Station Live Departures</h2>
          </div>
          <span className="font-sans text-[12px] text-secondary">Auto-refreshes every 60s</span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-highest overflow-hidden shadow-sm">
          <div className="divide-y divide-surface-container-low">
            {TRANSIT_LINES.map((line) => (
              <div
                key={line.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-sans font-bold text-[13px] text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.lineCode.slice(0, 3)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-semibold text-[15px] text-on-surface">{line.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary text-[11px] font-sans font-bold">
                        {line.platform}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] text-secondary mt-0.5">
                      {line.destination} · <span className="text-outline">{line.frequency}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="flex flex-col sm:items-end">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-sans text-[12px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      In {line.departureMin} mins
                    </div>
                    <span className="font-sans text-[11px] text-outline mt-1">{line.fare}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Landmark Route Planner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container-highest">
        <div className="mb-6">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-primary">Mindful Navigator</span>
          <h2 className="font-editorial text-[24px] text-on-surface">Direct Route Guides from Kyoto Station</h2>
          <p className="font-sans text-[13px] text-secondary">Step-by-step clarity to the city's key sanctuaries.</p>
        </div>

        {/* Destination buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedDestination('gion')}
            className={`px-4 py-2 rounded-full font-sans text-[12px] font-bold transition-all cursor-pointer ${
              selectedDestination === 'gion'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            Gion / Shijo
          </button>
          <button
            onClick={() => setSelectedDestination('arashiyama')}
            className={`px-4 py-2 rounded-full font-sans text-[12px] font-bold transition-all cursor-pointer ${
              selectedDestination === 'arashiyama'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            Arashiyama Bamboo
          </button>
          <button
            onClick={() => setSelectedDestination('fushimi')}
            className={`px-4 py-2 rounded-full font-sans text-[12px] font-bold transition-all cursor-pointer ${
              selectedDestination === 'fushimi'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            Fushimi Inari Torii
          </button>
          <button
            onClick={() => setSelectedDestination('kinkakuji')}
            className={`px-4 py-2 rounded-full font-sans text-[12px] font-bold transition-all cursor-pointer ${
              selectedDestination === 'kinkakuji'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            Kinkaku-ji (Golden Pavilion)
          </button>
        </div>

        {/* Route Details Card */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-low mb-4">
            <div>
              <h3 className="font-sans font-semibold text-[18px] text-on-surface">{currentRoute.dest}</h3>
              <span className="font-sans text-[13px] text-secondary">{currentRoute.method}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-surface-container font-sans text-[12px] font-semibold text-on-surface">
                Travel: {currentRoute.time}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-fixed font-sans text-[12px] font-bold text-on-primary-fixed">
                Fare: {currentRoute.fare}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {currentRoute.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-sans text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="font-sans text-[14px] text-on-surface leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
