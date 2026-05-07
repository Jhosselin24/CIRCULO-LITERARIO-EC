import { MdAutoStories, MdDashboard } from "react-icons/md";
import { FaCommentSms } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

export default function Comunidad() {
  return (
    <section className="py-16 bg-[#FEF2E1] min-h-screen">

      {/* TITULO */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#2c3e50]">
          Comunidad
        </h2>

        <p className="text-slate-500 mt-3">
          Interactúa con otros lectores y forma parte del círculo literario
        </p>
      </div>

      {/* CONTENIDO */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* INFO */}
        <div className="space-y-6">

          <p className="text-lg text-slate-700">
            En la comunidad de Círculo Literario EC podrás compartir ideas,
            descubrir nuevos autores y participar en conversaciones literarias.
          </p>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div className="p-4 bg-amber-50 rounded-xl shadow-sm">
              <MdAutoStories className="text-3xl text-amber-700 mb-2" />
              <h4 className="font-bold">Lecturas</h4>
              <p className="text-sm text-slate-600">
                Descubre nuevos libros y autores.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm">
              <MdDashboard className="text-3xl text-amber-700 mb-2" />
              <h4 className="font-bold">Perfil</h4>
              <p className="text-sm text-slate-600">
                Administra tu información.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm">
              <FaCommentSms className="text-3xl text-amber-700 mb-2" />
              <h4 className="font-bold">Conversación</h4>
              <p className="text-sm text-slate-600">
                Interactúa con la comunidad.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl shadow-sm">
              <BsCashCoin className="text-3xl text-amber-700 mb-2" />
              <h4 className="font-bold">Crecimiento</h4>
              <p className="text-sm text-slate-600">
                Plataforma en evolución.
              </p>
            </div>

          </div>

        </div>

        {/* BLOQUE VISUAL */}
        <div className="bg-amber-50 rounded-3xl p-10 text-center shadow-md">
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
            Únete a la comunidad
          </h3>

          <p className="text-slate-600 mb-6">
            Forma parte de un espacio creado para lectores y escritores de Ecuador.
          </p>

          <button className="bg-amber-700 text-white px-6 py-3 rounded-2xl hover:bg-amber-600 transition">
            Explorar comunidad
          </button>
        </div>

      </div>

    </section>
  );
}