import { pool } from "../database/database.js";
import { PedidoController } from "./PedidoController.js";
import { ProductoController } from "./ProductoController.js";

export class ListaController {
    static async getLista(id) {
        const findPedido = await PedidoController.findOne(id)
        if (!findPedido) throw new Error('This Pedido does not exists')

        const [lista] = await pool.query('SELECT producto.nombre AS nombre_producto, listas.cantidad FROM listas INNER JOIN producto ON listas.id_producto = producto.id WHERE id_pedido = ?;', [id])

        return lista
    }

    static async insertLista(idPedido, idProducto, cantidad) {
        const findProducto = await ProductoController.findOne(idProducto)
        if (!findProducto) {
            throw new Error('This Producto does not exists')
        }

        const [result] = await pool.query('INSERT INTO listas (id_producto, id_pedido, cantidad) VALUES (?, ?, ?);', [idProducto, idPedido, cantidad])

        return result
    }

    static async updateLista(idPedido, idProducto, cantidad) {
        const findPedido = await PedidoController.findOne(idPedido)
        if (!findPedido) {
            throw new Error('This Pedido does not exists')
        }

        const findProducto = await ProductoController.findOne(idProducto)
        if (!findProducto) {
            throw new Error('This Producto does not exists')
        }

        const [result] = await pool.query('UPDATE listas SET cantidad = IFNULL(?, cantidad) WHERE id_producto = ? AND id_pedido = ?;', [cantidad, idProducto, idPedido])

        return result
    }

    static async deleteLista (idPedido) {
        const findPedido = await PedidoController.findOne(idPedido)
        if (!findPedido) {
            throw new Error('This Pedido does not exists')
        }

        const [result] = await pool.query('DELETE FROM listas WHERE id_pedido = ?;', [idPedido])

        return result 
    }
}