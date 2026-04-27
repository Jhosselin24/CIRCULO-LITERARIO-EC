const List = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Explorar</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Aqui apareceran los registros que el proyecto literario decida publicar dentro de la comunidad.</p>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#2c3e50]">Sin datos disponibles por ahora</h2>
                <p className="mt-3 text-slate-600">
                    Todavia no existen endpoints de backend para listar autores, obras, clubes o eventos. La pantalla queda lista para integrarse cuando definamos ese modulo.
                </p>
            </div>
        </div>
    )
}

export default List
