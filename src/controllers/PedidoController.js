import { pool } from "../database/database.js";
import { ListaController } from "./ListaController.js";
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

        const [insertPedido] = await pool.query('INSERT INTO pedido (id_responsable) VALUES (?);', [idResponsable])

        for(const producto of lista) {
            try {
                const insertLista = await ListaController.insertLista(result.insertId, producto[0], producto[1])
            } catch (error) {
                const [revert] = pool.query('DELETE FROM pedido WHERE id = ?', [result.insertId])
                throw new Error(error.message)
            }
        }

        return insertPedido
    }

    static async updatePedido (idPedido, lista) {
        for (const producto of lista) {
            try {
                const result = await ListaController.updateLista(idPedido, producto[0], producto[1])

                return result
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }

    static async deletePedido (idPedido) {
        try {
            const deleteLista = await ListaController.deleteLista(idPedido)
        } catch (error) {
            throw new Error(error.message)
        }

        const deletePedido = await pool.query('DELETE FROM pedido WHERE id = ?;', [idPedido])

        return deletePedido[0]
    }
}