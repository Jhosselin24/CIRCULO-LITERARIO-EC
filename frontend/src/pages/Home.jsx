import logoDarkMode from '../assets/dark.png'
import logoHero from '../assets/dogmain.png'
import logoCommunity from '../assets/dog-hand.webp'
import { Link } from 'react-router'
import { MdDashboard, MdAutoStories } from "react-icons/md"
import { FaCommentSms, FaFacebook, FaXTwitter } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"
import { FaSquareInstagram } from "react-icons/fa6"

export const Home = () => {
    return (
        <>
            <header className="container mx-auto min-h-24 text-center py-4 md:flex justify-between items-center px-4">
                <h1 className='font-bold text-2xl my-2 text-amber-700'>Circulo <span className='text-[#2c3e50]'>Literario EC</span></h1>
                <ul className='flex gap-5 justify-center my-4 flex-wrap text-sm md:text-base'>
                    <li><a href="#inicio" className='font-bold hover:text-amber-700 hover:underline'>Inicio</a></li>
                    <li><a href="#comunidad" className='font-bold hover:text-amber-700 hover:underline'>Comunidad</a></li>
                    <li><a href="#beneficios" className='font-bold hover:text-amber-700 hover:underline'>Beneficios</a></li>
                    <li><a href="#contacto" className='font-bold hover:text-amber-700 hover:underline'>Contacto</a></li>
                </ul>
                <ul className='flex justify-center items-center gap-5 my-4'>
                    <li><img src={logoDarkMode} alt="decoracion" width={35} height={35} /></li>
                </ul>
            </header>

            <main id="inicio" className='text-center py-10 px-8 bg-amber-50 md:text-left md:flex justify-between items-center gap-10'>
                <div className='md:max-w-xl'>
                    <p className='font-bold uppercase tracking-[0.3em] text-amber-700 text-sm'>Lectores y autores</p>
                    <h1 className='font-extrabold text-[#2c3e50] uppercase text-4xl my-4 md:text-6xl leading-tight'>
                        Un espacio para leer, compartir y descubrir nuevas voces
                    </h1>

                    <p className='text-lg my-6 text-slate-700'>
                        Circulo Literario EC conecta a personas que aman la literatura. Crea tu cuenta, participa en la comunidad y administra tu perfil desde una experiencia simple y cercana.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                        <Link to="/register" className='block bg-amber-800 px-6 py-3 text-white rounded-2xl text-center hover:bg-amber-700'>
                            Crear cuenta
                        </Link>
                        <Link to="/login" className='block border border-[#2c3e50] px-6 py-3 text-[#2c3e50] rounded-2xl text-center hover:bg-[#2c3e50] hover:text-white'>
                            Iniciar sesion
                        </Link>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <img src={logoHero} alt="Comunidad lectora" />
                </div>
            </main>

            <section id="comunidad" className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-10'>
                    <h2 className='font-semibold text-3xl relative z-1 w-64 text-center mx-auto bg-white'>NUESTRA COMUNIDAD</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>
                    <div className='sm:w-1/2'>
                        <img src={logoCommunity} alt="Lectura compartida" className='w-full h-full object-cover rounded-3xl' />
                    </div>

                    <div className='px-4 sm:w-1/2 text-slate-700'>
                        <p className='my-4'>
                            Circulo Literario EC nace para reunir lectores, escritoras, autores emergentes y personas curiosas por nuevas historias.
                        </p>
                        <ul className='space-y-4'>
                            <li>
                                <MdAutoStories className='inline text-2xl mr-2 text-amber-700' />
                                Descubre nuevas lecturas y perfiles de la comunidad.
                            </li>
                            <li>
                                <MdDashboard className='inline text-2xl mr-2 text-amber-700' />
                                Gestiona tu cuenta y tus datos desde un panel personal.
                            </li>
                            <li>
                                <FaCommentSms className='inline text-2xl mr-2 text-amber-700' />
                                Mantente cerca de conversaciones y espacios de intercambio.
                            </li>
                            <li>
                                <BsCashCoin className='inline text-2xl mr-2 text-amber-700' />
                                Prepara el proyecto para futuras experiencias y servicios editoriales.
                            </li>
                        </ul>
                        <p className='my-4'>
                            El objetivo es construir una comunidad literaria ecuatoriana viva, accesible y con identidad propia.
                        </p>
                    </div>
                </div>
            </section>

            <section id="beneficios" className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-56 text-center mx-auto bg-white'>BENEFICIOS</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 grid gap-5 md:grid-cols-3'>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.15)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.25)] transition-shadow duration-300 relative pt-6 pb-8 px-4 bg-white rounded-2xl">
                        <MdDashboard className='inline text-5xl text-amber-700' />
                        <h4 className="text-xl font-bold py-4 text-[#2c3e50]">Panel personal</h4>
                        <p className="text-slate-600">Actualiza tu perfil, tu correo, tu usuario y tu contrasena desde un mismo lugar.</p>
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.15)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.25)] transition-shadow duration-300 relative pt-6 pb-8 px-4 bg-amber-50 rounded-2xl">
                        <MdAutoStories className='inline text-5xl text-amber-700' />
                        <h4 className="text-xl font-bold py-4 text-[#2c3e50]">Identidad lectora</h4>
                        <p className="text-slate-600">Presenta quién eres, desde dónde lees y cómo quieres participar dentro del círculo.</p>
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.15)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.25)] transition-shadow duration-300 relative pt-6 pb-8 px-4 bg-white rounded-2xl">
                        <FaCommentSms className='inline text-5xl text-amber-700' />
                        <h4 className="text-xl font-bold py-4 text-[#2c3e50]">Comunidad en crecimiento</h4>
                        <p className="text-slate-600">La plataforma queda lista para incorporar nuevos modulos sociales, editoriales y de conversacion.</p>
                    </div>
                </div>
            </section>

            <footer id="contacto" className='text-center bg-amber-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>
                <div className='flex justify-between items-center flex-col gap-4 sm:flex-row'>
                    <div className='text-3xl font-extrabold text-amber-800'>Contacto</div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>

                <div className='flex justify-between items-center flex-col gap-6 sm:flex-row'>
                    <div className='text-left'>
                        <p className='font-bold my-2'>Email: contacto@circuloliterario.ec</p>
                        <p className='font-bold'>Comunidad para lectores y autores de Ecuador</p>
                    </div>
                    <div className='flex-1 sm:max-w-1/2 w-full'>
                        <form action="#" className='w-full p-4'>
                            <fieldset className='border-2 border-amber-900 p-4 rounded-sm'>
                                <legend className='bg-amber-950 w-full text-left text-white pl-2 py-2'>Suscribete al boletin</legend>
                                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                                    <input type="email" placeholder="Ingresa tu correo" className='sm:flex-1 border border-gray-300 rounded-md focus:outline-none px-3 py-2' />
                                    <button className='flex-1 sm:max-w-40 border bg-amber-950 p-2 rounded-lg text-white'>Enviar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

                <hr className='border-1 border-amber-800' />

                <p className='font-semibold'>
                    Circulo Literario EC
                </p>
            </footer>
        </>
    )
}
