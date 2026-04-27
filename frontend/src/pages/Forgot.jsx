import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { useFetch } from '../hooks/useFetch'
import { API_BASE_URL } from '../utils/auth'

export const Forgot = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const fetchDataBackend = useFetch()

    const sendMail = async (dataForm) => {
        const url = `${API_BASE_URL}/auth/recuperar-password`
        const response = await fetchDataBackend(url, dataForm, 'POST')
        if (response) {
            navigate("/login")
        }
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <ToastContainer/>
            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full max-w-xl px-8">
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-700">Olvidaste tu contrasena?</h1>
                    <p className="text-center text-gray-500 mb-8">Ingresa tu correo o nombre de usuario y te enviaremos el enlace para restablecerla.</p>

                    <form onSubmit={handleSubmit(sendMail)}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Nombre de usuario o correo</label>
                            <input
                                type="text"
                                placeholder="Ingresa tu correo electronico o nombre de usuario"
                                className="block w-full rounded-md border border-gray-300 focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22] py-3 px-3 text-gray-600"
                                {...register("identifier", {required: "El campo es obligatorio."})}
                            />
                            {errors.identifier && <p className="text-red-700 mt-2 text-sm">{errors.identifier.message}</p>}
                        </div>

                        <div className="mb-3">
                            <button className="bg-[#2c3e50] text-white border py-3 w-full rounded-xl mt-5 hover:scale-[1.01] duration-300 hover:bg-[#1b2836]">
                                Enviar enlace
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 " />

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Ya tienes una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-[#e67e22] text-white border rounded-xl hover:scale-105 duration-300 hover:bg-[#d35400]">Iniciar sesion</Link>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/images/catforgot.jpg')] bg-no-repeat bg-cover bg-center sm:block hidden" />
        </div>
    )
}
