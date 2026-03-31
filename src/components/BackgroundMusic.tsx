import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = "https://archive.org/download/03-shri-ganesh-mahamantra/03%20shri%20ganesh%20mahamantra.mp3";

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        // Unmute on interaction
        audioRef.current.muted = false;
        setIsMuted(false);
        
        if (!isPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => console.log("Interaction play failed:", err));
        }
        
        removeListeners();
      }
    };

    const removeListeners = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('mousedown', handleInteraction);
    };

    if (audioRef.current) {
      audioRef.current.volume = 0.1; 
      audioRef.current.muted = true; // Start muted for autoplay
      
      // Attempt to play immediately (should work since it's muted)
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Muted autoplay blocked (rare):", err);
      });
    }

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('mousedown', handleInteraction);

    return () => {
      removeListeners();
    };
  }, [isPlaying, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If we weren't playing yet (autoplay blocked), start now
      if (!isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.error("Manual play failed:", err));
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        autoPlay 
        playsInline
      />
      
      <button
        onClick={toggleMute}
        className={`group relative flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
          !isMuted && isPlaying
            ? 'bg-primary text-white ring-4 ring-primary/20' 
            : 'bg-white text-primary border-2 border-primary ring-4 ring-transparent hover:ring-primary/10'
        }`}
        aria-label={isMuted ? "Unmute Sacred Chant" : "Mute Sacred Chant"}
      >
        {/* Animated pulse for playing & unmuted state */}
        {!isMuted && isPlaying && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
        )}
        
        {isMuted ? (
          <VolumeX size={24} className="relative z-10" />
        ) : (
          <Volume2 size={24} className="relative z-10" />
        )}
        
        {/* Floating music note icons when playing & unmuted */}
        {!isMuted && isPlaying && (
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
