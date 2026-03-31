import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Using a direct Google Drive or reliable CDN audio link is usually better, but Archive.org works if no cross-origin errors occur.
  const audioUrl = "https://archive.org/download/03-shri-ganesh-mahamantra/03%20shri%20ganesh%20mahamantra.mp3";

  useEffect(() => {
    // Set base volume low so it's pleasant when started
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play method returns a promise. In production, browsers mandate this is triggered by a direct click event.
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Audio playback failed because of browser policy:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-rise">
      {/* 
        We removed autoPlay entirely. 
        Modern browser policies in production strictly block audio unless initiated by a direct UI click.
      */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        playsInline
      />
      
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
          isPlaying
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
          <Volume2 size={24} className="relative z-10" />
        ) : (
          <VolumeX size={24} className="relative z-10" />
        )}
        
        {/* Floating music note icons when playing */}
        {isPlaying && (
          <>
            <Music size={12} className="absolute -top-1 -right-1 text-primary animate-bounce delay-75" />
            <Music size={12} className="absolute -bottom-1 -left-1 text-primary animate-bounce" />
          </>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
