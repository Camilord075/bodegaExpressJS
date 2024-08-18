import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController.js";
import { Respond } from "../controllers/responds/RespondController.js";

const productoRouter = Router()

productoRouter.get('/producto', async (req, res) => {
    const productos = new Respond(1, await ProductoController.getProductos())

    res.send(productos)
})

productoRouter.get('/producto/:id', async (req, res) => {
    const producto = new Respond(1, await ProductoController.findOne(req.params.id))

    if (!producto.respond) {
        res.status(404).send(new Respond(0, 'This Producto does not exists'))
    }

    res.send(producto)
})

productoRouter.post('/producto', async (req, res) => {
    const { nombre, cantidadDisponible } = req.body

    const result = new Respond(1, await ProductoController.insertProducto(nombre, cantidadDisponible))

    res.send(result)
})

productoRouter.patch('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    const { nombre, cantidadDisponible } = req.body

    try {
        const result = new Respond(1, await ProductoController.updateProducto(idProducto, nombre, cantidadDisponible))

        res.send(result)
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

productoRouter.delete('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    
    try {
        const result = new Respond(1, await ProductoController.deleteProducto(idProducto))

        res.send(result)
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

export default productoRouter