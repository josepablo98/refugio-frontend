import { useState } from "react";
import { useNavigate } from "react-router-dom";

const phrases = [
  "🚨 Ataque de ansiedad ",
  "🌠 Necesito espacio para abrirme",
  "🛑 Necesito tiempo, me ha molestado algo",
  "🍎 Me ha molestado algo"
];

export const OpenYourHeartPage = () => {
  const navigate = useNavigate();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const handleNextPhrase = () => {
    setCurrentPhraseIndex((prevIndex) => 
      (prevIndex + 1) % phrases.length
    );
  };

  const handlePrevPhrase = () => {
    setCurrentPhraseIndex((prevIndex) => 
      prevIndex === 0 ? phrases.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="emoji-container">
      <div className="emoji-content">
        <div className="emoji-phrase">
          {phrases[currentPhraseIndex]}
        </div>
        
        <div className="navigation-buttons">
          <button 
            className="emoji-nav-button" 
            onClick={handlePrevPhrase}
            disabled={phrases.length <= 1}
          >
            ← Anterior
          </button>
          <button 
            className="emoji-nav-button" 
            onClick={handleNextPhrase}
            disabled={phrases.length <= 1}
          >
            Siguiente →
          </button>
        </div>

        <button 
          className="back-button emoji-back-button" 
          onClick={() => navigate("/home")}
        >
          ← Atrás
        </button>
      </div>
    </div>
  );
};