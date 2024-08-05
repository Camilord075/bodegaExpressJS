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
    const responsable = await ResponsableController.findOne(req.params.id)

    if (!responsable) {
        res.status(404).send('This Responsable does not exists')
    }
    
    res.send(responsable)
})

app.post('/responsable', async (req, res) => {
    const { id, nombre } = req.body

    try {
        const result = await ResponsableController.insertResponsable(id, nombre)

        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.patch('/responsable/:id', async (req, res) => {
    const idResposable = req.params.id
    const { nombre } = req.body

    try {
        const result = await ResponsableController.updateResponsable(idResposable, nombre)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.delete('/responsable/:id', async (req, res) => {
    const idResponsable = req.params.id

    try {
        const result = await ResponsableController.deleteResponsable(idResponsable)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.get('/producto', async (req, res) => {
    const productos = await ProductoController.getProductos()

    res.send(productos)
})

app.get('/producto/:id', async (req, res) => {
    const producto = await ProductoController.findOne(req.params.id)

    if (!producto) {
        res.status(404).send('This Producto does not exists')
    }

    res.send(producto)
})

app.post('/producto', async (req, res) => {
    const { nombre, cantidadDisponible } = req.body

    const result = await ProductoController.insertProducto(nombre, cantidadDisponible)

    res.send(result)
})

app.patch('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    const { nombre, cantidadDisponible } = req.body

    try {
        const result = await ProductoController.updateProducto(idProducto, nombre, cantidadDisponible)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.delete('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    
    try {
        const result = await ProductoController.deleteProducto(idProducto)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.get('/pedidos', async (req, res) => {
    const pedidos = await PedidoController.getPedidos()

    res.send(pedidos)
})

app.get('/pedidos/:id', async (req, res) => {
    const pedido = await PedidoController.findOne(req.params.id)

    if (!pedido) {
        res.status(404).send('This Pedido does not exists')
    }

    res.send(pedido)
})

app.post('/pedidos', async (req, res) => {
    const { idResponsable, lista } = req.body

    try {
        const result = await PedidoController.newPedido(idResponsable, lista)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.patch('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id
    const { lista } = req.body

    try {
        const result = await PedidoController.updatePedido(idPedido, lista)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.delete('/pedidos/:id', async (req, res) => {
    const idPedido = req.params.id

    try {
        const result = await PedidoController.deletePedido(idPedido)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.get('/lista/:id', async (req, res) => {
    try {
        const lista = await ListaController.getLista(req.params.id)

        res.send(lista)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`)
})