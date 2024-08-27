import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController.js";
import { Respond } from "../controllers/responds/RespondController.js";
import { verifySession } from "./Usuario.routes.js";
import cookieParser from "cookie-parser";

const pedidoRouter = Router()

pedidoRouter.use(cookieParser())

pedidoRouter.get('/pedidos', async (req, res) => {
    const pedidos = await PedidoController.getPedidos()

    const respond = new Respond(1, pedidos)

    res.send(respond)
})

pedidoRouter.get('/pedidos/:id', async (req, res) => {
    const pedido = await PedidoController.findOne(req.params.id)

    if (!pedido) {
        const respond = new Respond(0, pedido)

        res.status(404).send(respond)
    }

    res.send(new Respond(1, pedido))
})

pedidoRouter.post('/pedidos', async (req, res) => {
    const { idResponsable, lista } = req.body

    try {
        const result = new Respond(1, await PedidoController.newPedido(idResponsable, lista))

        res.send(result)
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

pedidoRouter.patch('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id
    const { lista } = req.body

    try {
        const result = new Respond(1, await PedidoController.updatePedido(idPedido, lista))

        res.send(result)
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

pedidoRouter.delete('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id

    try {
        const result = new Respond(1, await PedidoController.deletePedido(idPedido))

        res.send(result)
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

pedidoRouter.patch('/pedidos/checking/:id', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(403).send(new Respond(0, 'Access not Authorized'))
    } else {
        const idPedido = req.params.id
    
        try {
            const result = new Respond(1, await PedidoController.checkPedido(idPedido))
    
            res.send(result)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

export default pedidoRouter