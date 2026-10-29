import React, { useState, useEffect } from 'react';
import { X, Shield, Sparkles, Check, User, Mail, Lock, Plane, Globe } from 'lucide-react';
import { UserProfile } from '../types/travel';

const PROFILE_STORAGE_KEY = 'tastetrail_user_profile';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUpdateUser: (user: UserProfile | null) => void;
  onNavigateToDashboard?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onNavigateToDashboard,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'profile'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [homeAirport, setHomeAirport] = useState('New York (JFK)');
  const [passportCountry, setPassportCountry] = useState('United States');

  useEffect(() => {
    if (currentUser) {
      setTab('profile');
      setName(currentUser.name);
      setEmail(currentUser.email);
      setHomeAirport(currentUser.homeAirport || 'New York (JFK)');
      setPassportCountry(currentUser.passportCountry || 'United States');
    } else {
      setTab('signin');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0] || 'Cultural Connoisseur',
      email: email || 'traveler@tastetrail.ai',
      isMember: true,
      tier: 'connoisseur',
      homeAirport,
      passportCountry,
      preferredMoods: ['cultural', 'relaxed'],
      favoriteInterests: ['architecture', 'food_dining', 'local_culture'],
    };
    onUpdateUser(user);
    onClose();
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleGoogleSignIn = () => {
    const user: UserProfile = {
      id: 'usr_google_demo',
      name: 'Julian Vance',
      email: 'julian.vance@culturetrail.org',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isMember: true,
      tier: 'connoisseur',
      homeAirport: 'San Francisco (SFO)',
      passportCountry: 'United States',
      preferredMoods: ['cultural', 'creative'],
      favoriteInterests: ['architecture', 'music', 'food_dining'],
    };
    onUpdateUser(user);
    onClose();
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const handleSignOut = () => {
    onUpdateUser(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b111e] border border-[#1b2844] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#d9d2c5]/60 hover:text-white rounded-full bg-[#121b2f] border border-[#1b2844] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-b from-[#121b2f] to-[#0b111e] border-b border-[#1b2844] text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] mx-auto flex items-center justify-center mb-3 shadow-lg shadow-[#00c5b2]/10">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-2xl text-[#f7f3eb]">
            TasteTrail Club
          </h3>
          <p className="text-xs text-[#d9d2c5] mt-1">
            Unlock persistent cultural itineraries, cloud sync, and community publishing.
          </p>
        </div>

        {/* Tab navigation if not signed in */}
        {!currentUser && (
          <div className="flex border-b border-[#1b2844]">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                tab === 'signin'
                  ? 'text-[#00c5b2] border-b-2 border-[#00c5b2] bg-[#121b2f]/40'
                  : 'text-[#d9d2c5]/60 hover:text-[#d9d2c5]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                tab === 'signup'
                  ? 'text-[#00c5b2] border-b-2 border-[#00c5b2] bg-[#121b2f]/40'
                  : 'text-[#d9d2c5]/60 hover:text-[#d9d2c5]'
              }`}
            >
              Create Free Account
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          {currentUser ? (
            /* Profile View */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#121b2f] border border-[#1b2844] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00c5b2]/20 border border-[#00c5b2] text-[#00c5b2] flex items-center justify-center text-lg font-bold font-display">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#f7f3eb]">{currentUser.name}</div>
                  <div className="text-xs text-[#d9d2c5]/70">{currentUser.email}</div>
                  <div className="text-[11px] font-semibold text-[#e8c582] uppercase mt-0.5">
                    {currentUser.tier === 'connoisseur' ? 'Connoisseur Member' : 'Explorer Member'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Home Departure Airport
                  </label>
                  <input
                    type="text"
                    value={homeAirport}
                    onChange={(e) => setHomeAirport(e.target.value)}
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3.5 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Passport Nationality
                  </label>
                  <input
                    type="text"
                    value={passportCountry}
                    onChange={(e) => setPassportCountry(e.target.value)}
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3.5 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateToDashboard) onNavigateToDashboard();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/40 text-[#00c5b2] text-xs font-bold hover:bg-[#00c5b2]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Personal Travel Dashboard</span>
                </button>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-semibold hover:bg-red-900/60 transition-colors"
                  >
                    Sign Out
                  </button>

                  <button
                    onClick={() => {
                      onUpdateUser({
                        ...currentUser,
                        homeAirport,
                        passportCountry,
                      });
                      onClose();
                    }}
                    className="px-6 py-2 rounded-xl bg-[#00c5b2] text-[#070b14] text-xs font-bold hover:bg-[#02e0cb] transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-xl bg-[#121b2f] hover:bg-[#1b2844] border border-[#1b2844] text-xs font-semibold text-[#f7f3eb] transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#1b2844]" />
                <span className="text-[11px] text-[#d9d2c5]/40 uppercase tracking-wider">or with email</span>
                <div className="flex-1 h-px bg-[#1b2844]" />
              </div>

              {tab === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Vance"
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@domain.com"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-bold text-xs rounded-xl transition-all shadow-lg shadow-[#00c5b2]/20"
              >
                {tab === 'signin' ? 'Sign In to TasteTrail' : 'Create Free Account'}
              </button>

              <div className="p-3 rounded-xl bg-[#121b2f]/60 border border-[#1b2844] text-[11px] text-[#d9d2c5]/70 flex items-start gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00c5b2] flex-shrink-0 mt-0.5" />
                <span>Zero telemetry or trackers. Your cultural preferences are stored securely.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
