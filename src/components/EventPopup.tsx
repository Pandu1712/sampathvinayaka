import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const countdownIntervalRef = useRef<any>(null);
  const reopenTimeoutRef = useRef<any>(null);

  const END_DATE = new Date("2026-09-24T23:59:59");

  const isEventActive = () => {
    return new Date() <= END_DATE;
  };

  const startCountdown = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCountdown(10);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          closePopup();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const closePopup = () => {
    setIsOpen(false);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    // Schedule reopen in 30 seconds
    if (reopenTimeoutRef.current) clearTimeout(reopenTimeoutRef.current);
    reopenTimeoutRef.current = setTimeout(() => {
      if (isEventActive()) {
        setIsOpen(true);
        startCountdown();
      }
    }, 30000);
  };

  const manualClose = () => {
    closePopup();
  };

  useEffect(() => {
    if (isEventActive()) {
      // Show immediately on mount
      setIsOpen(true);
      startCountdown();
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (reopenTimeoutRef.current) clearTimeout(reopenTimeoutRef.current);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative max-w-lg w-full bg-[#1C0505] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(217,119,6,0.4)] overflow-hidden flex flex-col items-center p-3 sm:p-4">
        {/* Header/Close bar */}
        <div className="w-full flex justify-between items-center mb-2.5">
          <span className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-widest">
            Special Temple Event Announcement
          </span>
          <button
            onClick={manualClose}
            className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:text-amber-400 hover:bg-amber-500/20 hover:scale-105 transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Close Announcement"
          >
            <X size={16} />
          </button>
        </div>

        {/* Event Banner Image */}
        <div className="relative w-full overflow-hidden rounded-lg border border-amber-500/20 bg-black/40">
          <img
            src="/event-banner.jpg"
            alt="Vinayaka Chavithi Navaratri Mahotsavamulu"
            className="w-full h-auto object-contain max-h-[60vh]"
          />
        </div>

        {/* Countdown timer footer */}
        <div className="w-full flex items-center justify-between mt-3 text-[10px] sm:text-xs text-amber-500/70 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Sep 14 - Sep 22 Events</span>
          </div>
          <span>Auto-closing in <strong className="text-amber-400 font-bold text-sm sm:text-base ml-0.5">{countdown}s</strong></span>
        </div>

        {/* Timer countdown progress bar */}
        <div className="w-full h-1 bg-amber-950/40 rounded-full mt-2 overflow-hidden border border-amber-500/10">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${(countdown / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
