import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController.js";
import { Respond } from "../controllers/responds/RespondController.js";
import { verifySession } from "./Usuario.routes.js";
import cookieParser from "cookie-parser";

const productoRouter = Router()

productoRouter.use(cookieParser())

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

productoRouter.post('/producto', verifySession, async (req, res) => {
    const { user } = req.session
    
    if (!user) {
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        const { nombre, cantidadDisponible } = req.body
        const result = new Respond(1, await ProductoController.insertProducto(nombre, cantidadDisponible))
    
        res.send(result)
    }
})

productoRouter.patch('/producto/:id', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        const idProducto = req.params.id
        const { nombre, cantidadDisponible } = req.body
    
        try {
            const result = new Respond(1, await ProductoController.updateProducto(idProducto, nombre, cantidadDisponible))
    
            res.send(result)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

productoRouter.delete('/producto/:id', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        const idProducto = req.params.id
        
        try {
            const result = new Respond(1, await ProductoController.deleteProducto(idProducto))
    
            res.send(result)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }

})

export default productoRouter