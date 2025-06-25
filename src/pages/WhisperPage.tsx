import { useNavigate } from "react-router-dom";


export const WhisperPage = () => {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate("/home")}>
      ← Atrás
    </button>
  );
};

