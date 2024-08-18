import { Router } from "express";
import { ListaController } from "../controllers/ListaController.js";
import { Respond } from "../controllers/responds/RespondController.js";

const listaRouter = Router()

listaRouter.get('/lista/:id', async (req, res) => {
    try {
        const lista = await ListaController.getLista(req.params.id)

        res.send(new Respond(1, lista))
    } catch (error) {
        res.status(404).send(new Respond(0, error.message))
    }
})

export default listaRouter