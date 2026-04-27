const Details = () => {
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Detalle</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Esta vista mostrara la informacion completa de un elemento del circulo cuando ese recurso exista en el backend.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#2c3e50]">Informacion principal</h2>
                    <p className="mt-3 text-slate-600">
                        Aqui podremos renderizar datos de una obra, autora, actividad o publicacion, segun la entidad que defina el proyecto.
                    </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#2c3e50]">Estado actual</h2>
                    <p className="mt-3 text-slate-700">
                        El frontend ya tiene la ruta preparada, pero todavia no hay un endpoint asociado para cargar este detalle de forma real.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Details
