import React, { useState, useEffect } from 'react';
import { X, Activity, CheckCircle, AlertTriangle, RefreshCw, Key, Shield, ExternalLink, Terminal } from 'lucide-react';
import { ApiStatus } from '../types/travel';

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<ApiStatusModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<any>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (e) {
      console.error('Failed to load status', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setPingResult(null);
    }
  }, [isOpen]);

  const handleTestPing = async () => {
    setIsTestingPing(true);
    setPingResult(null);
    try {
      const res = await fetch('/api/qloo/test', { method: 'POST' });
      const data = await res.json();
      setPingResult(data);
    } catch (err: any) {
      setPingResult({ status: 'error', message: err.message || 'Network test failed' });
    } finally {
      setIsTestingPing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1b2844] pb-4">
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-[#00c5b2]" />
            <h3 className="font-display text-lg font-bold text-[#f7f3eb]">
              Qloo API & System Status
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#d9d2c5] hover:bg-[#121b2f] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm">
          {/* Status Banner */}
          <div
            className={`rounded-xl border p-4 flex items-start gap-3 ${
              status?.qlooConfigured
                ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
                : 'border-[#e8c582]/40 bg-[#e8c582]/10 text-[#f5dfb0]'
            }`}
          >
            {status?.qlooConfigured ? (
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-[#e8c582] shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-xs uppercase tracking-wider">
                {status?.qlooConfigured
                  ? 'Live Mode Active'
                  : 'Sample & Evaluation Mode Active'}
              </div>
              <p className="mt-1 text-xs opacity-90 leading-relaxed">
                {status?.message || 'Loading status...'}
              </p>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[#1b2844] bg-[#070b14] p-3.5">
              <div className="text-[#d9d2c5]/60 mb-1">Official Base URL</div>
              <div className="font-mono text-[#00c5b2] break-all">
                {status?.qlooBaseUrl || 'https://hackathon.api.qloo.com'}
              </div>
            </div>

            <div className="rounded-xl border border-[#1b2844] bg-[#070b14] p-3.5">
              <div className="text-[#d9d2c5]/60 mb-1">Gemini AI Synthesis</div>
              <div className="font-mono text-[#f7f3eb]">
                {status?.geminiConfigured ? 'Connected (gemini-3.8-flash)' : 'Rule-based fallback active'}
              </div>
            </div>
          </div>

          {/* Test Ping Tool */}
          <div className="rounded-xl border border-[#1b2844] bg-[#121b2f] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-xs text-[#f7f3eb] flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-[#00c5b2]" />
                <span>API Handshake Diagnostic</span>
              </div>
              <button
                onClick={handleTestPing}
                disabled={isTestingPing}
                className="flex items-center gap-1.5 rounded-lg bg-[#00c5b2] px-3 py-1.5 text-xs font-semibold text-[#070b14] hover:bg-[#02e0cb] disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${isTestingPing ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>
            <p className="text-xs text-[#d9d2c5]/80">
              Executes a secure server-side probe against Qloo's sandbox API.
            </p>

            {pingResult && (
              <div className="mt-3 rounded-lg bg-[#070b14] p-3 font-mono text-[11px] text-[#00c5b2] border border-[#1b2844]">
                <div>Status: {pingResult.status}</div>
                {pingResult.statusCode && <div>HTTP Status: {pingResult.statusCode}</div>}
                {pingResult.latencyMs && <div>Latency: {pingResult.latencyMs}ms</div>}
                <div className="text-[#d9d2c5] mt-1">{pingResult.message}</div>
              </div>
            )}
          </div>

          {/* Hackathon Setup Notes */}
          <div className="border-t border-[#1b2844] pt-4 text-xs text-[#d9d2c5]/70 space-y-2">
            <div className="font-semibold text-[#f7f3eb] flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-[#e8c582]" />
              <span>How To Enable Live Qloo API:</span>
            </div>
            <p>
              1. Obtain your event key for the Qloo Hackathon.
            </p>
            <p>
              2. Add <code className="text-[#00c5b2]">QLOO_API_KEY="your-key"</code> to server environment variables.
            </p>
            <p>
              3. The backend proxy automatically sends the <code className="text-[#00c5b2]">X-Api-Key</code> header to <code className="text-[#00c5b2]">https://hackathon.api.qloo.com</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-[#1b2844] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#121b2f] px-4 py-2 text-xs font-medium text-[#d9d2c5] hover:text-white"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
