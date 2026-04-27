import logoDog from '../assets/dog-hand.webp'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { API_BASE_URL } from '../utils/auth'

const Reset = () => {
    const navigate = useNavigate()
    const {token} = useParams()
    const fetchDataBackend = useFetch()
    const [tokenBack, setTokenBack] = useState(false)
    const [loadingToken, setLoadingToken] = useState(true)
    const {register, handleSubmit, formState: {errors}} = useForm()

    const changePassword = async (dataForm) => {
        const url = `${API_BASE_URL}/auth/nuevo-password/${token}`
        const response = await fetchDataBackend(url, dataForm, 'POST')

        if (response) {
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        }
    }

    useEffect(() => {
        const verifyToken = async() => {
            const url = `${API_BASE_URL}/auth/recuperar-password/${token}`
            const response = await fetchDataBackend(url, null, 'GET')
            setTokenBack(Boolean(response))
            setLoadingToken(false)
        }

        verifyToken()
    }, [fetchDataBackend, token])

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6">
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-2 text-center text-gray-700">
                Bienvenido nuevamente
            </h1>
            <small className="text-gray-500 block my-4 text-sm text-center">
                Ingresa los siguientes datos para recuperar tu contrasena.
            </small>
            <img
                className="object-cover h-64 w-64 rounded-full border-4 border-solid border-slate-600"
                src={logoDog}
                alt="Circulo Literario"
            />

            {loadingToken && <p className="mt-8 text-gray-500">Validando enlace...</p>}

            {!loadingToken && tokenBack && (
                <form className="w-full max-w-sm mt-8" onSubmit={handleSubmit(changePassword)}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">
                            Nueva contrasena
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu nueva contrasena"
                            className="block w-full rounded-md border border-gray-300 focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22] py-2 px-2 text-gray-600"
                            {...register("password", {
                                required: "La contrasena es obligatoria.",
                                minLength: { value: 6, message: "Minimo 6 caracteres." }
                            })}
                        />
                        {errors.password && <p className="text-red-800 mt-1 text-sm">{errors.password.message}</p>}

                        <label className="mb-2 mt-4 block text-sm font-semibold">
                            Confirmar contrasena
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu contrasena"
                            className="block w-full rounded-md border border-gray-300 focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22] py-2 px-2 text-gray-600"
                            {...register("confirmPassword", {required: "Confirma tu contrasena."})}
                        />
                        {errors.confirmPassword && <p className="text-red-800 mt-1 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="mb-3">
                        <button className="bg-[#2c3e50] text-white border py-2 w-full rounded-xl mt-5 hover:scale-[1.01] duration-300 hover:bg-[#1b2836]">
                            Actualizar contrasena
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Reset
