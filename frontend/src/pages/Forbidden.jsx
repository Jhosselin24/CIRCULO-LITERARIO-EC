import { Link } from "react-router"

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-xl text-center rounded-2xl border border-red-200 bg-red-50 p-8">
                <h1 className="text-4xl font-black text-red-700">Acceso denegado</h1>
                <p className="mt-4 text-slate-700">
                    No tienes permisos para ingresar a este recurso dentro de Circulo Literario EC.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-block mt-6 rounded-xl bg-[#2c3e50] px-6 py-3 text-white hover:bg-[#1b2836]"
                >
                    Volver al panel
                </Link>
            </div>
        </div>
    )
}

export default Forbidden
