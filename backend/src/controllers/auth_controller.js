import Usuarios from "../models/Usuarios.js"
import { sendMailToRecoveryPassword } from "../helpers/sendMail.js"
import { crearTokenJWT } from "../middlewares/JWT.js"
import mongoose from "mongoose"

//Endpoint para recuperar contrasena
const recuperarPassword = async(req,res) => {
    try {
        const {identifier} = req.body
        if (!identifier) return res.status(400).json({msg: "Debes ingresar tu correo o nombre de usuario."})

        const usuario = await Usuarios.findOne({
          $or: [
            {email: identifier},
            {username: identifier}
          ]
        })

        if (!usuario) {
          return res.status(200).json({msg: "Si el usuario existe, recibiras un correo para reestablecer tu contrasena."})
        }

        const token = usuario.createToken(60 * 60 * 1000)
        usuario.token = token
        await usuario.save()
        await sendMailToRecoveryPassword(usuario.email, token)

        res.status(200).json({msg: "Si el usuario existe, recibiras un correo electronico para reestablecer tu contrasena."})
    } catch(error) {
        console.error(error)
        res.status(500).json({msg: "Error al procesar la solicitud."})
    }
}

const comprobarTokenPassword = async(req,res) => {
  try {
    const {token} = req.params
    const usuarioBDD = await Usuarios.findOne({token})
    if(!usuarioBDD) return res.status(400).json({msg: "No se pudo validar su cuenta. El token es invalido o ya expiro."})

    if (!usuarioBDD.tokenExpiresAt || usuarioBDD.tokenExpiresAt < new Date()) {
      usuarioBDD.token = null
      usuarioBDD.tokenExpiresAt = null
      await usuarioBDD.save()
      return res.status(400).json({msg: "El enlace para restablecer la contrasena ha expirado."})
    }

    return res.status(200).json({
      msg: "Token confirmado, ya puedes crear tu nueva contrasena."
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: "Error al procesar la solicitud."})
  }
}

//Crear nueva contrasena
const crearNuevoPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body
    const { token } = req.params

    if (!password || !confirmPassword) {
      return res.status(400).json({
        msg: "Debes llenar todos los campos de forma obligatoria."
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "La contrasena debe tener minimo 6 caracteres."
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        msg: "Las contrasenas no coinciden."
      })
    }

    const usuario = await Usuarios.findOne({ token })

    if (!usuario) {
      return res.status(400).json({
        msg: "Token invalido o expirado."
      })
    }

    if (!usuario.tokenExpiresAt || usuario.tokenExpiresAt < new Date()) {
      usuario.token = null
      usuario.tokenExpiresAt = null
      await usuario.save()
      return res.status(400).json({
        msg: "El enlace para restablecer la contrasena ha expirado."
      })
    }

    usuario.password = await usuario.encryptPassword(password)
    usuario.token = null
    usuario.tokenExpiresAt = null

    await usuario.save()

    return res.status(200).json({
      msg: "Contrasena restablecida exitosamente. Ya puedes iniciar sesion."
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: "Error al procesar la solicitud."
    })
  }
}

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body

    if (!identifier || !password) {
      return res.status(400).json({
        msg: "Debes completar todos los campos."
      })
    }

    const usuarioBDD = await Usuarios.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    }).select("-__v -token -updatedAt")

    if (!usuarioBDD) {
      return res.status(401).json({
        msg: "Correo, nombre de usuario o contrasena incorrectos."
      })
    }

    if (!usuarioBDD.confirmEmail) {
      return res.status(403).json({
        msg: "Debes verificar tu cuenta antes de iniciar sesion."
      })
    }

    if (usuarioBDD.estadoUsuario !== "Activo") {
      return res.status(403).json({
        msg: "Tu cuenta no esta disponible."
      })
    }

    const verificarPassword = await usuarioBDD.matchPassword(password)

    if (!verificarPassword) {
      return res.status(401).json({
        msg: "Correo, nombre de usuario o contrasena incorrectos."
      })
    }

    const { nombres, apellidos, provincia, username, _id, rol, email } = usuarioBDD
    const token = crearTokenJWT(usuarioBDD._id, usuarioBDD.rol)

    return res.status(200).json({
      msg: "Inicio de sesion exitoso.",
      usuario: {
        _id,
        token,
        nombres,
        apellidos,
        provincia,
        username,
        email,
        rol
      }
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({msg: "Error al procesar solicitud."})
  }
}

