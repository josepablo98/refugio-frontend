import { motion } from "framer-motion";
import { FaHeart, FaStickyNote, FaWind } from "react-icons/fa";

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
    </div>
  );
};
