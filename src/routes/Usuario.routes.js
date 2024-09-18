import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { Respond } from "../controllers/responds/RespondController.js";
import { JWT_SECRET_KEY } from "../../config.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

const usuarioRouter = Router()

usuarioRouter.use(cookieParser())

export const verifySession = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY)
        req.session.user = data
    } catch (error) {
    }

    next()
}

usuarioRouter.post('/register', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user || user.rol !== 'root') {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        const { nombre, correo, pass } = req.body
    
        try {
            const result = new Respond(1, await UsuarioController.signUp(nombre, correo, pass))
    
            res.send(result)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
})

usuarioRouter.post('/login', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {
        const { correo, pass } = req.body
    
        try {
            const user = await UsuarioController.signIn(correo, pass)
    
            const token = jwt.sign({
                id: user.id, nombre: user.nombre, rol: user.rol, correo: user.correo},
                JWT_SECRET_KEY,
                {
                    expiresIn: '1h'
                }
            )
    
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 100 * 60 * 60
            }).send( { user } )
        } catch (error) {
            res.status(401).send(error.message)
        }
    } else {
        const { correo } = req.body

        if (user.correo === correo) {
            res.status(202).send(new Respond(0, {
                mensaje: 'You have a session open with this user',
                session: user
            }))    
        } else {
            res.status(400).send(new Respond(0, {
                mensaje: 'There is a session open, please logout',
                session: user
            }))
        }
    }
})

usuarioRouter.post('/logout', verifySession, (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'There is not a session open'))
    } else {
        res.clearCookie('access_token').send(new Respond(1, 'Logout successful'))
    }
})

export default usuarioRouter