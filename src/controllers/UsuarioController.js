import { pool } from '../database/database.js'
import { Validator } from '../middleware/Validator.js'
import { SALT_ROUNDS } from '../../config.js'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

export class UsuarioController {
    static async findOne (id) {
        const [found] = await pool.query('SELECT * FROM usuarios WHERE id = ?;', [id])

        if (found.length <= 0) {
            return false
        }

        return found[0]
    }

    static async findOneByCorreo (correo) {
        const [found] = await pool.query('SELECT * FROM usuarios WHERE correo = ?;', [correo])

        if (found.length <= 0) {
            return false
        }

        return found[0]
    }

    static async signUp(nombre, correo, pass) {
        Validator.correo(correo)
        Validator.password(pass)

        const user = await this.findOneByCorreo(correo)
        if (user) throw new Error('Correo already used by another user.')
        
        const id = crypto.randomUUID()
        const hashedPass = await bcrypt.hash(pass, SALT_ROUNDS)

        const [create] = await pool.query('INSERT INTO usuarios (id, nombre, correo, password) VALUES (?, ?, ?, ?);', [id, nombre, correo, hashedPass])

        return create
    }

    static async signIn (correo, pass) {
        Validator.correo(correo)
        Validator.password(pass)

        const user = await this.findOneByCorreo(correo)
        if (!user) throw new Error("There isn't any user registered with this Correo")
        
        const isValid = await bcrypt.compare(pass, user.password)
        if (!isValid) throw new Error('Password is invalid')

        const { password: _, ... publicUser } = user

        return publicUser
    }
}