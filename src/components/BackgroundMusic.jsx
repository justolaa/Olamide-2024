import React, { useState, useRef, useEffect } from "react";
import icon from "../assets/icon.svg"; // Import the icon

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [volume, setVolume] = useState(0.5); // Default volume (50%)
  const audioRef = useRef(null); // Reference to the audio element

  // Autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true); // Update state if successful
      } catch (err) {
        console.warn("Autoplay blocked by the browser:", err);
      }
    };

    playAudio();
  }, []);

  // Toggle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Adjust Volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Loop audio every 60 seconds
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        if (audio.currentTime >= 60) {
          audio.currentTime = 0; // Reset to the start
          audio.play();
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "right" }}>
      {/* Audio Element (Linked to ref) */}
      <audio ref={audioRef} loop src="/audios/somewhere.mp3" type="audio/mpeg" />

      {/* Controls */}
      <button
        onClick={togglePlay}
        className="icon-button"
        style={{
          margin: "10px",
          padding: "10px",
          border: "none",
          borderRadius: "50%", // Optional: Makes the button circular
          cursor: "pointer",
        }}
      >
        <img src={icon} alt="Icon" className="icon page" />
      </button>
      {/* Audio by Andri Graphic from <a href="https://thenounproject.com/browse/icons/term/audio/" 
      target="_blank" title="Audio Icons">Noun Project</a> (CC BY 3.0) */}
    </div>
    
  );
};

export default BackgroundMusic;
