import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { Respond } from "../controllers/responds/RespondController.js";

const usuarioRouter = Router()

usuarioRouter.get('/usuarios', async (req, res) => {
    const result = new Respond(1, await UsuarioController.test())

    res.send(result)
})

export default usuarioRouter