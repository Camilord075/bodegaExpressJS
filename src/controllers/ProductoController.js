import { pool } from "../database/database.js";

export class ProductoController {
    static async getProductos() {
        const [productos] = await pool.query('SELECT * FROM producto')

        return productos
    }

    static async getProductos(id) {
        const [producto] = await pool.query('SELECT * FROM producto WHERE id = ?', [id])

        return producto[0]
    }
}