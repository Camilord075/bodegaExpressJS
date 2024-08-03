import { pool } from "../database/database.js";

export class ListaController {
    static async getLista(id) {
        const [lista] = await pool.query('SELECT producto.nombre AS nombre_producto, listas.cantidad FROM listas INNER JOIN producto ON listas.id_producto = producto.id WHERE id_pedido = ?;', [id])

        return lista
    }
}