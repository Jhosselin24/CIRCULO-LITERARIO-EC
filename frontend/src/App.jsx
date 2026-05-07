import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Comunidad from "./pages/Comunidad"
import Beneficios from "./pages/Beneficios"
import Contacto from "./pages/Contacto"

import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FEF2E1]">

        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<Home />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App