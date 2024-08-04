import { pool } from "../database/database.js";
import { ListaController } from "./ListaController.js";
import { ProductoController } from "./ProductoController.js";
import { ResponsableController } from "./ResponsableController.js";

export class PedidoController {
    static async getPedidos() {
        const [pedidos] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id;')

        return pedidos
    }

    static async findOne(id) {
        const [pedido] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id WHERE pedido.id = ?;', [id])

        if (pedido.length <= 0) {
            return false
        }

        return pedido[0]
    }

    static async newPedido (idResponsable, lista) {
        const responsable = await ResponsableController.findOne(idResponsable)
        if (!responsable) throw new Error('This Responsable does not exists')

        const [result] = await pool.query('INSERT INTO pedido (id_responsable) VALUES (?);', [idResponsable])

        for(const producto of lista) {
            const findProducto = await ProductoController.findOne(producto[0])
            if (!findProducto) throw new Error('This Producto does not exists')

            const listInsertResult = ListaController.insertLista(result.insertId, producto[0], producto[1])
        }

        return result
    }
}