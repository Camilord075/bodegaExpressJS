import { pool } from "../database/database.js";

export class ResponsableController {
    static async getResponsables() {
        const [responsables] = await pool.query('SELECT * FROM responsable')

        return responsables
    }

    static async findOne(id) {
        const [found] = await pool.query('SELECT * FROM responsable WHERE id = ?', [id])

        if (found.length <= 0) {
            return false
        }

        return found[0]
    }
}