import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController.js";

const productoRouter = Router()

productoRouter.get('/producto', async (req, res) => {
    const productos = await ProductoController.getProductos()

    res.send(productos)
})

productoRouter.get('/producto/:id', async (req, res) => {
    const producto = await ProductoController.findOne(req.params.id)

    if (!producto) {
        res.status(404).send('This Producto does not exists')
    }

    res.send(producto)
})

productoRouter.post('/producto', async (req, res) => {
    const { nombre, cantidadDisponible } = req.body

    const result = await ProductoController.insertProducto(nombre, cantidadDisponible)

    res.send(result)
})

productoRouter.patch('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    const { nombre, cantidadDisponible } = req.body

    try {
        const result = await ProductoController.updateProducto(idProducto, nombre, cantidadDisponible)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

productoRouter.delete('/producto/:id', async (req, res) => {
    const idProducto = req.params.id
    
    try {
        const result = await ProductoController.deleteProducto(idProducto)

        res.send(result)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

export default productoRouter