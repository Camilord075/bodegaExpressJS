import { Router } from "express";
import { InventarioController } from "../controllers/InventarioController.js";
import { verifySession } from "./Usuario.routes.js";
import { Respond } from "../controllers/responds/RespondController.js";
import cookieParser from "cookie-parser";

const inventarioRouter = Router()

inventarioRouter.use(cookieParser())

inventarioRouter.get('/inventario', verifySession, async (req, res) => {
    const { user } = req.session

    if (!user) {    
        res.status(401).send(new Respond(0, 'Access not Authorized'))
    } else {
        try {
            const result = await InventarioController.exportInventario()
        
            res.attachment(`InventarioExport${result.date}.csv`)
            res.send(result.csv)
        } catch (error) {
            res.status(404).send(new Respond(0, error.message))
        }
    }
})

export default inventarioRouter