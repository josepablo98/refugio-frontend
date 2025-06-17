import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import "../styles.css";

type Phase = {
  name: string;
  duration: number;
  color: string;
  text: string;
};

const phases: Phase[] = [
  { name: "inhale", duration: 7, color: "#6EC6FF", text: "Inhala suavemente" },
  {
    name: "hold",
    duration: 4,
    color: "#FFD54F",
    text: "Aguanta la respiración",
  },
  { name: "exhale", duration: 7, color: "#A5D6A7", text: "Exhala despacio" },
];

export const Breathing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio] = useState(new Audio("/zen-music.mp3"));

  const currentPhase = phases[phaseIndex];

  const handleToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setPhaseIndex(0);
      setKey((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (audio.paused) {
      audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  };

  return (
    <div className="breathing-container">
      <div className="timer-wrapper">
        <button
          className="audio-toggle-button"
          onClick={toggleAudio}
          aria-label={audioPlaying ? "Silenciar audio" : "Activar audio"}
        >
          {audioPlaying ? (
            <MdVolumeUp size={28} color="#4CAF50" />
          ) : (
            <MdVolumeOff size={28} color="#888" />
          )}
        </button>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={currentPhase.duration}
          // @ts-ignore
          colors={[currentPhase.color]}
          strokeWidth={2}
          size={300}
          onComplete={() => {
            if (phaseIndex < phases.length - 1) {
              setPhaseIndex((prev) => prev + 1);
              setKey((prev) => prev + 1);
              return { shouldRepeat: false };
            } else {
              setIsPlaying(false);
              setPhaseIndex(0);
              return { shouldRepeat: false };
            }
          }}
        >
          {() =>
            isPlaying ? (
              <div className="breathing-text">
                <p>{currentPhase.text}</p>
              </div>
            ) : (
              <div className="breathing-text">
                <p>Empezar a respirar</p>
              </div>
            )
          }
        </CountdownCircleTimer>

        <button className="start-stop-button" onClick={handleToggle}>
          {isPlaying ? "Parar" : "Empezar"}
        </button>
      </div>
    </div>
  );
};
