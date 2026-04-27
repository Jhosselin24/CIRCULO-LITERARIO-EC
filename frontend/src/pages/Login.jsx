import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <div className="flex h-screen">

      {/* IZQUIERDA */}
      <div className="hidden md:flex w-1/2 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')] bg-cover bg-center">
        <div className="bg-black/70 flex flex-col justify-center p-10 w-full">
          <div className="w-10 h-1 bg-orange-500 mb-4"></div>
          <h1 className="text-white text-4xl font-bold leading-tight">
            TU PRÓXIMO <br /> CAPÍTULO <br /> COMIENZA AQUÍ
          </h1>
          <p className="text-gray-300 mt-4">
            Únete a nuestra comunidad y descubre historias increíbles.
          </p>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="w-[350px] bg-white p-6 rounded-2xl shadow-lg">

          <p className="text-sm text-gray-500 cursor-pointer mb-2">← Regresar</p>

          <div className="text-center mb-4">
            <div className="text-orange-500 text-3xl">📖</div>
            <h2 className="text-2xl font-bold">
              BIENVENIDO<span className="text-orange-500">(A)</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Accede a la comunidad de Círculo Literario EC
            </p>
          </div>

          {/* INPUT EMAIL */}
          <input
            type="text"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* INPUT PASSWORD */}
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <p className="text-xs text-right text-gray-400 mb-3 cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>

          {/* BOTÓN */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:scale-105 transition"
          >
            INICIAR SESIÓN
          </button>

          <div className="text-center text-gray-400 text-sm my-3">
            o inicia sesión con
          </div>

          <button className="w-full border py-2 rounded-lg hover:bg-gray-50">
            Google
          </button>

          <p className="text-sm text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 font-bold cursor-pointer"
            >
              Regístrate aquí
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}