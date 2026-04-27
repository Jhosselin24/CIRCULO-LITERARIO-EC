import Usuarios from '../models/Usuarios.js'
import { sendMailToRegister } from '../helpers/sendMail.js'

//Registro del usuario
const registro = async(req,res) => {
  try {
    const {
      nombres,
      apellidos,
      biografia,
      fechaNacimiento,
      provincia,
      email,
      username,
      password
    } = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg: "Todos los campos deben ser completados de forma obligatoria."})
    const usuarioExistente = await Usuarios.findOne({
      $or: [
        {email},
        {username}
      ]
    })
    if (usuarioExistente) {
      return res.status(400).json({msg: "El correo o el nombre del usuario ya se encuentran registrados."})
    }

    // Solo se aceptan campos permitidos del registro para evitar escalamiento desde el cliente.
    const nuevoUsuario = new Usuarios({
      nombres,
      apellidos,
      biografia,
      fechaNacimiento,
      provincia,
      email,
      username,
      password,
      rol: "Usuario",
      confirmEmail: false,
      estadoUsuario: "Activo",
      token: null,
      tokenExpiresAt: null
    })

    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    const token = nuevoUsuario.createToken(24 * 60 * 60 * 1000)
    nuevoUsuario.token = token
    await nuevoUsuario.save()
    await sendMailToRegister(email,token)
    res.status(200).json({msg: "Revisa tu correo electronico para confirmar tu cuenta."})
  } catch (error) {
        res.status(500).json({msg: `Error en el servidor - ${error}`})
    }
}

//Confirmacion de email para el inicio de sesion
const confirmarMail = async(req,res) => {
  try {
    const {token} = req.params
    const usuarioBDD = await Usuarios.findOne({token})
    if (!usuarioBDD) return res.status(404).json({msg: "Token invalido o cuenta ya confirmada."})

    if (!usuarioBDD.tokenExpiresAt || usuarioBDD.tokenExpiresAt < new Date()) {
      usuarioBDD.token = null
      usuarioBDD.tokenExpiresAt = null
      await usuarioBDD.save()
      return res.status(400).json({msg: "El enlace de confirmacion ha expirado. Solicita uno nuevo."})
    }

    usuarioBDD.token = null
    usuarioBDD.tokenExpiresAt = null
    usuarioBDD.confirmEmail = true
    await usuarioBDD.save()
    res.status(200).json({msg: "Cuenta confirmada, ya puedes iniciar sesion."})
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: `Error al procesar la solicitud - ${error}`})
  }
}

export {
    registro,
    confirmarMail
}
