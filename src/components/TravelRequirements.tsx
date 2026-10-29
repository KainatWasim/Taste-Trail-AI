import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Zap,
  PhoneCall,
  Info,
  Sun,
  Cloud,
  Check,
  Compass,
} from 'lucide-react';

interface DestinationGuide {
  destination: string;
  country: string;
  visaStatus: string;
  passportValidity: string;
  currency: string;
  paymentNorms: string;
  plugType: string;
  emergency: { police: string; ambulance: string };
  etiquette: string[];
  tipping: string;
}

const DESTINATION_GUIDES: Record<string, DestinationGuide> = {
  Kyoto: {
    destination: 'Kyoto',
    country: 'Japan',
    visaStatus: 'Visa-free for up to 90 days for US, Canadian, EU, UK, and Australian passport holders.',
    passportValidity: 'Must be valid for the entire duration of stay. (6 months recommended).',
    currency: 'Japanese Yen (JPY, ¥)',
    paymentNorms: 'Credit cards widely accepted in hotels & department stores; carry cash (¥1,000–¥10,000 notes) for smaller temples, kissaten, and ramen shops. IC cards (Suica/Pasmo/ICOCA) work on all local transit.',
    plugType: 'Type A and B (100V, 50/60Hz, two flat parallel pins). No ground pin in most older ryokans.',
    emergency: { police: '110', ambulance: '119' },
    etiquette: [
      'Always remove shoes at genkan entryways before stepping onto tatami or temple wood.',
      'Maintain hushed voices and keep phones on silent mode in trains, subways, and listening bars.',
      'Never walk while eating street food; finish snacks near the vendor stall.',
      'Do not pass food directly chopstick-to-chopstick (associated with Buddhist funeral rites).',
    ],
    tipping: 'Strictly zero tipping. Leaving cash behind may cause staff to chase after you to return forgotten money.',
  },
  Lisbon: {
    destination: 'Lisbon',
    country: 'Portugal',
    visaStatus: 'Schengen Area rules: 90 days visa-free within any 180-day window for US, UK, and CA citizens.',
    passportValidity: 'Must be valid for at least 3 months beyond intended departure from Schengen Area.',
    currency: 'Euro (EUR, €)',
    paymentNorms: 'Contactless cards and Apple/Google Pay are near-universal. Keep small coins (€1, €2) for historic tram 28 or neighborhood kiosk bicas.',
    plugType: 'Type C and F (230V, 50Hz, two round pins standard European).',
    emergency: { police: '112', ambulance: '112' },
    etiquette: [
      'Always greet staff with "Bom dia" (morning) or "Boa tarde" (afternoon) upon entering shops or tascas.',
      'Respect silence during live Fado performances; applause is welcomed only after the song ends.',
      'Wear sturdy walking shoes with rubber grip for polished calçada portuguesa cobblestones.',
    ],
    tipping: '5% to 10% in sit-down restaurants is customary for attentive hospitality; rounding up to the nearest Euro at casual cafes.',
  },
  Oaxaca: {
    destination: 'Oaxaca',
    country: 'Mexico',
    visaStatus: 'FMM tourist permit valid for up to 180 days upon entry for US, Canadian, and EU travelers.',
    passportValidity: 'Valid for the duration of travel.',
    currency: 'Mexican Peso (MXN, $)',
    paymentNorms: 'Cash is essential for tianguis, market stalls, and rural mezcal palenques. Carry smaller denominations ($50, $100 pesos).',
    plugType: 'Type A and B (127V, 60Hz, same as USA and Canada).',
    emergency: { police: '911', ambulance: '911' },
    etiquette: [
      'Always ask permission before photographing indigenous artisans, weavers, or market vendors.',
      'Sip mezcal slowly with orange slices and sal de gusano; never shoot it like tequila.',
      'Use polite greetings ("Buenos días", "Con permiso") when entering shared stalls or doorways.',
    ],
    tipping: '10% to 15% is expected in restaurants and dining salons.',
  },
};

