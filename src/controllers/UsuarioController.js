import { pool } from '../database/database.js'

export class UsuarioController {
    static async test() {
        const [result] = await pool.query('SELECT * FROM usuarios')

        return result
    }
}