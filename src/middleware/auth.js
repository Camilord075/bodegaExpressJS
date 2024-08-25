import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../../config.js'
import { Respond } from '../controllers/responds/RespondController.js'

export class Auth {
    static auth (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send(new Respond(0, 'Content not authorized to show, please log in'))
        }

        const token = req.headers.authorization
        const payload = jwt.decode(token, JWT_SECRET_KEY)

        //TODO: Complete this function later to complete the UsuarioController and define the method to make the register and LogIn
    }
}