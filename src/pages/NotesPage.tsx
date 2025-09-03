import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaStepForward } from "react-icons/fa"; // Importa los iconos
import phrases from "../assets/phrases.json";
import cartaImg from "../assets/carta.png";

const audioFiles = [
  "/src/assets/audios/Clouds - One Direction (Lyrics).mp3",
  "/src/assets/audios/One Direction - I Want to Write You a Song (Audio).mp3",
  "/src/assets/audios/One Direction - One Way Or Another [Teenage Kicks] (Lyrics).mp3",
  "/src/assets/audios/One Direction - Steal My Girl (Lyrics).mp3",
  "/src/assets/audios/One Direction - What Makes You Beautiful(Lyrics).mp3",
];

export const NotesPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentPhrase =
    currentIndex !== null ? phrases[currentIndex]?.text : "";

  const handleNextPhrase = () => {
    if (usedIndices.length < phrases.length) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * phrases.length);
      } while (usedIndices.includes(nextIndex));

      setUsedIndices((prev) => [...prev, nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    handleNextPhrase();
    setIsPlaying(false); // Asegúrate de que el audio no se reproduzca automáticamente
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reinicia el audio
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setUsedIndices([]);
    setCurrentIndex(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextSong = () => {
    setAudioIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % audioFiles.length;
      if (audioRef.current) {
        audioRef.current.src = audioFiles[nextIndex];
        audioRef.current.pause(); // Pausa cualquier reproducción en curso
        audioRef.current.load(); // Carga el nuevo archivo
        audioRef.current.onloadeddata = () => {
          audioRef.current?.play(); // Reproduce el audio automáticamente cuando esté listo
          setIsPlaying(true);
        };
      }
      return nextIndex;
    });
  };

  return (
    <div className="notes-container">
      <img
        src={cartaImg}
        alt="Carta"
        className="card-image"
        onClick={handleOpenModal}
      />

      <button
        className="back-button back-button-notes"
        onClick={() => navigate("/home")}
      >
        ← Atrás
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="phrase-text">{currentPhrase}</p>
            <button
              className="next-button"
              onClick={handleNextPhrase}
              disabled={usedIndices.length >= phrases.length}
            >
              → Siguiente
            </button>
            <div className="audio-controls">
              <button onClick={handlePlayPause}>
                {isPlaying ? (
                  <FaPause className="audio-icon" />
                ) : (
                  <FaPlay className="audio-icon" />
                )}
              </button>
              <button onClick={handleNextSong}>
                <FaStepForward className="audio-icon" />
              </button>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={audioFiles[audioIndex]} />
    </div>
  );
};