import { pool } from "../database/database.js";
import { InventarioController } from "./InventarioController.js";
import { ListaController } from "./ListaController.js";
import { ResponsableController } from "./ResponsableController.js";

export class PedidoController {
    static async getPedidos() {
        const [pedidos] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable, pedido.status FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id;')

        return pedidos
    }

    static async findOne(id) {
        const [pedido] = await pool.query('SELECT pedido.id, pedido.id_responsable, responsable.nombre AS nombre_responsable, pedido.status FROM pedido INNER JOIN responsable ON pedido.id_responsable = responsable.id WHERE pedido.id = ?;', [id])

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
                const insertLista = await ListaController.insertLista(insertPedido.insertId, producto.idProducto, producto.cantidad)
            } catch (error) {
                const revertLista = await ListaController.deleteLista(insertPedido.insertId)
                const [revertPedido] = await pool.query('DELETE FROM pedido WHERE id = ?', [insertPedido.insertId])
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

    static async checkPedido(idPedido) {
        try {
            const pedido = await this.findOne(idPedido)

            if (pedido.status === 1) {
                throw new Error('This Pedido was checked before')
            } else {
                const output = await InventarioController.outputInventario(idPedido)
                const [check] = await pool.query('UPDATE pedido SET status = 1 WHERE id = ?;', [idPedido])

                return output
            }
        } catch (error) {
            if (error.message) {
                throw new Error(error.message)
            } else {
                throw new Error('This Pedido does not exists')
            }
        }
    }
}