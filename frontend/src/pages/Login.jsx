import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@epn.edu.ec" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-amber-600 text-white py-2 rounded"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}