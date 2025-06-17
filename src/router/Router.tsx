import { Navigate, Route, Routes } from "react-router-dom"
import { Breathing } from "../pages"

export const Router = () => {
  return (
    <Routes>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/emojis" element={<div>Emojis</div>} />
        <Route path="/whisper" element={<div>Whisper</div>} />
        <Route path="/notes" element={<div>Notes</div>} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/*" element={<Navigate to="/home" />}/>
    </Routes>
  )
}
