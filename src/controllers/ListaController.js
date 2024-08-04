import { pool } from "../database/database.js";
import { PedidoController } from "./PedidoController.js";

export class ListaController {
    static async getLista(id) {
        const findPedido = PedidoController.findOne(id)
        if (!findPedido[0]) throw new Error('This Pedido does not exists')

        const [lista] = await pool.query('SELECT producto.nombre AS nombre_producto, listas.cantidad FROM listas INNER JOIN producto ON listas.id_producto = producto.id WHERE id_pedido = ?;', [id])

        return lista
    }

    static async insertLista(idPedido, idProducto, cantidad) {
        const [result] = await pool.query('INSERT INTO listas (id_producto, id_pedido, cantidad) VALUES (?, ?, ?);', [idProducto, idPedido, cantidad])

        return result
    }
}