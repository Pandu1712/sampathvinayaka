import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  // Using a direct, high-quality mp3 link for Ganesha Suprabhatam
  const audioUrl = "https://archive.org/download/VigneshwaraSuprabhatam/02ShriVigneshwaraSuprabhatam.mp3";

  useEffect(() => {
    // Set base volume low so it's pleasant when started
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }

    // Try playing immediately (handles cases where browser allows autoplay or after reload)
    if (audioRef.current && !isPlaying && !isManuallyPaused) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, will rely on interaction listeners below
        });
    }
  }, []);

  useEffect(() => {
    if (isManuallyPaused) {
      return; // Do not attempt to autoplay if the user explicitly clicked mute/pause
    }

    const attemptAutoplay = () => {
      if (audioRef.current && !isPlaying && !isManuallyPaused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(error => {
            console.log("Autoplay blocked, waiting for next interaction:", error);
          });
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('click', attemptAutoplay);
      window.removeEventListener('scroll', attemptAutoplay);
      window.removeEventListener('keydown', attemptAutoplay);
      window.removeEventListener('touchstart', attemptAutoplay);
    };

    // Add listeners for common user interactions to trigger pleasant background chant
    window.addEventListener('click', attemptAutoplay);
    window.addEventListener('scroll', attemptAutoplay, { passive: true });
    window.addEventListener('keydown', attemptAutoplay);
    window.addEventListener('touchstart', attemptAutoplay, { passive: true });

    return () => removeInteractionListeners();
  }, [isPlaying, isManuallyPaused]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true); // Remember that the user explicitly muted it!
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsManuallyPaused(false); // Reset so it stays playing
          })
          .catch(error => {
            console.error("Manual playback failed:", error);
          });
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        playsInline
      />

      <button
        onClick={toggleMusic}
        className={`group relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${isPlaying
            ? 'bg-[#FFF9EA] text-primary ring-4 ring-primary/20 border border-primary/30'
            : 'bg-white/80 backdrop-blur text-muted-foreground border border-gray-200 ring-4 ring-transparent hover:ring-primary/10'
          }`}
        aria-label={isPlaying ? "Pause Sacred Chant" : "Play Sacred Chant"}
      >
        {/* Animated pulse for playing state */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 duration-1000"></span>
        )}

        {isPlaying ? (
          <Volume2 className="w-5 h-5 md:w-7 md:h-7 relative z-10" />
        ) : (
          <VolumeX className="w-5 h-5 md:w-7 md:h-7 relative z-10" />
        )}

        {/* Premium Animated Equalizer Wave when playing */}
        {isPlaying && (
          <div className="absolute -top-1.5 -right-1.5 bg-primary/95 text-white p-1 rounded-lg shadow-md flex items-end gap-[2.5px] h-5 w-6.5 overflow-hidden border border-amber-400 z-20">
            <span className="w-[2px] bg-white rounded-full animate-eq-1" style={{ height: '3px' }} />
            <span className="w-[2px] bg-white rounded-full animate-eq-2" style={{ height: '5px' }} />
            <span className="w-[2px] bg-white rounded-full animate-eq-3" style={{ height: '4px' }} />
            <span className="w-[2px] bg-white rounded-full animate-eq-4" style={{ height: '3px' }} />
          </div>
        )}
        <span className="absolute right-0 md:right-16 bottom-14 md:bottom-auto px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? "Mute Chant" : "Play Chant"}
        </span>
      </button>
    </>
  );
};

export default BackgroundMusic;