//Creacion de endpoint para visualizar su perfil
const perfil = (req,res) => {
  const {confirmEmail, createdAt, updatedAt, __v, ...datosPerfil} = req.usuarioHeader
  res.status(200).json(datosPerfil)
}

//Creacion de endpoint para actualizar el perfil
const actualizarPerfil = async(req,res) => {
  try {
    const {id} = req.params
    const {nombres, apellidos, provincia, username, email} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({msg: `ID invalido: ${id}`})
    }

    if (req.usuarioHeader._id.toString() !== id && req.usuarioHeader.rol !== "Administrador") {
      return res.status(403).json({msg: "No tienes permisos para actualizar este perfil."})
    }

    const usuarioBDD = await Usuarios.findById(id)
    if (!usuarioBDD) return res.status(404).json({msg: `No existe el usuario con el ID ${id}`})
    if (Object.values(req.body).includes("")) return res.status(400).json({msg: "Debes completar todos los campos."})

    if (usuarioBDD.email !== email) {
      const emailExistente = await Usuarios.findOne({email})
      if (emailExistente) {
        return res.status(400).json({msg: "El email ya se encuentra registrado."})
      }
    }

    if (usuarioBDD.username !== username) {
      const usernameExistente = await Usuarios.findOne({username})
      if (usernameExistente) {
        return res.status(400).json({msg: "El nombre de usuario ya se encuentra registrado."})
      }
    }

    usuarioBDD.nombres = nombres ?? usuarioBDD.nombres
    usuarioBDD.apellidos = apellidos ?? usuarioBDD.apellidos
    usuarioBDD.provincia = provincia ?? usuarioBDD.provincia
    usuarioBDD.username = username ?? usuarioBDD.username
    usuarioBDD.email = email ?? usuarioBDD.email

    await usuarioBDD.save()

    res.status(200).json({msg: "Perfil actualizado con exito."})
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: "Error en el servidor."})
  }
}

//Creacion de endpoint para actualizar la contrasena
const actualizarPassword = async(req,res) => {
  try {
    const {id} = req.params
    const {passwordActual, passwordNuevo, confirmPassword} = req.body
    const esMismoUsuario = req.usuarioHeader._id.toString() === id
    const esAdministrador = req.usuarioHeader.rol === "Administrador"

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({msg: `ID invalido: ${id}`})
    }

    if (!esMismoUsuario && !esAdministrador) {
      return res.status(403).json({msg: "No tienes permisos para actualizar esta contrasena."})
    }

    const usuarioBDD = await Usuarios.findById(id)
    if (!usuarioBDD) return res.status(404).json({msg: `Lo sentimos, no existe el usuario con el ID: ${id}`})

    if (!passwordNuevo || !confirmPassword || (esMismoUsuario && !passwordActual)) {
      return res.status(400).json({msg: "Debes completar todos los campos."})
    }

    if (passwordNuevo.length < 6) {
      return res.status(400).json({msg: "La nueva contrasena debe tener minimo 6 caracteres."})
    }

    if (passwordNuevo !== confirmPassword) {
      return res.status(400).json({msg: "Las contrasenas no coinciden."})
    }

    if (esMismoUsuario) {
      const verificarPassword = await usuarioBDD.matchPassword(passwordActual)
      if (!verificarPassword) return res.status(400).json({msg: "Lo sentimos, la contrasena actual no es correcta."})
    }

    usuarioBDD.password = await usuarioBDD.encryptPassword(passwordNuevo)
    await usuarioBDD.save()

    res.status(200).json({msg: "Contrasena actualizada con exito."})
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: "Error en el servidor."})
  }
}

export {
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword,
    login,
    perfil,
    actualizarPerfil,
    actualizarPassword
}
