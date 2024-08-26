import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { Respond } from "../controllers/responds/RespondController.js";
import { JWT_SECRET_KEY } from "../../config.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

const usuarioRouter = Router()

usuarioRouter.use(cookieParser())
usuarioRouter.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY)
        req.session.user = data
    } catch (error) {
    }

    next()
})

usuarioRouter.post('/register', async (req, res) => {
    const { nombre, correo, pass } = req.body

    try {
        const result = new Respond(1, await UsuarioController.signUp(nombre, correo, pass))

        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

usuarioRouter.post('/login', async (req, res) => {
    const { correo, pass } = req.body

    try {
        const user = new Respond(1, await UsuarioController.signIn(correo, pass))

        const token = jwt.sign({
            id: user.respond.id, nombre: user.respond.nombre, rol: user.respond.rol},
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
})

export default usuarioRouter