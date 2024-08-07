import { Router } from "express";
import { ListaController } from "../controllers/ListaController.js";

const listaRouter = Router()

listaRouter.get('/lista/:id', async (req, res) => {
    try {
        const lista = await ListaController.getLista(req.params.id)

        res.send(lista)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

export default listaRouter