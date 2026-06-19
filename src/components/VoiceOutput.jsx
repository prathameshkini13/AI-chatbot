import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const VoiceOutput = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <Tooltip title={isSpeaking ? "Stop Speaking" : "Read Aloud"}>
      <IconButton 
        size="small"
        onClick={speakText}
        sx={{ 
          color: isSpeaking ? '#10a37f' : 'rgba(255,255,255,0.5)',
          '&:hover': { color: '#10a37f' }
        }}
      >
        {isSpeaking ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default VoiceOutput;