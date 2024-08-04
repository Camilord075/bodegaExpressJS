import { pool } from "../database/database.js";

export class ProductoController {
    static async getProductos() {
        const [productos] = await pool.query('SELECT * FROM producto')

        return productos
    }

    static async findOne(id) {
        const [producto] = await pool.query('SELECT * FROM producto WHERE id = ?', [id])

        if (producto.length <= 0) {
            return false
        }

        return producto[0]
    }
}