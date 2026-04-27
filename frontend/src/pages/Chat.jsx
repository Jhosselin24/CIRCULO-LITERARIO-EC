const Chat = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Conversaciones</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este espacio podra alojar foros o chat en tiempo real para la comunidad lectora.</p>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#2c3e50]">Modulo pendiente</h2>
                <p className="mt-3 text-slate-600">
                    El backend actual no expone sockets ni endpoints de mensajeria para este proyecto, asi que dejamos una vista clara y honesta mientras se define esa funcionalidad.
                </p>
            </div>
        </div>
    )
}

export default Chat
