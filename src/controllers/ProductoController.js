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

    static async insertProducto(nombre, cantidadDisponible) {
        const insert = await pool.query('INSERT INTO producto (nombre, cantidad_disponible) VALUES (?, ?);', [nombre, cantidadDisponible])

        return insert[0]
    }

    static async updateProducto(id, nombre, cantidadDisponible) {
        const findProducto = await this.findOne(id)

        if (!findProducto) {
            throw new Error('This Producto does not exists')
        }

        const updateResult = await pool.query('UPDATE producto set nombre = IFNULL(?, nombre), cantidad_disponible = IFNULL(?, cantidad_disponible) WHERE id = ?;', [nombre, cantidadDisponible, id])

        return updateResult[0]
    }

    static async deleteProducto(id) {
        const findProducto = await this.findOne(id)

        if (!findProducto) {
            throw new Error('This Producto does not exists')
        }

        const deleteResult = await pool.query('DELETE FROM producto WHERE id = ?;', [id])

        return deleteResult[0]
    }
}