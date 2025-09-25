import { Navigate, Route, Routes } from "react-router-dom"
import { BreathingPage, HomePage, NotesPage, OpenYourHeartPage } from "../pages"

export const Router = () => {
  return (
    <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/openyourheart" element={<OpenYourHeartPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/breathing" element={<BreathingPage />} />
        <Route path="/*" element={<Navigate to="/home" />}/>
    </Routes>
  )
}
