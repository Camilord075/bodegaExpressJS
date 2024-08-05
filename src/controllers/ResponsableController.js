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

    static async insertResponsable (id, nombre) {
        const findResponsable = await this.findOne(id)
        
        if (findResponsable) {
            throw new Error('This Responsable is registered, try again with other ID')
        }

        const insert = await pool.query('INSERT INTO responsable (id, nombre) VALUES (?, ?);', [id, nombre])

        return insert[0]
    }

    static async updateResponsable(id, nombre) {
        const findResponsable = await this.findOne(id)

        if (!findResponsable) {
            throw new Error('This Responsable does not exists')
        }

        const result = await pool.query('UPDATE responsable SET nombre = IFNULL(?, nombre) WHERE id = ?;', [nombre, id])

        return result[0]
    }

    static async deleteResponsable (id) {
        const findResponsable = await this.findOne(id)

        if (!findResponsable) {
            throw new Error('This Responsable does not exists')
        }

        const deleteResult = await pool.query('DELETE FROM responsable WHERE id = ?;', [id])

        return deleteResult[0]
    }
}