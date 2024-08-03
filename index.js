import express from 'express'
import { APP_PORT } from './config.js'
import { ResponsableController } from './src/controllers/ResponsableController.js'
import { ProductoController } from './src/controllers/ProductoController.js'
import { PedidoController } from './src/controllers/PedidoController.js'
import { ListaController } from './src/controllers/ListaController.js'

const app = express()
app.use(express.json())

app.get('/responsable', async (req, res) => {
    const responsables = await ResponsableController.getResponsables()

    res.send(responsables)
})

app.get('/responsable/:id', async (req, res) => {
    const responsable = await ResponsableController.getResponsable(req.params.id)

    res.send(responsable)
})

app.get('/producto', async (req, res) => {
    const productos = await ProductoController.getProductos()

    res.send(productos)
})

app.get('/producto/:id', async (req, res) => {
    const producto = await ProductoController.getProductos(req.params.id)

    res.send(producto)
})

app.get('/pedidos', async (req, res) => {
    const pedidos = await PedidoController.getPedidos()

    res.send(pedidos)
})

app.get('/pedidos/:id', async (req, res) => {
    const pedido = await PedidoController.getPedido(req.params.id)

    res.send(pedido)
})

app.get('/lista/:id', async (req, res) => {
    const lista = await ListaController.getLista(req.params.id)

    res.send(lista)
})

app.post('/pedidos', async (req, res) => {
    const { idResponsable } = req.body

    try {
        const result = await PedidoController.newPedido(idResponsable)

        res.send(result)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`)
})