import { pool } from "../database/database.js";
import { ResponsableController } from "./ResponsableController.js";

export class PedidoController {
    static async getPedidos() {
        const [pedidos] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id;')

        return pedidos
    }

    static async getPedido(id) {
        const [pedido] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id WHERE pedido.id = ?;', [id])

        return pedido[0]
    }

    static async newPedido (idResponsable) {
        const responsable = await ResponsableController.findOne(idResponsable)
        if (!responsable) throw new Error('This Responsable does not exists')

        const [result] = await pool.query('INSERT INTO pedido (id_responsable) VALUES (?);', [idResponsable])

        return result
    }
}