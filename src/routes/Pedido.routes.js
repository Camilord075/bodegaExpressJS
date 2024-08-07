import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController.js";

const pedidoRouter = Router()

pedidoRouter.get('/pedidos', async (req, res) => {
    const pedidos = await PedidoController.getPedidos()

    res.send(pedidos)
})

pedidoRouter.get('/pedidos/:id', async (req, res) => {
    const pedido = await PedidoController.findOne(req.params.id)

    if (!pedido) {
        res.status(404).send('This Pedido does not exists')
    }

    res.send(pedido)
})

pedidoRouter.post('/pedidos', async (req, res) => {
    const { idResponsable, lista } = req.body

    try {
        const result = await PedidoController.newPedido(idResponsable, lista)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

pedidoRouter.patch('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id
    const { lista } = req.body

    try {
        const result = await PedidoController.updatePedido(idPedido, lista)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

pedidoRouter.delete('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id

    try {
        const result = await PedidoController.deletePedido(idPedido)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

export default pedidoRouter