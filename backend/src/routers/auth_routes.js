import {Router} from 'express'
import { recuperarPassword, comprobarTokenPassword, crearNuevoPassword, login, perfil, actualizarPerfil, actualizarPassword } from '../controllers/auth_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

//Rutas para la recuperación de contraseña
router.post('/recuperar-password', recuperarPassword)
router.get('/recuperar-password/:token', comprobarTokenPassword)
router.post('/nuevo-password/:token', crearNuevoPassword)
router.post('/login',login)
router.get('/perfil', verificarTokenJWT, perfil)
router.put('/actualizar-perfil/:id', verificarTokenJWT, actualizarPerfil)
router.put('/actualizar-password/:id', verificarTokenJWT, actualizarPassword)

export default router
