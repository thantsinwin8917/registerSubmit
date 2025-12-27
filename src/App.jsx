import { Routes, Route, Navigate } from "react-router-dom";
import RegisterSubmit from "./components/RegisterSubmit.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterSubmit />} />
      <Route path="/submit-form" element={<RegisterSubmit />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}