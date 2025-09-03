import { useState } from "react";
import { useNavigate } from "react-router-dom";
import phrases from "../assets/phrases.json";
import cartaImg from "../assets/carta.png"; // 👈 tu imagen real

export const NotesPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const currentPhrase = currentIndex !== null ? phrases[currentIndex]?.text : "";

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
    handleNextPhrase(); // Selecciona la primera frase aleatoria al abrir el modal
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setUsedIndices([]); // Limpia los índices usados
    setCurrentIndex(null); // Resetea el índice actual
  };

  return (
    <div className="notes-container">
      {/* Carta como imagen */}
      <img
        src={cartaImg}
        alt="Carta"
        className="card-image"
        onClick={handleOpenModal}
      />

      <button className="back-button back-button-notes" onClick={() => navigate("/home")}>
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
          </div>
        </div>
      )}
    </div>
  );
};