import { motion } from "framer-motion";
import { FaHeart, FaStickyNote, FaWind } from "react-icons/fa";
import presentImg from "../assets/present.png";
import { useState } from "react";

const cards = [
  {
    text: "Abre tu corazón",
    icon: <FaHeart color="#E63946" />,
    link: "/openyourheart",
  },
  {
    text: "Notas",
    icon: <FaStickyNote color="#F4A261" />,
    link: "/notes"
  },
  {
    text: "Respirar",
    icon: <FaWind color="#2A9D8F" />,
    link: "/breathing"
  },
];

export const HomePage = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  const handleGiftClick = () => {
    setShowGiftModal(true);
  }

  const handleCloseGiftModal = () => {
    setShowGiftModal(false);
  }

  return (
    <div className="home-container">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="home-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = card.link)}
        >
          <div className="home-card-icon">{card.icon}</div>
          <div className="home-card-text">{card.text}</div>
        </motion.div>
      ))}

      <motion.img
        src={presentImg}
        alt="Regalo"
        className="gift-box"
        onClick={handleGiftClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {showGiftModal && (
        <div className="gift-modal-overlay" onClick={handleCloseGiftModal}>
          <motion.div 
            className="gift-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="gift-modal-title">💝 Para mi amor 💝</h2>
            <p className="gift-modal-text">
              Sé que las prácticas de empresa pueden parecer un reto enorme, pero quiero que sepas que tienes todo lo necesario para brillar. 
              Eres inteligente, trabajadora y capaz de lograr cualquier cosa que te propongas.
              <br /><br />
              Cada día me siento más orgulloso de ti y de todo lo que has conseguido. 
              Estas prácticas son solo el comienzo de todas las cosas buenas que te esperan.
              <br /><br />
              Confía en ti misma tanto como yo confío en ti.
            </p>
            <button className="gift-modal-close" onClick={handleCloseGiftModal}>
              Cerrar
            </button>
          </motion.div>
        </div> 
      )}
    </div>
  );
};