export const TravelRequirements: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Kyoto');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const guide = DESTINATION_GUIDES[selectedCity] || DESTINATION_GUIDES.Kyoto;

  useEffect(() => {
    setLoadingWeather(true);
    fetch(`/api/weather?destination=${encodeURIComponent(selectedCity)}`)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.warn('Weather fetch failed', err))
      .finally(() => setLoadingWeather(false));
  }, [selectedCity]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Travel Intelligence</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Travel Requirements & Cultural Etiquette
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Essential entry rules, payment customs, electrical specs, and cultural etiquette for your journey.
        </p>

        {/* Destination Switcher */}
        <div className="mt-5 flex justify-center gap-2">
          {Object.keys(DESTINATION_GUIDES).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-[#00c5b2] text-[#070b14] shadow-md shadow-[#00c5b2]/20'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844] border border-[#1b2844]'
              }`}
            >
              {city}, {DESTINATION_GUIDES[city].country}
            </button>
          ))}
        </div>
      </div>

      {/* Live Destination Climate Card */}
      {weatherData && (
        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#00c5b2]/10 border border-[#00c5b2]/20 text-[#00c5b2]">
              <Sun className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#00c5b2] font-semibold">
                Live Climate in {weatherData.destination}
              </div>
              <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-0.5">
                {weatherData.temperatureC}°C / {weatherData.temperatureF}°F ·{' '}
                <span className="text-sm font-normal text-[#d9d2c5]">{weatherData.condition}</span>
              </div>
              <div className="text-xs text-[#e8c582] mt-1">{weatherData.advice}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#d9d2c5]/80 sm:border-l sm:border-[#1b2844] sm:pl-6">
            <div>
              <span className="block text-[#d9d2c5]/60">Humidity</span>
              <span className="font-semibold text-[#f7f3eb]">{weatherData.humidity}</span>
            </div>
            <div>
              <span className="block text-[#d9d2c5]/60">Wind</span>
              <span className="font-semibold text-[#f7f3eb]">{weatherData.wind}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Key Reqs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Visa & Passport */}
        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#00c5b2]">
            <FileText className="w-5 h-5" />
            <h3 className="font-display font-bold text-base text-[#f7f3eb]">Visa & Passport</h3>
          </div>
          <div className="text-xs text-[#d9d2c5]/90 space-y-2">
            <p>
              <span className="font-semibold text-[#f7f3eb]">Status: </span>
              {guide.visaStatus}
            </p>
            <p>
              <span className="font-semibold text-[#f7f3eb]">Validity: </span>
              {guide.passportValidity}
            </p>
          </div>
        </div>

        {/* Currency & Tipping */}
        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#00c5b2]">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-display font-bold text-base text-[#f7f3eb]">Currency & Tipping</h3>
          </div>
          <div className="text-xs text-[#d9d2c5]/90 space-y-2">
            <p>
              <span className="font-semibold text-[#f7f3eb]">Currency: </span>
              {guide.currency}
            </p>
            <p>
              <span className="font-semibold text-[#f7f3eb]">Norms: </span>
              {guide.paymentNorms}
            </p>
            <p>
              <span className="font-semibold text-[#e8c582]">Tipping: </span>
              {guide.tipping}
            </p>
          </div>
        </div>

        {/* Plugs & Emergency */}
        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-[#00c5b2]">
            <Zap className="w-5 h-5" />
            <h3 className="font-display font-bold text-base text-[#f7f3eb]">Plugs & Emergency</h3>
          </div>
          <div className="text-xs text-[#d9d2c5]/90 space-y-2">
            <p>
              <span className="font-semibold text-[#f7f3eb]">Power Type: </span>
              {guide.plugType}
            </p>
            <div className="pt-2 border-t border-[#1b2844] flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#f7f3eb]">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>Police: {guide.emergency.police}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#f7f3eb]">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>Ambulance: {guide.emergency.ambulance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Etiquette Rules */}
      <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#00c5b2]" />
          <h3 className="font-display font-bold text-xl text-[#f7f3eb]">
            Cultural Etiquette & Respectful Conduct in {guide.destination}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guide.etiquette.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0b111e]/80 border border-[#1b2844] flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-xs text-[#d9d2c5]/90 leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
