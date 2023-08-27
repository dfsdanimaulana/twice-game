import { useState, useRef } from 'react';

const useAudioPlayer = () => {
  const [audio] = useState(new Audio());
  
  const playAudio = (audioUrl) => {
    if (audioUrl) {
      audio.pause(); // Pause the current audio
      audio.currentTime = 0; // Reset playback position
      audio.src = audioUrl;
      audio.load(); // Load the new audio source
      audio.play().catch(error => {
        if (error.name === 'AbortError') {
          // The play request was interrupted by the new load request
          // You can choose to handle this error if needed
        }
      });
    }
  };

  return playAudio;
};

export default useAudioPlayer;
